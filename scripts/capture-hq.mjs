// Recapture HiAgency HQ tabs at 1440x900 @2x with DOM redaction (read-only: navigation only).
// Usage: HQ_USER=... HQ_PASS=... node scripts/capture-hq.mjs   (needs: npm i playwright; npx playwright install chromium)
import {chromium} from 'playwright';import fs from 'fs';import path from 'path';import {execSync} from 'child_process';
const {HQ_USER,HQ_PASS,HQ_URL='https://hq.hiagency.au'}=process.env;
if(!HQ_USER||!HQ_PASS){console.error('Set HQ_USER and HQ_PASS env vars');process.exit(1)}
const dir=path.dirname(new URL(import.meta.url).pathname),R=fs.readFileSync(path.join(dir,'hq-redact.js'),'utf8');
const OUT=process.env.OUT||'/tmp/hq-capture';fs.mkdirSync(OUT,{recursive:true});
const TABS=[['employees','PIM / Employees'],['schedule','Work Schedule'],['tasks','Task Reports'],['projects','Agency Projects'],['sops','SOPs &'],['performance','Performance Reviews'],['skills','Skills Matrix']];
const b=await chromium.launch(process.env.CHROME?{executablePath:process.env.CHROME,args:['--no-sandbox']}:{});
const c=await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:2});const p=await c.newPage();
await p.goto(HQ_URL+'/wp-login.php');await p.fill('#user_login',HQ_USER);await p.fill('#user_pass',HQ_PASS);
await Promise.all([p.waitForLoadState('networkidle'),p.click('#wp-submit')]);
for(const [t,label] of TABS){
  await p.goto(HQ_URL+'/?tab=employees',{waitUntil:'networkidle'});await p.waitForTimeout(1500);
  if(t!=='employees'){await p.locator('aside, nav').getByText(label,{exact:false}).first().click();await p.waitForTimeout(2000)}
  await p.addStyleTag({content:'*{transition:none!important;animation:none!important;caret-color:transparent!important}'});
  await p.evaluate(R);await p.waitForTimeout(500);
  const png=path.join(OUT,t+'.png');await p.screenshot({path:png});console.log('captured',t,p.url());
}
await b.close();
console.log(`PNGs in ${OUT}. CHECK EVERY IMAGE BY EYE, then convert: python3 scripts/export-images.py crm ${OUT}`);
