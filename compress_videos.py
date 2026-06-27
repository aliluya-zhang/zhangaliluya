import subprocess, os

FFMPEG = r"C:\Users\lili\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin\ffmpeg.exe"
BASE = r"C:\Users\lili\Desktop\portfolio-new"

jobs = [
    # (src, dst, extra_opts)
    ("img/hero.mp4",              "img/hero_c.mp4",              ["-c:v", "libx264", "-crf", "30", "-preset", "fast", "-an", "-movflags", "+faststart"]),
    ("img/YMS/wushuiyin.mp4",    "img/YMS/wushuiyin_c.mp4",    ["-c:v", "libx264", "-crf", "30", "-preset", "fast", "-an", "-movflags", "+faststart"]),
    ("img/SP_ODI.mp4",           "img/SP_ODI_c.mp4",           ["-c:v", "libx264", "-crf", "28", "-preset", "fast", "-an", "-movflags", "+faststart"]),
    ("img/wave/1/Video 16.mp4",  "img/wave/1/Video16_c.mp4",  ["-c:v", "libx264", "-crf", "28", "-preset", "fast", "-b:v", "800k", "-maxrate", "800k", "-bufsize", "1600k", "-c:a", "aac", "-b:a", "64k", "-movflags", "+faststart"]),
    ("img/youer/01.mp4",         "img/youer/01_c.mp4",         ["-c:v", "libx264", "-crf", "28", "-preset", "fast", "-b:v", "600k", "-maxrate", "600k", "-bufsize", "1200k", "-c:a", "aac", "-b:a", "64k", "-movflags", "+faststart"]),
]

for src, dst, opts in jobs:
    src_path = os.path.join(BASE, src)
    dst_path = os.path.join(BASE, dst)
    if os.path.exists(dst_path):
        print(f"SKIP (exists): {dst}")
        continue
    old_size = os.path.getsize(src_path) / 1024 / 1024
    print(f"Compressing: {src} ({old_size:.2f} MB)...")
    cmd = [FFMPEG, "-i", src_path] + opts + ["-y", dst_path]
    r = subprocess.run(cmd, capture_output=True)
    if r.returncode == 0:
        new_size = os.path.getsize(dst_path) / 1024 / 1024
        pct = (1 - new_size / old_size) * 100
        print(f"  DONE: {old_size:.2f}MB -> {new_size:.2f}MB ({pct:.0f}% smaller)")
    else:
        print(f"  FAILED: {r.stderr.decode(errors='ignore')[-200:]}")
