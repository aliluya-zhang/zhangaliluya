# -*- coding: utf-8 -*-
"""读取 Word 文档中用户编辑过的内容
   正确处理 2列/3列/4列表格的可编辑区

运行：python read-doc.py [docx路径]
默认路径：C:\Users\lili\Desktop\aliluya-content-edit.docx
"""
from docx import Document
import json, sys, os

DEFAULT = r"C:\Users\lili\Desktop\aliluya-content-edit.docx"
path = sys.argv[1] if len(sys.argv) > 1 else DEFAULT
doc  = Document(path)

changes = {}

def clean(s):
    return s.replace('\xa0', ' ').replace('\r', '').strip()

# 遍历所有表格
for ti, table in enumerate(doc.tables):
    rows = table.rows
    if len(rows) < 2:
        continue
    header = [clean(c.text) for c in rows[0].cells]

    nc = len(rows[0].cells)

    # ── 4列表：# | 图片路径 | 大标题（可编辑）| 小标题（可编辑）
    if nc == 4:
        for row in rows[1:]:
            cs = row.cells
            if len(cs) < 4:
                continue
            num   = clean(cs[0].text)
            title = clean(cs[2].text)   # 第3列 = 大标题可编辑区
            desc  = clean(cs[3].text)   # 第4列 = 小标题可编辑区
            if title:
                key = f"Card{num}_大标题"
                changes[key] = title
                print(f"  [Card {num}] 大标题（新）= {title}")
            if desc:
                key = f"Card{num}_小标题"
                changes[key] = desc
                print(f"  [Card {num}] 小标题（新）= {desc}")

    # ── 3列表：属性 | 当前值 | 可编辑区（第3列）
    elif nc == 3:
        for row in rows[1:]:
            cs = row.cells
            if len(cs) < 3:
                continue
            label  = clean(cs[0].text)
            edited = clean(cs[2].text)   # 第3列 = 可编辑区
            if edited and label:
                changes[label] = edited
                print(f"[{label}] = {edited}")

    # ── 2列表：属性 | 可编辑区（第2列）
    elif nc == 2:
        for row in rows[1:]:
            cs = row.cells
            if len(cs) < 2:
                continue
            label  = clean(cs[0].text)
            edited = clean(cs[1].text)   # 第2列 = 可编辑区
            if edited and label:
                changes[label] = edited
                print(f"[{label}] = {edited}")

if not changes:
    print("未检测到编辑内容（所有可编辑列为空）")
else:
    print(f"\n共检测到 {len(changes)} 处修改：")
    out = r"C:\Users\lili\WorkBuddy\20260509080323\changes.json"
    with open(out, "w", encoding="utf-8") as f:
        json.dump(changes, f, ensure_ascii=False, indent=2)
    print(f"已保存到 {out}")
