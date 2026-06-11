# -*- coding: utf-8 -*-
p = r'c:\Users\lili\WorkBuddy\20260509080323\hewasborn-static.html'
with open(p, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# 找到 About section 的起止行
about_start = None
about_end = None
in_about = False
depth = 0

for i, line in enumerate(lines):
    if 'id="about"' in line:
        about_start = i
        in_about = True
        depth = 1  # 已进入一个 <section>
        continue
    if in_about:
        # 计算 section 嵌套深度
        depth += line.count('<section')
        depth -= line.count('</section>')
        if depth == 0:
            about_end = i  # 这行是 </section>
            break

print(f'About section: lines {about_start+1} to {about_end+1}')
print(f'Line {about_end+1}: {lines[about_end].rstrip()}')

# 插入位置：about_end + 1 (after </section>)
insert_lines = [
    '',
    '',
    '<!-- Horizontal Scroll Cards (About 下方) -->',
    '<section class="hscroll-section" id="hscroll-cards">',
    '  <p class="section-label">Featured</p>',
    '  <div class="hscroll-track">',
    '    <div class="hscroll-card" data-cursor-hover>',
    '      <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=900&fit=crop" class="bg-parallax" alt="project">',
    '      <div class="card-header">',
    '        <div class="tags"><span>MF 24</span><span>Sustainable</span></div>',
    '        <div class="date">08 Sept</div>',
    '      </div>',
    '      <div class="card-footer">',
    '        <h3>AI Personal Health Tracker</h3>',
    '        <p>An intelligent companion that analyzes your breathing and sleep patterns.</p>',
    '        <a href="#">Read →</a>',
    '      </div>',
    '    </div>',
    '    <div class="hscroll-card" data-cursor-hover>',
    '      <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32e04?w=600&h=900&fit=crop" class="bg-parallax" alt="project">',
    '      <div class="card-header">',
    '        <div class="tags"><span>Next.js</span><span>Real-time</span></div>',
    '        <div class="date">22 Aug</div>',
    '      </div>',
    '      <div class="card-footer">',
    '        <h3>Eco Travel Platform</h3>',
    '        <p>A sustainable travel platform helping users reduce carbon footprint.</p>',
    '        <a href="#">Read →</a>',
    '      </div>',
    '    </div>',
    '    <div class="hscroll-card" data-cursor-hover>',
    '      <img src="https://images.unsplash.com/photo-1558591719-4b4a1aa9f47?w=600&h=900&fit=crop" class="bg-parallax" alt="project">',
    '      <div class="card-header">',
    '        <div class="tags"><span>Framer Motion</span><span>3D</span></div>',
    '        <div class="date">15 Jul</div>',
    '      </div>',
    '      <div class="card-footer">',
    '        <h3>Brand Identity System</h3>',
    '        <p>Complete visual identity for a next-gen creative studio.</p>',
    '        <a href="#">Read →</a>',
    '      </div>',
    '    </div>',
    '    <div class="hscroll-card" data-cursor-hover>',
    '      <img src="https://images.unsplash.com/photo-1634017834397-9c81e8554a0a?w=600&h=900&fit=crop" class="bg-parallax" alt="project">',
    '      <div class="card-header">',
    '        <div class="tags"><span>Three.js</span><span>WebGL</span></div>',
    '        <div class="date">03 Jun</div>',
    '      </div>',
    '      <div class="card-footer">',
    '        <h3>Interactive Data Viz</h3>',
    '        <p>Real-time data visualization with WebGL-powered 3D charts.</p>',
    '        <a href="#">Read →</a>',
    '      </div>',
    '    </div>',
    '    <div class="hscroll-card" data-cursor-hover>',
    '      <img src="https://images.unsplash.com/photo-1550684376-efcbd6e4f8e0?w=600&h=900&fit=crop" class="bg-parallax" alt="project">',
    '      <div class="card-header">',
    '        <div class="tags"><span>React</span><span>AI</span></div>',
    '        <div class="date">19 May</div>',
    '      </div>',
    '      <div class="card-footer">',
    '        <h3>Smart Home Dashboard</h3>',
    '        <p>IoT control center with AI-powered energy optimization.</p>',
    '        <a href="#">Read →</a>',
    '      </div>',
    '    </div>',
    '  </div>',
    '</section>',
    '',
]

# 在 about_end 之后插入
new_lines = lines[:about_end+1] + [ln + '\n' for ln in insert_lines] + lines[about_end+1:]

with open(p, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print('OK: inserted after line', about_end+1)
