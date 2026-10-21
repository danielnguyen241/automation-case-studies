"""Image export helpers (Pillow).
  python3 scripts/export-images.py crm /tmp/hq-capture       -> assets/crm/<tab>.webp (lossless)
  python3 scripts/export-images.py pdf report.pdf 1 2 5 8    -> assets/report-<n>.webp (170 dpi, needs poppler pdftoppm)
  python3 scripts/export-images.py png in.png out.webp [crop_bottom_px]
"""
import sys,glob,os,subprocess
from PIL import Image
A=os.path.join(os.path.dirname(__file__),'..','assets')
cmd=sys.argv[1]
if cmd=='crm':
  for f in glob.glob(os.path.join(sys.argv[2],'*.png')):
    Image.open(f).save(os.path.join(A,'crm',os.path.basename(f)[:-4]+'.webp'),lossless=True,method=6)
elif cmd=='pdf':
  for n in sys.argv[3:]:
    subprocess.run(['pdftoppm','-r','170','-png','-singlefile','-f',n,'-l',n,sys.argv[2],f'/tmp/pg{n}'],check=True)
    Image.open(f'/tmp/pg{n}.png').convert('RGB').save(os.path.join(A,f'report-{n}.webp'),lossless=True,method=6)
elif cmd=='png':
  im=Image.open(sys.argv[2]).convert('RGB')
  if len(sys.argv)>4:im=im.crop((0,0,im.width,im.height-int(sys.argv[4])))
  im.save(sys.argv[3],lossless=True,method=6)
