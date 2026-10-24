// n8n-style workflow renderer. Add a workflow: <div class="wf" data-wf="key"></div> and an entry in WORKFLOWS.
const ICONS={
 cron:['#ff6d5a','<circle cx="12" cy="12" r="8" fill="none" stroke="#fff" stroke-width="2"/><path d="M12 7v5l3 2" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/>'],
 sheets:['#0f9d58','<rect x="6" y="4" width="12" height="16" rx="2" fill="#fff"/><path d="M8 9h8M8 12h8M8 15h8M12 9v8" stroke="#0f9d58" stroke-width="1.4"/>'],
 discord:['#5865f2','<path d="M7 8c3-1.5 7-1.5 10 0l1.5 7c-2 1.6-4 2-4 2l-.8-1.3c-1.2.3-2.2.3-3.4 0L9.5 17s-2-.4-4-2z" fill="#fff"/><circle cx="10" cy="12.3" r="1.1" fill="#5865f2"/><circle cx="14" cy="12.3" r="1.1" fill="#5865f2"/>'],
 semrush:['#ff642d','<path d="M5 15c3-6 9-8 14-6-4 0-7 2-8 6" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round"/>'],
 dataforseo:['#1d4ed8','<path d="M6 16l4-5 3 3 5-7" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'],
 upwork:['#14a800','<path d="M6 8v4a3 3 0 006 0V8m0 4c1 3 3 4 4.5 4a3 3 0 000-6c-2 0-3 2-4.5 6" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/>'],
 gmb:['#4285f4','<path d="M12 4a5 5 0 00-5 5c0 4 5 10 5 10s5-6 5-10a5 5 0 00-5-5z" fill="#fff"/><circle cx="12" cy="9" r="2" fill="#4285f4"/>'],
 ai:['#7b5cff','<path d="M12 4l1.8 4.7L18 10l-4.2 1.3L12 16l-1.8-4.7L6 10l4.2-1.3z" fill="#fff"/><circle cx="17.5" cy="16.5" r="1.6" fill="#fff"/>'],
 if:['#00b2a9','<path d="M12 5l7 7-7 7-7-7z" fill="none" stroke="#fff" stroke-width="2"/>'],
 http:['#6c757d','<circle cx="12" cy="12" r="7" fill="none" stroke="#fff" stroke-width="1.8"/><path d="M5 12h14M12 5c3 3 3 11 0 14M12 5c-3 3-3 11 0 14" stroke="#fff" stroke-width="1.4" fill="none"/>'],
 mail:['#ea4335','<rect x="5" y="7" width="14" height="10" rx="1.5" fill="#fff"/><path d="M5.5 7.5l6.5 5 6.5-5" stroke="#ea4335" stroke-width="1.6" fill="none"/>'],
 pdf:['#d93025','<path d="M7 4h7l4 4v12H7z" fill="#fff"/><text x="12.5" y="17" font-size="5.5" text-anchor="middle" fill="#d93025" font-family="Arial" font-weight="700">PDF</text>'],
 video:['#ff2e7e','<rect x="5" y="7" width="14" height="10" rx="2" fill="#fff"/><path d="M11 10v4l3.5-2z" fill="#ff2e7e"/>'],
 looker:['#4285f4','<circle cx="10" cy="10" r="4" fill="#fff"/><circle cx="16" cy="16" r="3" fill="#fff" opacity=".8"/><circle cx="8" cy="17" r="2" fill="#fff" opacity=".6"/>'],
 wp:['#21759b','<circle cx="12" cy="12" r="7.5" fill="none" stroke="#fff" stroke-width="1.8"/><path d="M8 9l2.5 7L12 11l1.5 5L16 9" stroke="#fff" stroke-width="1.5" fill="none" stroke-linejoin="round"/>'],
 code:['#f5a623','<path d="M9 8l-4 4 4 4M15 8l4 4-4 4" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/>']
};
const W=168,H=64;
const WORKFLOWS={
 audit:{n:[['Manual trigger','vendor list · 1,818','cron'],['Read vendor CSV','Business tab','sheets'],['Semrush metrics','AS · traffic · AU share','semrush'],['Grade S → F','AI agent','ai'],['IF tier = F','686 dropped','if'],['Shortlist','126 · 16 buy-now','sheets']],e:[[0,1],[1,2],[2,3],[3,4],[4,5,'false']]},
 sync:{n:[['On request','“update 100%”','cron'],['Gmail search','2 inboxes · live/approved','mail'],['HTTP check','live · rel','http'],['Merge','Tracker ↔ Off-page','ai'],['Update rows','status · link · date','sheets']],e:[[0,1],[1,2],[2,3],[3,4]]},
 comp:{n:[['Brief','competitor vs client','cron'],['DataForSEO','backlinks only','dataforseo'],['Crawl sites','content · on-page · local','http'],['Semrush AU','cross-check organic','semrush'],['Analyse','AI agent','ai'],['PDF report','16 pages','pdf']],e:[[0,1],[0,2],[1,4],[2,4],[3,4],[4,5]]},
 monitor:{n:[['Schedule','daily 10:00','cron'],['Fetch channels','Blog·FB·IG·LI·GMB ×22','http'],['IF age > 5 days','stale only','if'],['Discord','⚠️ Content check','discord']],e:[[0,1],[1,2],[2,3,'true']]},
 report:{n:[['Schedule','16:40 Mon–Fri','cron'],['Read task sheet','team rows','sheets'],['IF empty 2 past days','today excluded','if'],['Discord','📝 Task report check','discord']],e:[[0,1],[1,2],[2,3,'true']]},
 upwork:{n:[['Schedule','next morning','cron'],['Upwork applicants','26 + 45 proposals','upwork'],['Rank top 5','rate · JSS · cases','ai'],['Human approval','Daniel picks 3','if'],['Send invite','free intro call','upwork']],e:[[0,1],[1,2],[2,3],[3,4,'approve']]},
 gmb:{n:[['On request','profile list','cron'],['Read live GBP','+ website facts','gmb'],['Propose edits','safe categories only','ai'],['Human approval','Daniel','if'],['Apply in chunks','desc · categories · services','gmb'],['Audit','policy-risk report','ai']],e:[[0,1],[1,2],[2,3],[3,4,'approve'],[4,5]]},
 crm:{n:[['Auto-sync / Sync Data','schedule + button','cron'],['Google Sheets','staff · shifts · logs','sheets'],['Sync & normalise','WordPress back-end','wp'],['People modules','Staff · shifts · reviews','ai'],['Work modules','Tasks · projects · SOPs','ai'],['Client reporting','Looker · GSC links','looker'],['CSV export','schedule · 1,052 logs','code']],e:[[0,1],[1,2],[2,3],[2,4],[4,5],[3,6],[4,6]]},
 content:{n:[['Saved idea','reel / repo link','cron'],['Script + plan','AI agent','ai'],['Approve','Daniel','if'],['Render scenes','Grok Imagine + code','video'],['ChatCut edit','9:16 timeline','video'],['Deliver','MP4 + caption','code']],e:[[0,1],[1,2],[2,3,'ok'],[3,4],[4,5]]}
};
function layout(wf){ // columns by depth
 const d=wf.n.map(()=>0);for(let k=0;k<8;k++)wf.e.forEach(([a,b])=>d[b]=Math.max(d[b],d[a]+1));
 const cols={};d.forEach((c,i)=>(cols[c]=cols[c]||[]).push(i));
 const nc=Math.max(...d)+1,gap=64,mh=Math.max(...Object.values(cols).map(c=>c.length));
 const vw=nc*W+(nc-1)*gap+40,vh=mh*(H+40)+40;const pos=[];
 Object.entries(cols).forEach(([c,ids])=>ids.forEach((id,j)=>pos[id]=[20+c*(W+gap),(vh-ids.length*(H+40)+40)/2+j*(H+40)]));
 return {pos,vw,vh};
}
function render(el){
 const wf=WORKFLOWS[el.dataset.wf];const {pos,vw,vh}=layout(wf);
 let s=`<svg viewBox="0 0 ${vw} ${vh}" role="img" aria-label="workflow"><defs><pattern id="dg" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#2a2933"/></pattern></defs><rect width="100%" height="100%" fill="url(#dg)"/>`;
 wf.e.forEach(([a,b,l])=>{const [x1,y1]=[pos[a][0]+W,pos[a][1]+H/2],[x2,y2]=[pos[b][0],pos[b][1]+H/2],m=(x2-x1)/2;
  s+=`<path class="edge" d="M${x1} ${y1}C${x1+m} ${y1} ${x2-m} ${y2} ${x2} ${y2}"/>`;
  if(l)s+=`<rect x="${(x1+x2)/2-22}" y="${(y1+y2)/2-9}" width="44" height="18" rx="9" class="lbl"/><text x="${(x1+x2)/2}" y="${(y1+y2)/2+4}" class="lt">${l}</text>`;});
 wf.n.forEach(([t,sub,ic],i)=>{const [x,y]=pos[i],[c,g]=ICONS[ic],trig=i===0;
  s+=`<g class="node${trig?' trig':''}" style="--d:${i*0.08}s"><rect x="${x}" y="${y}" width="${W}" height="${H}" rx="${trig?'26 10 10 26':'10'}"/>
  <rect x="${x+10}" y="${y+14}" width="36" height="36" rx="9" fill="${c}"/><svg x="${x+16}" y="${y+20}" width="24" height="24" viewBox="0 0 24 24">${g}</svg>
  <text x="${x+56}" y="${y+28}" class="nt">${t}</text><text x="${x+56}" y="${y+45}" class="ns">${sub}</text>
  ${trig?'':`<circle cx="${x}" cy="${y+H/2}" r="4" class="hd"/>`}<circle cx="${x+W}" cy="${y+H/2}" r="4" class="hd"/></g>`;});
 el.innerHTML=s+'</svg>';
}
document.querySelectorAll('[data-wf]').forEach(render);
