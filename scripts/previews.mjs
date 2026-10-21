// Refresh preview*.png (desktop 1440x900 + mobile 390x844, top + full page). Usage: node scripts/previews.mjs
import {chromium} from 'playwright';
const R=new URL('../',import.meta.url).pathname;
const b=await chromium.launch(process.env.CHROME?{executablePath:process.env.CHROME,args:['--no-sandbox']}:{});const errs=[];
for(const [page,pre] of [['index.html','preview'],['crm.html','preview-crm']])for(const [w,h,s] of [[1440,900,''],[390,844,'-mobile']]){
 const p=await b.newPage({viewport:{width:w,height:h}});p.on('pageerror',e=>errs.push(e.message));await p.goto('file://'+R+page);
 const H=await p.evaluate(()=>document.body.scrollHeight);for(let y=0;y<H;y+=500){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(80)}
 await p.waitForTimeout(1500);await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(400);
 await p.screenshot({path:R+pre+s+'.png'});await p.screenshot({path:R+pre+s+'-full.png',fullPage:true});await p.close();}
console.log('errors:',errs);await b.close();
