import {readFile,stat,readdir} from 'node:fs/promises';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const root=new URL('../',import.meta.url),html=await readFile(new URL('index.html',root),'utf8'),ctx={window:{}};
vm.runInNewContext(await readFile(new URL('release-data.js',root),'utf8'),ctx);
const data=ctx.window.PAWCHRONA_RELEASE;
for(const key of ['configurations','categories','species','formats'])assert.equal(Object.values(data[key]).reduce((a,b)=>a+b,0),data.parentQuestions,key);
assert.equal(data.hfUrl,'https://huggingface.co/datasets/PawChrona/PawChrona-MMQA');assert.equal(data.hfAccessStatus,'gated_manual');assert.equal(data.actualVeterinarianReviews,0);
for(const key of ['publicUploadPerformed','clinicalApproved','privacyCleared','formalTrainingApproved','exportAllowed'])assert.equal(data[key],false,key);
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length);
assert.doesNotMatch(html,/product-gallery|product-context|assets\/app-/,'App prototype screens must not appear on the dataset homepage');
assert((await readdir(new URL('assets/',root))).every(name=>!/^app-.*\.(png|jpe?g|webp)$/i.test(name)),'App screen assets must not ship');
const publicTexts=await Promise.all(['index.html','site.js','styles.css','README.md','DATASET.md','LICENSE','release-data.js'].map(name=>readFile(new URL(name,root),'utf8')));
assert.doesNotMatch(publicTexts.join('\n'),/chatgpt\.site|CAT CORE|CAT GO|PAWCHRONA DOG|hero-pawchrona|hardware-concept|product-system|pawchrona-logo|产品官网|与产品的关系/i,'Standalone dataset presentation only');
const assets=(await readdir(new URL('assets/',root))).filter(name=>!name.startsWith('.'));
assert(assets.every(name=>name.startsWith('dataset-')),'Only dataset-specific visual assets may ship');
const rows=[...html.matchAll(/<tr data-category="([^"]+)" data-count="(\d+)"/g)];
assert.equal(rows.length,5,'Five task categories displayed');
for(const [,code,count]of rows)assert.equal(Number(count),data.categories[code],'Displayed task count matches snapshot');
assert.doesNotMatch(html,/href="https:\/\/github\.com/,'Visitor actions use Hugging Face, not GitHub');
assert.doesNotMatch(publicTexts.join('\n'),/ChuangZhao\/PawChrona-MMQA/,'Old HF namespace must not remain in public files');
assert.doesNotMatch(html,/currently private|私有仓库|私有、未审核/,'Current HF access is manual-gated, not private');
assert.match(html,/class="study-scene"/,'Pet-scene background retained');
assert.match(html,/class="technical-details"/,'Technical configuration is secondary');
for(const [,url]of html.matchAll(/(?:href|src|content)="(https:\/\/[^"]+)"/g)){
 assert(['https://huggingface.co/datasets/PawChrona/PawChrona-MMQA','https://data-designer.github.io/PawChrona-MMQA/','https://commons.wikimedia.org/wiki/File:Cat_and_Dog_Cuddling.jpg','https://creativecommons.org/licenses/by-sa/4.0/'].some(prefix=>url.startsWith(prefix)),'Only dataset and photo-attribution destinations');
}
for(const [,attr,value]of html.matchAll(/\b(src|href)="([^"]+)"/g)){
 if(value.startsWith('#'))assert(ids.includes(value.slice(1)),`missing anchor ${value}`);
 else if(!/^(https:|mailto:)/.test(value)){assert(!value.startsWith('/'),`root path ${value}`);await stat(new URL(value,root));}
}
for(const name of await readdir(root)){if(name.startsWith('.')||['assets','scripts','qa'].includes(name))continue;assert(!/\.(parquet|zip|jsonl|mp4|wav|npy|pdf)$/i.test(name),`private research payload ${name}`);}
assert(!/\/Volumes\/|\/Users\/|hf_[A-Za-z0-9]{20}/.test(html+JSON.stringify(data)));
console.log(JSON.stringify({mode:'DEBUG RUN',checks:['configuration/category/species/format sums','source gates preserved','unique DOM IDs','local assets and anchors','GitHub subpath compatibility','no root dataset payloads or private paths','no App prototype markup or assets','standalone dataset text and visual assets','dataset-only outbound links'],parents:data.parentQuestions,publicRelease:false,root:fileURLToPath(root),allPassed:true},null,2));
