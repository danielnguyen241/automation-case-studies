// Screenshot local HTML renders (from render-data-tables.py) at 2x. Usage: node scripts/render-html-shots.mjs /tmp/render
import {chromium} from 'playwright';
const D=process.argv[2]||'/tmp/render',A=new URL('../assets/',import.meta.url).pathname;
const b=await chromium.launch(process.env.CHROME?{executablePath:process.env.CHROME,args:['--no-sandbox']}:{});
for(const [f,w,o] of [['audit',1400,'shot-audit'],['short',1400,'shot-shortlist'],['term',760,'shot-content-check']]){
 const p=await b.newPage({viewport:{width:w,height:400},deviceScaleFactor:2});await p.goto(`file://${D}/${f}.html`);await p.screenshot({path:A+o+'.png',fullPage:true});}
await b.close();console.log('Now convert: python3 scripts/export-images.py png assets/shot-audit.png assets/shot-audit.webp (etc.)');
