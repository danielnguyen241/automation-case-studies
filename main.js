// Agent network (hero). Agent names are the real Grok Bot agents.
const AG=['SEMRUSH check','Spidey Bot','Upwork agent','GMB','Hairfolli plan','AI Influencer','Analysis','Backlink bots','Schema validator','MIS'];
(()=>{const g=document.getElementById('netg');let s='';const cx=260,cy=260;
AG.forEach((n,i)=>{const a=i/AG.length*Math.PI*2-Math.PI/2,r=i%2?170:205,x=cx+r*Math.cos(a),y=cy+r*Math.sin(a);s+=`<line class="ln" x1="${cx}" y1="${cy}" x2="${x}" y2="${y}"/>`;
 s+=`<g class="nd" style="animation-delay:${-i*.6}s"><circle cx="${x}" cy="${y}" r="7"/><text x="${x}" y="${y+(y<cy?-14:24)}">${n}</text></g>`});
s+=`<g class="nd hub"><circle cx="${cx}" cy="${cy}" r="38"/><text x="${cx}" y="${cy+5}" style="font-weight:800;fill:#0b0b10">Daniel</text></g>`;g.innerHTML=s})();
// Tools
document.getElementById('toolgrid').innerHTML=TOOLS.map(t=>`<a class="tool rv" href="https://github.com/danielnguyen241/${t.n}" target="_blank" rel="noopener"><span class="tg">${t.tag}</span><h4>${t.t}</h4><p>${t.d}</p><code>↗ ${t.n}</code></a>`).join('');
// Cursor
const c=document.getElementById('cur');addEventListener('mousemove',e=>{c.classList.add('on');c.style.left=e.clientX+'px';c.style.top=e.clientY+'px'});
document.querySelectorAll('a,video,.tool,.res div').forEach(el=>{el.addEventListener('mouseenter',()=>c.classList.add('big'));el.addEventListener('mouseleave',()=>c.classList.remove('big'))});
// Progress
const pr=document.getElementById('prog');addEventListener('scroll',()=>pr.style.transform=`scaleX(${scrollY/(document.body.scrollHeight-innerHeight)})`,{passive:true});
// Count-up + reveal
const count=el=>{const n=+el.dataset.n,t0=performance.now();const f=t=>{const p=Math.min((t-t0)/1600,1);el.textContent=Math.round(n*(1-Math.pow(1-p,4))).toLocaleString('en-US');if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)};
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const t=e.target;t.classList.add('in');t.querySelectorAll('[data-n]').forEach(count);
 t.querySelectorAll('video').forEach(v=>v.play().catch(()=>{}));io.unobserve(t)}),{threshold:.12});
document.querySelectorAll('.rv,.stats,.wfcard,.res').forEach(el=>io.observe(el));
