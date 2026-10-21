# Render real CSV/TSV/log exports to HTML tables for screenshotting. Input paths are local exports (not in repo).
import csv,html
O=lambda p:open(p,encoding='utf-8-sig')
r=list(csv.DictReader(O('/workspace/Hiagency_Guest_Post_Audit_Business.csv')))
css="""<style>body{margin:0;background:#fff;font:12px Arial,sans-serif;color:#202124}table{border-collapse:collapse}td,th{border:1px solid #e2e3e3;padding:4px 8px;white-space:nowrap;max-width:330px;overflow:hidden;text-overflow:ellipsis}th{background:#f8f9fa;font-weight:600;color:#3c4043}.rn{background:#f8f9fa;color:#5f6368;text-align:center}.bar{background:#f9fbfd;border-bottom:1px solid #dadce0;padding:8px 12px;font:13px Arial;color:#3c4043}.tab{display:inline-block;padding:6px 14px;background:#e8f0fe;color:#1a73e8;border-radius:4px;margin:6px 8px;font:13px Arial}</style>"""
def table(title,cols,rows,tab):
  h=f'<html><head><meta charset=utf8>{css}</head><body><div class=bar>{html.escape(title)}</div><table><tr><th></th>'+''.join(f'<th>{chr(65+i)}</th>' for i in range(len(cols)))+'</tr><tr><td class=rn>1</td>'+''.join(f'<th>{html.escape(c)}</th>' for c in cols)+'</tr>'
  for i,x in enumerate(rows):h+=f'<tr><td class=rn>{i+2}</td>'+''.join(f'<td>{html.escape(x.get(c,""))}</td>' for c in cols)+'</tr>'
  return h+f'</table><div class=tab>{tab}</div></body></html>'
cols=['STT','Website Domain','Phân Hạng Tier','Authority Score (AS)','Live Organic Traffic','Trạng Thái Thẩm Định / Độ Lệch']
open('audit.html','w').write(table('Guest Post Audit · Business (exported CSV, 1,818 rows)',cols,r[:22],'Guest Post Audit - Business'))
s=list(csv.DictReader(O('/workspace/shortlist_full.tsv'),delimiter='\t'))
open('short.html','w').write(table('Shortlist “Mua ngay” (126 rows)',['Ưu tiên','Lý do','Website Domain','Phân Hạng Tier','Authority Score (AS)'],s[:20],'Mua ngay'))
log=open('/workspace/content-check/run.log').read().splitlines()
i=max(k for k,l in enumerate(log) if l.startswith('hairfolli      Blog'))
blk=log[i:i+24]
open('term.html','w').write('<html><head><meta charset=utf8><style>body{margin:0;background:#0d0d12;color:#d6d3f0;font:14px/1.55 "DejaVu Sans Mono",monospace;padding:18px 22px}.t{color:#6b6880;margin-bottom:10px}.w{color:#ffcf5c}</style></head><body><div class=t>$ python3 content-check/run.py   # 21 Oct 2026, excerpt of run.log</div>'+''.join(f'<div class="{"w" if ("⚠" in l or "days)" in l) else ""}">{html.escape(l)}</div>' for l in blk)+'</body></html>')
