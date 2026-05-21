"""全站图片 WebP 优化：扫描 HTML 引用 → 转换 → 更新引用"""
import os, re
from PIL import Image

ROOT = r'c:\Users\lili\WorkBuddy\20260509080323'
IMG_DIR = os.path.join(ROOT, 'img')
PLACEHOLDER = 'data:image'  # Skip inline data URIs

# --- Step 1: Collect all image references from HTML ---
refs = {}  # {orig_path: set of html_files}
html_files = []

for f in os.listdir(ROOT):
    if f.endswith('.html'):
        html_files.append(f)
        with open(os.path.join(ROOT, f), 'r', encoding='utf-8') as fh:
            content = fh.read()
        # Find all src="img/..." and src='img/...'
        for m in re.finditer(r'''src=["'](img/[^"']+\.(?:png|jpg|jpeg))["']''', content, re.IGNORECASE):
            orig = m.group(1)
            if PLACEHOLDER in orig:
                continue
            if orig not in refs:
                refs[orig] = set()
            refs[orig].add(f)
        # Also find data-src for videos -- skip those
        for m in re.finditer(r'''src=["'](img/[^"']+\.(?:png|jpg|jpeg))["']''', content, re.IGNORECASE):
            orig = m.group(1)
            if PLACEHOLDER in orig:
                continue
            if orig not in refs:
                refs[orig] = set()
            refs[orig].add(f)

print(f'Found {len(refs)} unique image references across {len(html_files)} HTML files')

# --- Step 2: Convert to WebP ---
converted = []
skipped_small = []
skipped_existing = []
skipped_large_jpg = []

for orig_rel, _ in sorted(refs.items()):
    orig_path = os.path.join(ROOT, orig_rel)
    if not os.path.exists(orig_path):
        print(f'  MISSING: {orig_rel}')
        continue
    
    name, ext = os.path.splitext(orig_rel)
    webp_rel = name + '.webp'
    webp_path = os.path.join(ROOT, webp_rel)
    
    file_size = os.path.getsize(orig_path)
    
    # Skip very small files (< 20KB)
    if file_size < 20 * 1024:
        skipped_small.append(orig_rel)
        continue
    
    # Skip if webp already exists and is newer
    if os.path.exists(webp_path) and os.path.getmtime(webp_path) >= os.path.getmtime(orig_path):
        skipped_existing.append(orig_rel)
        continue
    
    # Convert
    try:
        img = Image.open(orig_path)
        # For JPEG, webp quality 85 is good. For PNG with transparency, keep alpha.
        if img.mode in ('RGBA', 'PA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
            img = img.convert('RGBA')
            img.save(webp_path, 'WEBP', quality=85, lossless=False)
        else:
            img = img.convert('RGB')
            img.save(webp_path, 'WEBP', quality=85, lossless=False)
        
        new_size = os.path.getsize(webp_path)
        ratio = (1 - new_size / file_size) * 100
        converted.append((orig_rel, file_size, new_size, ratio))
        print(f'  OK  {orig_rel}  {file_size//1024}KB -> {new_size//1024}KB  ({ratio:.0f}%)')
    except Exception as e:
        print(f'  FAIL {orig_rel}: {e}')

# --- Step 3: Update HTML references ---
# Replace .png/.jpg references with .webp, but keep original extension for the webp file lookup
for orig_rel, html_set in refs.items():
    name, ext = os.path.splitext(orig_rel)
    webp_rel = name + '.webp'
    webp_path = os.path.join(ROOT, webp_rel)
    
    if not os.path.exists(webp_path):
        continue  # No webp was created for this
    
    for html_file in html_set:
        html_path = os.path.join(ROOT, html_file)
        with open(html_path, 'r', encoding='utf-8') as fh:
            content = fh.read()
        
        # Only replace if the exact path appears
        old = f'src="{orig_rel}"'
        new = f'src="{webp_rel}"'
        if old in content:
            content = content.replace(old, new)
        
        old2 = f"src='{orig_rel}'"
        new2 = f"src='{webp_rel}'"
        if old2 in content:
            content = content.replace(old2, new2)
        
        with open(html_path, 'w', encoding='utf-8') as fh:
            fh.write(content)

# --- Summary ---
print('\n' + '='*60)
print(f'SUMMARY:')
print(f'  Converted: {len(converted)} files')
print(f'  Skipped (small <20KB): {len(skipped_small)}')
print(f'  Skipped (existing webp): {len(skipped_existing)}')
total_old = sum(s[1] for s in converted)
total_new = sum(s[2] for s in converted)
print(f'  Total before: {total_old//1024:,}KB ({total_old//1024//1024}MB)')
print(f'  Total after:  {total_new//1024:,}KB ({total_new//1024//1024}MB)')
print(f'  Saved: {(total_old-total_new)//1024:,}KB ({(1-total_new/total_old)*100:.0f}%)')
print('  HTML files updated')
