// DEBUG RUN: browser UI checks, not dataset, clinical or model validation.
// Requires Playwright. Optional PLAYWRIGHT_MODULE and BROWSER_EXECUTABLE overrides.
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {resolve,join} from 'node:path';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const out=resolve(process.env.QA_OUTPUT||new URL('../qa/results/',import.meta.url).pathname);
await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,...(process.env.BROWSER_EXECUTABLE?{executablePath:process.env.BROWSER_EXECUTABLE}:{})});
const context=await browser.newContext({viewport:{width:1440,height:1000}});
const page=await context.newPage(),checks=[],errors=[];
page.on('pageerror',error=>errors.push(error.message));
const check=(name,passed,detail)=>checks.push({name,passed:Boolean(passed),...(detail===undefined?{}:{detail})});
const url=process.env.MM_QA_URL||'http://127.0.0.1:4186/?lang=zh';
async function loaded(selector){await page.waitForFunction(selector=>{const image=document.querySelector(selector);return image.complete&&image.naturalWidth>0;},selector);}
try{
 await page.goto(url,{waitUntil:'networkidle'});await page.evaluate(()=>setLanguage('zh'));
 await page.locator('#dev-preview').scrollIntoViewIfNeeded();await loaded('#dev-image');
 check('five-category-controls',await page.locator('[data-dev-category]').count()===5);
 check('subset-not-additional-images',await page.locator('#dev-preview .section-opening').innerText().then(t=>t.includes('2,500')&&t.includes('49,247')));
 check('full-pool-still-49247',await page.locator('.task-table tbody tr').evaluateAll(rows=>rows.reduce((sum,row)=>sum+Number(row.dataset.count),0))===49247);
 check('non-image-placeholders-explained',await page.locator('.dev-footnote').innerText().then(t=>t.includes('audio')&&t.includes('占位')));
 check('background-retained',await page.locator('.study-photo img').count()===1);
 check('no-product-or-github-actions',await page.locator('a[href*="github.com"],a[href*="chatgpt.site"],.product-gallery').count()===0);
 const categories=await page.locator('[data-dev-category]').evaluateAll(buttons=>buttons.map(button=>button.dataset.devCategory));
 for(const category of categories){
  await page.locator(`#dev-tab-${category}`).click();await loaded('#dev-image');
  check(`${category}-original-image`,await page.locator('#dev-image').evaluate((image,category)=>image.getAttribute('src')===`assets/dataset-dev-${category}.jpg`&&image.naturalWidth===2200&&image.naturalHeight===1910,category));
  check(`${category}-single-selected-tab`,await page.locator('[data-dev-category][aria-selected="true"]').count()===1&&await page.locator('#dev-sheet-panel').getAttribute('aria-labelledby')===`dev-tab-${category}`);
 }
 await page.locator('#dev-tab-image_interpretation').click();await page.keyboard.press('End');
 check('keyboard-end-selects-final',await page.locator('#dev-tab-imaging_basics_and_quality').evaluate(el=>el===document.activeElement&&el.getAttribute('aria-selected')==='true'));
 await page.keyboard.press('ArrowDown');check('keyboard-arrows-wrap',await page.locator('#dev-tab-image_interpretation').getAttribute('aria-selected')==='true');
 await page.keyboard.press('Home');await loaded('#dev-image');
 await page.locator('#dev-open').click();await loaded('#dev-dialog-image');
 check('full-view-opens-with-image',await page.locator('#dev-dialog').evaluate(el=>el.open));
 check('fit-mode-is-default',await page.locator('#dev-zoom').getAttribute('aria-pressed')==='false');
 await page.locator('#dev-zoom').click();
 check('original-size-2200-by-1910',await page.locator('#dev-dialog-image').evaluate(el=>el.width===2200&&el.height===1910));
 check('original-overflow-contained',await page.locator('#dev-viewport').evaluate(el=>el.scrollWidth>el.clientWidth)&&await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 check('zoom-toggle-label',await page.locator('#dev-zoom').innerText()==='适应窗口');
 await page.keyboard.press('Escape');
 check('escape-restores-focus',await page.locator('#dev-open').evaluate(el=>el===document.activeElement)&&!await page.locator('#dev-dialog').evaluate(el=>el.open));
 await page.locator('#dev-image-open').click();check('zoom-reset-on-reopen',await page.locator('#dev-zoom').getAttribute('aria-pressed')==='false');
 await page.locator('#dev-close').click();check('close-restores-image-focus',await page.locator('#dev-image-open').evaluate(el=>el===document.activeElement));
 await page.locator('#dev-open').click();await page.mouse.click(1,1);
 check('backdrop-closes-dialog',!await page.locator('#dev-dialog').evaluate(el=>el.open));
 for(const language of ['en','zh']){
  await page.evaluate(language=>setLanguage(language),language);
  for(const width of [320,390,768,1440]){
   await page.setViewportSize({width,height:1000});await page.locator('#dev-preview').scrollIntoViewIfNeeded();
   check(`${language}-${width}-no-page-overflow`,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   check(`${language}-${width}-caption-not-squeezed`,await page.locator('#dev-sheet-name').evaluate(el=>el.getBoundingClientRect().width>120));
   check(`${language}-${width}-preview-keeps-aspect`,await page.locator('#dev-image').evaluate(el=>Math.abs(el.getBoundingClientRect().width/el.getBoundingClientRect().height-2200/1910)<.01));
  }
 }
 await page.setViewportSize({width:768,height:1000});
 check('tablet-brand-not-wrapped',await page.locator('.brand').evaluate(el=>el.getBoundingClientRect().height<60));
 check('tablet-navigation-labels-not-wrapped',await page.locator('#navigation a').evaluateAll(els=>els.every(el=>el.getBoundingClientRect().height<60)));
 await page.setViewportSize({width:390,height:844});
 check('mobile-selector-shown-tabs-hidden',await page.locator('#dev-category').isVisible()&&!await page.locator('#dev-topics').isVisible());
 await page.locator('#dev-category').selectOption('behavior_and_expression');await loaded('#dev-image');
 check('mobile-category-switch',await page.locator('#dev-sheet-name').innerText()==='行为与表情');
 await page.evaluate(()=>setLanguage('en'));
 check('language-switch-preserves-selection',await page.locator('#dev-category').inputValue()==='behavior_and_expression'&&await page.locator('#dev-sheet-name').innerText()==='Behavior & expression');
 check('mobile-actions-minimum-44px',await page.locator('#dev-category,#dev-open').evaluateAll(els=>els.every(el=>el.getBoundingClientRect().height>=44)));
 await page.locator('#dev-open').click();await page.locator('#dev-zoom').click();
 check('mobile-original-image-scrollable',await page.locator('#dev-viewport').evaluate(el=>el.scrollWidth===2200&&el.clientWidth<390));
 check('mobile-modal-fits-screen',await page.locator('#dev-dialog').evaluate(el=>el.getBoundingClientRect().bottom<=innerHeight&&el.getBoundingClientRect().left>=0));
 await page.setViewportSize({width:844,height:390});
 check('landscape-modal-actions-visible',await page.locator('#dev-close').evaluate(el=>el.getBoundingClientRect().bottom<innerHeight));
 check('landscape-dialog-not-overflowing',await page.locator('#dev-dialog').evaluate(el=>el.getBoundingClientRect().height<=innerHeight));
 await page.keyboard.press('Escape');await page.setViewportSize({width:1440,height:1000});
 check('desktop-after-resize-keeps-category',await page.locator('#dev-tab-behavior_and_expression').getAttribute('aria-selected')==='true');
 await page.emulateMedia({reducedMotion:'reduce'});
 check('reduced-motion-respected',await page.locator('#dev-image').evaluate(el=>getComputedStyle(el).animationName==='none'));
 await page.locator('#dev-image').evaluate(el=>el.src='assets/not-a-preview.jpg');
 await page.waitForFunction(()=>!document.querySelector('#dev-image-error').hidden);
 check('missing-preview-has-readable-fallback',await page.locator('#dev-image-error').isVisible());
 await page.evaluate(()=>renderDevelopment());await loaded('#dev-image');
 check('preview-recovers-after-error',!await page.locator('#dev-image-error').isVisible());
 await page.evaluate(()=>{setLanguage('zh');document.activeElement?.blur();});await page.locator('#dev-preview').screenshot({path:join(out,'dev-gallery-desktop.png')});
 await page.setViewportSize({width:768,height:1000});await page.locator('#dev-preview').screenshot({path:join(out,'dev-gallery-tablet.png')});
 await page.setViewportSize({width:390,height:844});await page.locator('#dev-preview').screenshot({path:join(out,'dev-gallery-mobile.png')});
 const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}}),fallback=await nojs.newPage();
 await fallback.goto(url,{waitUntil:'networkidle'});
 check('no-js-five-direct-image-links',await fallback.locator('.dev-fallback a[href$=".jpg"]').count()===5);
 check('no-js-default-preview-kept',await fallback.locator('#dev-image').getAttribute('src')==='assets/dataset-dev-image_interpretation.jpg');
 await nojs.close();check('no-runtime-errors',errors.length===0,errors);
}catch(error){check('scenario-completed',false,error.stack);}
finally{await browser.close();}
const result={mode:'DEBUG RUN',checks,errors,allPassed:checks.every(check=>check.passed)};
await writeFile(join(out,'dev-gallery-browser.json'),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({checks:checks.length,allPassed:result.allPassed,failed:checks.filter(check=>!check.passed)},null,2));
assert(result.allPassed,'Gallery checks failed; see QA output');
