#!/usr/bin/env python3
"""Batch convert all referenced PNG/JPG/GIF images to WebP, update HTML references."""
import os, re, sys
from PIL import Image

BASE = r'C:\Users\lili\Desktop\portfolio-new'
SKIP_DIRS = {'node_modules', '.git', 'unpacked-nenovia'}
IMG_EXTS = {'.png', '.jpg', '.jpeg', '.gif', '.bmp'}

# ── 1. Find all HTML files ──
html_files = []
for root, dirs, files in os.walk(BASE):
    dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
    for f in files:
        if f.lower().endswith('.html'):
            html_files.append(os.path.join(root, f))

print(f"Found {len(html_files)} HTML files")

# ── 2. Extract image references ──
# Matches: src="path.png" , src='path.jpg' , url(path.png) , url('path.jpg')
img_ref_re = re.compile(
    r'(?:src\s*=\s*["\']([^"\']+\.(?:png|jpg|jpeg|gif|bmp))["\'])'
    r'|(?:url\s*\(\s*["\']?([^)"\'\s]+\.(?:png|jpg|jpeg|gif|bmp))["\']?\s*\))',
    re.IGNORECASE
)

referenced = {}  # rel_path -> set of html_files referencing it
for html_file in html_files:
    try:
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()
    except:
        continue
    for m in img_ref_re.finditer(content):
        path = m.group(1) or m.group(2)
        if path:
            path = path.replace('\\', '/')
            if path not in referenced:
                referenced[path] = set()
            referenced[path].add(html_file)

print(f"Found {len(referenced)} unique image references\n")

# ── 3. Convert to WebP ──
results = []
for rel_path in sorted(referenced.keys()):
    abs_path = os.path.join(BASE, rel_path.replace('/', os.sep))
    if not os.path.exists(abs_path):
        results.append(('MISSING', rel_path, 0, 0, ''))
        continue

    ext = os.path.splitext(abs_path)[1].lower()
    webp_path = os.path.splitext(abs_path)[0] + '.webp'

    # Skip if WebP already exists and is newer
    if os.path.exists(webp_path) and os.path.getmtime(webp_path) >= os.path.getmtime(abs_path):
        orig_size = os.path.getsize(abs_path)
        webp_size = os.path.getsize(webp_path)
        savings = (1 - webp_size / orig_size) * 100 if orig_size > 0 else 0
        results.append(('EXISTS', rel_path, orig_size, webp_size, f'{savings:.0f}%'))
        continue

    try:
        orig_size = os.path.getsize(abs_path)
        img = Image.open(abs_path)

        # Handle palette/gray modes
        if img.mode == 'P':
            if 'transparency' in img.info:
                img = img.convert('RGBA')
            else:
                img = img.convert('RGB')
        elif img.mode == 'LA':
            img = img.convert('RGBA')
        elif img.mode == 'L':
            img = img.convert('RGB')

        # Convert CMYK to RGB
        if img.mode == 'CMYK':
            img = img.convert('RGB')

        has_alpha = img.mode == 'RGBA'

        # Save WebP with high quality
        save_kwargs = {
            'quality': 85,
            'method': 6,  # best compression
        }
        img.save(webp_path, 'WEBP', **save_kwargs)
        webp_size = os.path.getsize(webp_path)
        img.close()

        savings = (1 - webp_size / orig_size) * 100 if orig_size > 0 else 0
        results.append(('DONE', rel_path, orig_size, webp_size, f'{savings:.0f}%'))
    except Exception as e:
        results.append(('ERROR', rel_path, os.path.getsize(abs_path), 0, str(e)[:50]))

# ── 4. Update HTML references ──
updated_files = 0
for html_file in html_files:
    try:
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()
    except:
        continue

    def replace_ref(m):
        path = m.group(1) or m.group(2)
        rel = path.replace('\\', '/')
        abs_webp = os.path.join(BASE, rel.replace('/', os.sep))
        webp_rel = os.path.splitext(rel)[0] + '.webp'
        abs_check = os.path.join(BASE, webp_rel.replace('/', os.sep))

        if not os.path.exists(abs_check):
            return m.group(0)

        # Reconstruct with same quoting style
        if m.group(1):  # src="..." or src='...'
            quote = '"' if '"' in m.group(0)[:10] else "'"
            return f'src={quote}{webp_rel}{quote}'
        else:  # url(...)
            full = m.group(0)
            if "'" in full:
                return f"url('{webp_rel}')"
            elif '"' in full:
                return f'url("{webp_rel}")'
            else:
                return f'url({webp_rel})'

    new_content = img_ref_re.sub(replace_ref, content)
    if new_content != content:
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        updated_files += 1

# ── 5. Report ──
print(f"\n{'Status':<8} {'Original':>10} {'WebP':>10} {'Save':>6}  File")
print("-" * 80)
total_orig = 0
total_webp = 0
for status, path, orig, webp, info in results:
    o = f'{orig/1024:.0f}KB' if orig else '-'
    w = f'{webp/1024:.0f}KB' if webp else '-'
    s = info if '%' in info else (info[:20] if info else '')
    print(f"{status:<8} {o:>10} {w:>10} {s:>6}  {path}")
    total_orig += orig
    total_webp += webp

print("-" * 80)
if total_orig > 0:
    print(f"{'TOTAL':<8} {total_orig/1024/1024:>8.1f}MB {total_webp/1024/1024:>8.1f}MB {(1-total_webp/total_orig)*100:>5.0f}%")
print(f"\nHTML files updated: {updated_files}")
print(f"Images converted: {sum(1 for r in results if r[0]=='DONE')}")
print(f"Already WebP: {sum(1 for r in results if r[0]=='EXISTS')}")
print(f"Missing: {sum(1 for r in results if r[0]=='MISSING')}")
print(f"Errors: {sum(1 for r in results if r[0]=='ERROR')}")
