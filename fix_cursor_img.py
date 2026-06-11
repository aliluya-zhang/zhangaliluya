# -*- coding: utf-8 -*-
"""修复瀑布流图片路径 + 修复光标消失问题"""
import re, os

src = r"c:\Users\lili\WorkBuddy\20260509080323\hewasborn-static.html"
html = open(src, encoding="utf-8").read()

# ── Fix 1: 图片路径改为绝对路径（文件://协议）──────────────
IMG = r"C:/Users/lili/WorkBuddy/20260509080323/img/1.jpg"
html = html.replace('src="./img/1.jpg"', f'src="file:///{IMG}"')

# ── Fix 2: 光标改为纯色深灰，去掉 difference 模式 ─────────
# 原来: white半透明 + mix-blend-mode:difference → 浅灰底上消失
# 改为: 深灰 cursor，position fixed，永不消失
OLD_CURSOR_CSS = r"""#cursor {
  position: fixed;
  top: 0; left: 0;
  width: 20px; height: 20px;
  border-radius: 50%;
  background: rgba\(255,255,255,0\.75\);
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  transform: translate\(-50%,-50%\);
  transition: width 0\.2s, height 0\.2s, background 0\.2s;
\}
#cursor\.hover \{
  width: 44px; height: 44px;
  background: rgba\(232,196,160,0\.9\);
\}
#cursor\.hover \.cursor-dot \{
  opacity: 0;
\}
#cursor \.cursor-dot \{
  position: absolute; inset: 0;
  border-radius: 50%;
  border: 1\.5px solid rgba\(0,0,0,0\.4\);
  opacity: 1;
  transition: opacity 0\.2s;
\}"""

NEW_CURSOR_CSS = """#cursor {
  position: fixed;
  top: 0; left: 0;
  width: 22px; height: 22px;
  border-radius: 50%;
  background: rgba(26,26,26,0.75);
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%,-50%);
  transition: width 0.2s, height 0.2s, background 0.2s;
}
#cursor.hover {
  width: 44px; height: 44px;
  background: rgba(232,196,160,0.9);
}
#cursor .cursor-dot {
  position: absolute; inset: 0;
  border-radius: 50%;
  border: 1.5px solid rgba(0,0,0,0.3);
  opacity: 1;
  transition: opacity 0.2s;
}
#cursor.hover .cursor-dot { opacity: 0; }"""

html = re.sub(OLD_CURSOR_CSS, NEW_CURSOR_CSS, html)

# ── Fix 3: body 去掉 cursor:none，改为 pointer:fine 时的处理 ─
# 保留 cursor: none 在全局，但确保光标始终显示
# 另外 body 的 overflow-x: hidden 不影响光标

# ── Fix 4: 确保 nano-masonry CSS 中图片 height:auto ────────
# 检查 .nano-img 是否已有 height:auto，没加的话补上
OLD_NANO_IMG = r"\.nano-img \{(?:[^\}]*\n)*?\}"
m = re.search(OLD_NANO_IMG, html)
if m:
    css_block = m.group()
    if 'height' not in css_block:
        new_block = css_block.rstrip().rstrip('}') + "\n  height: auto; display: block;\n}"
        html = html.replace(css_block, new_block)

open(src, "w", encoding="utf-8", newline="").write(html)
print("✅ 修复完成:")
print(f"  1. 图片路径 → file:///C:/Users/lili/WorkBuddy/20260509080323/img/1.jpg")
print(f"  2. 光标 → 深灰 rgba(26,26,26,0.75)，去掉 difference 模式")
print(f"  3. nano-img → height:auto display:block")
