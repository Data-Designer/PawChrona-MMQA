'use strict';
document.documentElement.classList.add('has-js');
const release=window.PAWCHRONA_RELEASE;
const text={
  image_vqa:{en:['Image-linked QA','Questions linked to images, including findings, imaging quality and source-reported labels.'],zh:['图像关联问答','关联图像的问题，包括图像所见、成像质量与来源记录的标签。'],media:['image']},
  audio_video_qa:{en:['Audio & video QA','Questions linked to recorded vocalizations, activity and source-reported expressions.'],zh:['音视频关联问答','关联录音与视频的问题，涉及叫声、活动及来源记录的表达标签。'],media:['audio','video']},
  text_qa:{en:['Text-only QA','Text-based veterinary knowledge and reference questions, without a linked media payload.'],zh:['纯文本问答','不关联媒体载荷的兽医知识与参考问题。'],media:[]}
};
let lang='en',config='image_vqa',visualPaused=false,toastTimer=null,lastDialogOpener=null;
try{lang=new URL(location.href).searchParams.get('lang')||localStorage.getItem('mmqa-language')||'en';}catch{}
if(!['en','zh'].includes(lang))lang='en';
const $=selector=>document.querySelector(selector),all=selector=>[...document.querySelectorAll(selector)];
function schema(){
  const species=$('#species').value;
  return {configuration:config,split:release.split,language_fields:['question_en','question_zh'],media_fields:text[config].media,species_filter:species==='all'?null:species==='mixed'?['mixed_cat_dog','unknown']:[species],parent_id_field:'qa_id',provenance_fields:['source_ids','media_sha256'],review_fields:['clinical_approved','privacy_cleared','export_allowed'],model_input_fields:[...text[config].media,'question_en | question_zh','options (when applicable)'],excluded_from_model_input:['answer_en','answer_zh','correct_option_id','broad_category','source_ids','diagnostic_proposed_role']};
}
function renderExplorer(){
  const c=text[config];$('#configuration-title').textContent=c[lang][0];$('#configuration-description').textContent=c[lang][1];$('#configuration-count').textContent=release.configurations[config].toLocaleString(lang==='zh'?'zh-CN':'en-US');
  all('[data-config]').forEach(button=>{const selected=button.dataset.config===config;button.setAttribute('aria-selected',selected);button.tabIndex=selected?0:-1;});
  $('#configuration-panel').setAttribute('aria-labelledby',$(`[data-config="${config}"]`).id);
  const fields=[['qa_id',lang==='en'?'Stable parent-question identifier':'稳定的父题标识'],['question_en / question_zh',lang==='en'?'Paired language fields on the same parent':'同一父题的成对双语字段'],[c.media.length?c.media.join(' / '):'media_kind',c.media.length?(lang==='en'?'Native media features with encoded bytes':'带编码字节的原生媒体特征'):(lang==='en'?'Text-only; no linked media payload':'纯文本，不关联媒体载荷')],['source_ids / review_holds',lang==='en'?'Source references and explicit review holds':'来源引用与显式审核暂缓项']];
  $('#field-list').replaceChildren(...fields.map(([name,definition])=>{const row=document.createElement('div'),dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=name;dd.textContent=definition;row.append(dt,dd);return row;}));
  const species=$('#species').value;
  const descriptions={en:{all:'Across all configurations: 13,775 cat, 34,425 dog, 30 mixed and 1,017 unknown-species parent questions.',cat:'Filter expression: species == "cat". The full candidate contains 13,775 cat questions across all configurations.',dog:'Filter expression: species == "dog". The full candidate contains 34,425 dog questions across all configurations.',mixed:'Keep mixed_cat_dog (30) and unknown (1,017) explicit. These are overall counts, not this configuration’s filtered count.'},zh:{all:'全部配置合计：猫 13,775 题、狗 34,425 题、混合 30 题、物种未知 1,017 题。',cat:'筛选表达式：species == "cat"。完整候选池跨配置合计有 13,775 道猫题。',dog:'筛选表达式：species == "dog"。完整候选池跨配置合计有 34,425 道犬题。',mixed:'混合猫狗（30题）与未知（1,017题）显式保留。以上为全池数量，不是当前配置筛选后的数量。'}};
  $('#species-description').textContent=descriptions[lang][species];
}
function setLanguage(next){
  lang=next;document.documentElement.lang=lang==='zh'?'zh-CN':'en';
  all('[data-en][data-zh]').forEach(el=>el.textContent=el.dataset[lang]);
  $('#language').textContent=lang==='en'?'中文':'EN';$('#language').setAttribute('aria-label',lang==='en'?'Switch to Chinese':'切换为英文');
  $('#navigation').setAttribute('aria-label',lang==='en'?'Main navigation':'主导航');
  $('#citation-close').setAttribute('aria-label',lang==='en'?'Close dialog':'关闭弹窗');
  $('#species').setAttribute('aria-label',lang==='en'?'Species filter snippet':'物种筛选表达式');
  $('#copy-status').textContent='';renderExplorer();renderVisualControl();
  try{localStorage.setItem('mmqa-language',lang);}catch{}
}
function toast(message){clearTimeout(toastTimer);$('#toast').textContent=message;$('#toast').hidden=false;toastTimer=setTimeout(()=>$('#toast').hidden=true,3500);}
function metadata(){return {title:release.name,version:release.version,status:release.status,creators:[],identifier:null,repository:release.hfUrl,repository_scope:'private_research_candidate',dataset_publicly_released:false};}
function openMetadataDialog(kind,opener){
  lastDialogOpener=opener;$('#citation-dialog').dataset.kind=kind;$('#citation-title').textContent=kind==='schema'?(lang==='en'?'Configuration schema':'配置结构'):(lang==='en'?'A release in preparation.':'一个准备中的版本。');
  $('#citation-dialog').querySelector(':scope>p').textContent=kind==='schema'?(lang==='en'?'Select and copy this schema. It contains no dataset examples.':'可选择并复制以下结构，不含数据集样本。'):(lang==='en'?'No published dataset citation or DOI exists yet. This is provisional project metadata.':'目前没有正式数据集引用或 DOI，以下为临时项目信息。');
  $('#citation-code').textContent=JSON.stringify(kind==='schema'?schema():metadata(),null,2);$('#copy-status').textContent='';$('#citation-dialog').showModal();
}
async function copy(value,kind,opener){
  try{await navigator.clipboard.writeText(value);toast(lang==='en'?'Copied to clipboard':'已复制到剪贴板');return true;}
  catch{if(!$('#citation-dialog').open)openMetadataDialog(kind,opener);$('#copy-status').textContent=lang==='en'?'Clipboard unavailable. Select the text above and copy it manually.':'剪贴板不可用，请选择上方文本手动复制。';return false;}
}
function renderVisualControl(){const b=$('#pause-visual');b.textContent=visualPaused?(lang==='en'?'Resume background':'继续背景动效'):(lang==='en'?'Pause background':'暂停背景动效');b.setAttribute('aria-pressed',String(visualPaused));}
const calm=matchMedia('(prefers-reduced-motion: reduce)'),smallScreen=matchMedia('(max-width:650px)');
function syncVisual(){
  $('.study-photo').classList.toggle('is-paused',visualPaused||document.hidden||calm.matches||smallScreen.matches);
}
$('#language').addEventListener('click',()=>setLanguage(lang==='en'?'zh':'en'));
all('[data-config]').forEach(button=>button.addEventListener('click',()=>{config=button.dataset.config;renderExplorer();}));
$('.explorer-tabs').addEventListener('keydown',event=>{
  const buttons=all('[data-config]'),current=buttons.indexOf(event.target);if(current<0)return;let next;
  if(event.key==='ArrowRight')next=(current+1)%buttons.length;if(event.key==='ArrowLeft')next=(current+buttons.length-1)%buttons.length;if(event.key==='Home')next=0;if(event.key==='End')next=buttons.length-1;
  if(next===undefined)return;event.preventDefault();config=buttons[next].dataset.config;renderExplorer();buttons[next].focus();
});
$('#species').addEventListener('change',renderExplorer);
$('#copy-schema').addEventListener('click',event=>copy(JSON.stringify(schema(),null,2),'schema',event.currentTarget));
$('#citation-open').addEventListener('click',event=>openMetadataDialog('citation',event.currentTarget));
$('#copy-citation').addEventListener('click',event=>copy($('#citation-code').textContent,$('#citation-dialog').dataset.kind,event.currentTarget));
$('#citation-close').addEventListener('click',()=>$('#citation-dialog').close());
$('#citation-dialog').addEventListener('close',()=>lastDialogOpener?.focus());
$('#citation-dialog').addEventListener('click',event=>{if(event.target===$('#citation-dialog')){const r=event.target.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)event.target.close();}});
$('.menu-button').addEventListener('click',()=>{const open=$('.menu-button').getAttribute('aria-expanded')!=='true';$('.menu-button').setAttribute('aria-expanded',open);$('#navigation').classList.toggle('is-open',open);});
function closeMenu(){const open=$('.menu-button').getAttribute('aria-expanded')==='true';$('.menu-button').setAttribute('aria-expanded','false');$('#navigation').classList.remove('is-open');return open;}
$('#navigation').addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
document.querySelectorAll('a[href="#explorer"]').forEach(link=>link.addEventListener('click',()=>{$('.technical-details').open=true;}));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&closeMenu())$('.menu-button').focus();});
$('#pause-visual').addEventListener('click',()=>{visualPaused=!visualPaused;renderVisualControl();syncVisual();});
document.addEventListener('visibilitychange',syncVisual);calm.addEventListener('change',syncVisual);smallScreen.addEventListener('change',()=>{closeMenu();syncVisual();});
all('.question-stack details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)all('.question-stack details').forEach(other=>{if(other!==d)other.open=false;});}));
if('IntersectionObserver'in window){const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){if(!calm.matches)entry.target.classList.add('entrance');io.unobserve(entry.target);}}),{threshold:.12});all('.section-opening h2,.section-opening>p,.facts-row>div,.explorer-intro h2,.explorer-intro>p,.category-row,.receipt,.provenance-copy h2,.provenance-copy>p,.provenance-slip,.questions h2,.access-intro h2').forEach(el=>io.observe(el));}
setLanguage(lang);syncVisual();
