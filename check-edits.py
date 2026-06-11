# -*- coding: utf-8 -*-
"""检测 Word 文档中的用户编辑内容"""
from docx import Document

doc = Document(r"C:\Users\lili\Desktop\aliluya-content-edit.docx")

changes = []
for ti, table in enumerate(doc.tables):
    for ri, row in enumerate(table.rows):
        cells = row.cells
        if len(cells) >= 3:
            c0 = (cells[0].text or '').strip()
            c1 = (cells[1].text or '').strip()
            c2 = (cells[2].text or '').strip()
            # 如果第三列有内容，且与第二列不同，则为用户编辑
            if c2 and c2.strip() and c2.strip() != c1.strip():
                changes.append((c0, c1, c2))
        elif len(cells) == 2:
            c0 = (cells[0].text or '').strip()
            c1 = (cells[1].text or '').strip()
            # 查找"内容区"类的行，看是否有编辑
            if any(kw in c0 for kw in ['内容区', '可编辑', '图片路径', '大标题', '小标题', '正文']):
                if c1.strip():
                    changes.append((c0, '', c1))

if changes:
    print(f"发现 {len(changes)} 处编辑内容:")
    for c0, c1, c2 in changes:
        print(f"\n  项目: {c0}")
        if c1:
            print(f"  原值: {c1}")
        print(f"  新值: {c2}")
else:
    print("未发现新的编辑内容，所有可编辑区域均为空。")
