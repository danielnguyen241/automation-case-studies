(()=>{
const G=[['A',['Daniel Nguyen (Đạt)','Daniel Nguyen','Dat Nguyen','Đạt','Dat','Daniel']],['B',['Kristen (Phước)','Kristen','Hien Phuoc','HienPhuoc','Phước','Phuoc']],['C',['Jayden (Jayden)','Jayden']],['D',['Thanh Tung (Tùng)','Thanh Tung','Tung Vu','Tùng','Tung']],['E',['Trương Thanh Thảo (Thảo)','Trương Thanh Thảo','Thanh Thao','Thảo','Thao']],['F',['Vu Thi Lan Anh (Lan Anh)','Vu Thi Lan Anh','Lan Anh','LanAnh']],['G',['Gia Nghi (Nghi)','Gia Nghi','Nghi']],['H',['Nhut Huy','Huy']]];
const pairs=[];G.forEach(([l,ns])=>ns.forEach(n=>pairs.push([n,'Member '+l])));pairs.sort((a,b)=>b[0].length-a[0].length);
const esc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const re=new RegExp('(^|[^\\p{L}])('+pairs.map(p=>esc(p[0])).join('|')+')(?![\\p{L}])','gu');const map=Object.fromEntries(pairs);
const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);const ns=[];while(w.nextNode())ns.push(w.currentNode);
ns.forEach(n=>{let t=n.nodeValue.replace(/hiagencyhq_admin/g,'admin');t=t.replace(re,(m,p,name)=>p+map[name]);if(t!==n.nodeValue)n.nodeValue=t});
document.querySelectorAll('input,textarea').forEach(i=>{if(i.placeholder)i.placeholder=i.placeholder.replace(re,(m,p,name)=>p+map[name])});
// avatars -> neutral initials circles
const svg=l=>'data:image/svg+xml,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><rect width="96" height="96" fill="#cbd5e1"/><text x="48" y="61" font-family="Arial" font-weight="700" font-size="40" text-anchor="middle" fill="#475569">${l}</text></svg>`);
document.querySelectorAll('img').forEach(i=>{if(/avatar|gravatar/i.test(i.src)){i.srcset='';i.src=svg('•')}});
document.querySelectorAll('span.select-none').forEach(s=>{if(/^[A-Z]{2}$/.test(s.textContent.trim())&&s.closest('[class*=rounded-full]')&&!s.closest('h3'))s.textContent='•'});
// crisp redaction bars
const bar=el=>{el.style.setProperty('color','transparent','important');el.style.setProperty('background','#d5dbe4','important');el.style.borderRadius='4px';el.querySelectorAll('*').forEach(c=>{c.style.setProperty('color','transparent','important');c.style.setProperty('border-color','transparent','important');c.style.setProperty('background','transparent','important')});};
const barText=el=>{[...el.childNodes].forEach(n=>{if(n.nodeType===3&&n.nodeValue.trim()){const s=document.createElement('span');s.textContent=n.nodeValue;n.replaceWith(s);bar(s)}})};
const tab=new URLSearchParams(location.search).get('tab');
if(tab==='tasks'){document.querySelectorAll('table').forEach(t=>{const h=[...t.querySelectorAll('thead th')].map(x=>x.textContent.toUpperCase());const ix=h.map((x,i)=>/TASK OUTPUT|NOTES/.test(x)?i:-1).filter(i=>i>=0);
 t.querySelectorAll('tbody tr').forEach(r=>ix.forEach(i=>{const c=r.children[i];if(c)c.querySelectorAll('*').length?[...c.querySelectorAll('div,p,span,a')].filter(e=>e.children.length===0&&e.textContent.trim()&&e.textContent.trim()!=='-'&&e.textContent.trim()!=='—').forEach(bar):barText(c)}))})}
if(tab==='projects'){document.querySelectorAll('strong').forEach(s=>{if(/^Member [A-H]:$/.test(s.textContent.trim())){const p=s.parentElement;barText(p)}})}
if(tab==='performance'){document.querySelectorAll('select,textarea').forEach(bar);
 document.querySelectorAll('span').forEach(s=>{if(/^(Keep training|Promote|Ready for Promotion|Exceeds Expectations|Performance Improvement Plan)$/.test(s.textContent.trim()))bar(s)});}
document.querySelectorAll('[class*=fixed][class*=bottom]').forEach(e=>{if(e.querySelector('svg')&&e.getBoundingClientRect().width<90)e.style.display='none'});
})();
