path = r"c:\Users\lili\WorkBuddy\20260509080323\hewasborn-static.html"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# 目标图片路径映射 (第几张卡片 → 图片编号)
# 可用: 1.jpg, 3.jpg, 4.jpg, 5.jpg, 6.jpg (缺 2.jpg)
img_map = {
    1: "1.jpg",
    2: "3.jpg",
    3: "4.jpg",
    4: "5.jpg",
    5: "6.jpg",
    6: "1.jpg",
}

base = "file:///C:/Users/lili/WorkBuddy/20260509080323/img/"

# 找到 nanovia-gallery section 内的所有 nano-img 标签
import re
pattern = r'(<img src="[^"]*?/img/)(\d+\.jpg)(")'

def replacer(m):
    # 找到这是第几个匹配
    return m.group(1) + "DUMMY" + m.group(3)

# 先计数，再替换
counter = [0]
def replace_with_count(m):
    counter[0] += 1
    idx = counter[0]
    img_name = img_map.get(idx, "1.jpg")
    return f'{m.group(1)}{img_name}{m.group(3)}'

new_content = re.sub(pattern, replace_with_count, content)
print(f"Replaced {counter[0]} image paths")

with open(path, "w", encoding="utf-8") as f:
    f.write(new_content)
print("Done")
