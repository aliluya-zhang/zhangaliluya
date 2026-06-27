"""将 work-nenovia.html 用到的图片转为高品质 WebP"""
import os
from PIL import Image

BASE = r"C:\Users\lili\Desktop\portfolio-new"

# work-nenovia.html 用到的图片列表
images = [
    r"img\xin\豆包 - 2026-06-26T140529.483.png",
    r"img\xin\Group 30.png",
    r"img\xin\Group 161.png",
    r"img\xin\Group 11.png",
    r"img\xin\Group 12.png",
    r"img\xin\Group 13.png",
    r"img\xin\Group 14.png",
    r"img\xin\Group 15.png",
    r"img\xin\Group-10 1.png",
    r"img\xin\3_4低饱和冷调浴室素颜人像美容仪种草图-(4).jpg",
    r"img\xin\3_4低饱和冷调浴室素颜人像美容仪种草图-(10).jpg",
    r"img\image\微信截图_20260622170831.png",
]

QUALITY = 95  # 近乎无损的高品质

for rel_path in images:
    src = os.path.join(BASE, rel_path)
    dst = os.path.splitext(src)[0] + ".webp"

    if not os.path.exists(src):
        print(f"  [跳过] 文件不存在: {rel_path}")
        continue

    try:
        img = Image.open(src)
        # 保留透明度（如有）
        img.save(dst, "WEBP", quality=QUALITY, method=6)
        src_size = os.path.getsize(src)
        dst_size = os.path.getsize(dst)
        ratio = (1 - dst_size / src_size) * 100
        print(f"[OK] {os.path.basename(rel_path):50s} {src_size/1024:7.1f}KB -> {dst_size/1024:7.1f}KB  ({ratio:.0f}%减小)")
    except Exception as e:
        print(f"  [错误] {rel_path}: {e}")

print("\n完成！")
