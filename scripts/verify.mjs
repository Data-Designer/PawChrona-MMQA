import {readFile,stat,readdir} from 'node:fs/promises';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const root=new URL('../',import.meta.url),html=await readFile(new URL('index.html',root),'utf8'),ctx={window:{}};
vm.runInNewContext(await readFile(new URL('release-data.js',root),'utf8'),ctx);
const data=ctx.window.PAWCHRONA_RELEASE;
for(const key of ['configurations','categories','species','formats'])assert.equal(Object.values(data[key]).reduce((a,b)=>a+b,0),data.parentQuestions,key);
assert.equal(data.hfUrl,null);assert.equal(data.actualVeterinarianReviews,0);
for(const key of ['publicUploadPerformed','clinicalApproved','privacyCleared','formalTrainingApproved','exportAllowed'])assert.equal(data[key],false,key);
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length);
assert.doesNotMatch(html,/product-gallery|product-context|assets\/app-/,'App prototype screens must not appear on the dataset homepage');
assert((await readdir(new URL('assets/',root))).every(name=>!/^app-.*\.(png|jpe?g|webp)$/i.test(name)),'App screen assets must not ship');
const publicTexts=await Promise.all(['index.html','site.js','styles.css','README.md','DATASET.md','LICENSE','release-data.js'].map(name=>readFile(new URL(name,root),'utf8')));
assert.doesNotMatch(publicTexts.join('\n'),/chatgpt\.site|CAT CORE|CAT GO|PAWCHRONA DOG|hero-pawchrona|hardware-concept|product-system|pawchrona-logo|产品官网|与产品的关系/i,'Standalone dataset presentation only');
const assets=(await readdir(new URL('assets/',root))).filter(name=>!name.startsWith('.'));
assert(assets.every(name=>name.startsWith('dataset-')),'Only dataset-specific visual assets may ship');
assert.match(html,/class="record-diagram"/,'Dataset structure illustration present');
for(const [,url]of html.matchAll(/(?:href|src|content)="(https:\/\/[^"]+)"/g)){
 if(url.startsWith('https://github.com/'))assert(url.startsWith('https://github.com/Data-Designer/PawChrona-MMQA'),'Repository links must stay within this dataset');
 else assert(url.startsWith('https://data-designer.github.io/PawChrona-MMQA/'),'No unrelated outbound destinations');
}
for(const [,attr,value]of html.matchAll(/\b(src|href)="([^"]+)"/g)){
 if(value.startsWith('#'))assert(ids.includes(value.slice(1)),`missing anchor ${value}`);
 else if(!/^(https:|mailto:)/.test(value)){assert(!value.startsWith('/'),`root path ${value}`);await stat(new URL(value,root));}
}
for(const name of await readdir(root)){if(name.startsWith('.')||['assets','scripts','qa'].includes(name))continue;assert(!/\.(parquet|zip|jsonl|mp4|wav|npy|pdf)$/i.test(name),`private research payload ${name}`);}
assert(!/\/Volumes\/|\/Users\/|hf_[A-Za-z0-9]{20}/.test(html+JSON.stringify(data)));
console.log(JSON.stringify({mode:'DEBUG RUN',checks:['configuration/category/species/format sums','source gates preserved','unique DOM IDs','local assets and anchors','GitHub subpath compatibility','no root dataset payloads or private paths','no App prototype markup or assets','standalone dataset text and visual assets','dataset-only outbound links'],parents:data.parentQuestions,publicRelease:false,root:fileURLToPath(root),allPassed:true},null,2));
