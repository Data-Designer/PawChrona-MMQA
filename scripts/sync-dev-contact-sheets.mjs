// Explicitly selected montage previews only; never copies the source directory.
import {readFile,copyFile,writeFile,stat} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {resolve,join} from 'node:path';
import {fileURLToPath} from 'node:url';
const [source,reportPath]=process.argv.slice(2);
if(!source||!reportPath)throw Error('Usage: node scripts/sync-dev-contact-sheets.mjs <contact-sheet-directory> <diversity-report.json>');
const root=fileURLToPath(new URL('../',import.meta.url));
const report=JSON.parse(await readFile(resolve(reportPath),'utf8'));
const categories=['image_interpretation','disease_and_veterinary_knowledge','pet_health_consultation','behavior_and_expression','imaging_basics_and_quality'];
for(const category of categories)if(report.dev_categories[category]!==500)throw Error('Expected 500 development questions: '+category);
const files=[];
for(const category of categories){
 const name=`dataset-dev-${category}.jpg`,original=join(resolve(source),category+'.jpg');
 const bytes=await readFile(original);
 if(bytes[0]!==0xff||bytes[1]!==0xd8||bytes.length>2*1024*1024)throw Error('Unexpected montage asset: '+category);
 await copyFile(original,join(root,'assets',name));
 files.push({category,file:name,questions:500,width:2200,height:1910,bytes:(await stat(original)).size,sha256:createHash('sha256').update(bytes).digest('hex')});
}
const metadata={version:'2026.10.28-debug.2',questions:2500,perCategory:500,selection:'development split; not a final test split',mediaKinds:report.dev_media_kinds,rendering:'Original byte-identical contact sheets; audio/video/text placeholders retained',sourceReport:'dev_diversity_report.json',sourceRepository:'https://huggingface.co/datasets/PawChrona/PawChrona-MMQA',clinicalApprovalChanged:false,files};
await writeFile(join(root,'assets','dataset-dev-preview.json'),JSON.stringify(metadata,null,2)+'\n');
console.log(JSON.stringify({questions:metadata.questions,files:files.length,bytes:files.reduce((sum,f)=>sum+f.bytes,0),output:'assets/dataset-dev-preview.json'},null,2));
