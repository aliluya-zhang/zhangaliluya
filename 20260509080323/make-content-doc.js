const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, VerticalAlign, PageNumber, PageBreak, LevelFormat,
  UnderlineType
} = require('docx');
const fs = require('fs');

const OUTPUT = 'C:/Users/lili/WorkBuddy/20260509080323/aliluya-content-edit.docx';

// ── helpers ──────────────────────────────────────────────────
const border1 = { style: BorderStyle.SINGLE, size: 1, color: 'D0D0D0' };
const borders = { top: border1, bottom: border1, left: border1, right: border1 };
const thickBorder = { style: BorderStyle.SINGLE, size: 4, color: '1a1a1a' };
const thickBorders = { top: thickBorder, bottom: thickBorder, left: thickBorder, right: thickBorder };

function cell(text, width, opts = {}) {
  return new TableCell({
    borders: opts.noBorder ? { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } } : borders,
    width: { size: width, type: WidthType.DXA },
    shading: opts.fill ? { fill: opts.fill, type: ShadingType.CLEAR } : undefined,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    verticalAlign: VerticalAlign.TOP,
    children: [new Paragraph({
      children: [new TextRun({
        text,
        font: 'Arial',
        size: opts.size || 18,
        bold: opts.bold || false,
        color: opts.color || '1a1a1a',
        underline: opts.underline ? { type: UnderlineType.SINGLE } : undefined,
      })]
    })]
  });
}

function editCell(width) {
  return new TableCell({
    borders: thickBorders,
    width: { size: width, type: WidthType.DXA },
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    verticalAlign: VerticalAlign.TOP,
    children: [new Paragraph({
      children: [new TextRun({ text: '　', font: 'Arial', size: 18 })]
    })]
  });
}

function sectionLabel(text) {
  return new Paragraph({
    spacing: { before: 320, after: 80 },
    children: [new TextRun({
      text,
      font: 'Arial',
      size: 20,
      bold: true,
      color: '888888',
      allCaps: true,
    })]
  });
}

function h2(text) {
  return new Paragraph({
    spacing: { before: 60, after: 120 },
    children: [new TextRun({ text, font: 'Arial', size: 28, bold: true, color: '1a1a1a' })]
  });
}

function note(text) {
  return new Paragraph({
    spacing: { before: 40, after: 60 },
    children: [new TextRun({ text, font: 'Arial', size: 16, color: '999999', italics: true })]
  });
}

function spacer() {
  return new Paragraph({ spacing: { before: 80, after: 80 }, children: [new TextRun('')] });
}

function twoCol(label1, hint1, label2, hint2) {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [4680, 4680],
    borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } },
    rows: [
      new TableRow({ children: [
        new TableCell({ borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } }, width: { size: 4680, type: WidthType.DXA }, margins: { top: 40, bottom: 40, left: 0, right: 60 }, children: [
          new Paragraph({ children: [new TextRun({ text: label1, font: 'Arial', size: 16, bold: true, color: '1a1a1a' })] }),
          new Paragraph({ children: [new TextRun({ text: hint1, font: 'Arial', size: 15, color: '888888', italics: true })] }),
        ]}),
        new TableCell({ borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } }, width: { size: 4680, type: WidthType.DXA }, margins: { top: 40, bottom: 40, left: 60, right: 0 }, children: [
          new Paragraph({ children: [new TextRun({ text: label2, font: 'Arial', size: 16, bold: true, color: '1a1a1a' })] }),
          new Paragraph({ children: [new TextRun({ text: hint2, font: 'Arial', size: 15, color: '888888', italics: true })] }),
        ]}),
      ]})
    ]
  });
}

// ── document ─────────────────────────────────────────────────
const doc = new Document({
  numbering: {
    config: [
      { reference: 'bullets', levels: [{ level: 0, format: LevelFormat.BULLET, text: '\u2022', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    ]
  },
  styles: {
    default: { document: { run: { font: 'Arial', size: 20 } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 36, bold: true, font: 'Arial', color: '1a1a1a' }, paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 24, bold: true, font: 'Arial', color: '1a1a1a' }, paragraph: { spacing: { before: 280, after: 140 }, outlineLevel: 1 } },
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: 'D0D0D0', space: 1 } },
          spacing: { after: 120 },
          children: [
            new TextRun({ text: 'ALILUYA 作品集网站  ·  内容修改文档', font: 'Arial', size: 16, color: '888888' }),
            new TextRun({ text: '\t', font: 'Arial', size: 16 }),
            new TextRun({ text: '最后更新：2026-05-09', font: 'Arial', size: 16, color: '888888' }),
          ],
          tabStops: [{ type: 'right', position: 9360 }]
        })]
      })
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          border: { top: { style: BorderStyle.SINGLE, size: 2, color: 'D0D0D0', space: 1 } },
          spacing: { before: 120 },
          children: [
            new TextRun({ text: 'Aliluya Portfolio  ·  修改文档', font: 'Arial', size: 16, color: '888888' }),
            new TextRun({ text: '\t', font: 'Arial', size: 16 }),
            new TextRun({ text: '第 ', font: 'Arial', size: 16, color: '888888' }),
            new TextRun({ children: [PageNumber.CURRENT], font: 'Arial', size: 16, color: '888888' }),
            new TextRun({ text: ' 页', font: 'Arial', size: 16, color: '888888' }),
          ],
          tabStops: [{ type: 'right', position: 9360 }]
        })]
      })
    },
    children: [

      // ══════════════════════════════════════════════
      // 封面
      // ══════════════════════════════════════════════
      new Paragraph({ spacing: { before: 2000, after: 200 }, children: [new TextRun({ text: 'ALILUYA', font: 'Arial', size: 72, bold: true, color: '1a1a1a' })] }),
      new Paragraph({ spacing: { before: 0, after: 80 }, children: [new TextRun({ text: '作品集网站  ·  内容修改文档', font: 'Arial', size: 28, color: '666666' })] }),
      new Paragraph({ spacing: { before: 0, after: 0 }, children: [new TextRun({ text: 'Portfolio Website  ·  Content Edit Guide', font: 'Arial', size: 22, color: '999999' })] }),
      spacer(),
      new Paragraph({ spacing: { before: 0, after: 0 }, children: [new TextRun({ text: '════════════════════════════════════════════════════════', font: 'Courier New', size: 16, color: 'DDDDDD' })] }),
      spacer(),
      new Paragraph({ children: [new TextRun({ text: '📁 文件路径：', font: 'Arial', size: 18, bold: true, color: '1a1a1a' }), new TextRun({ text: 'C:\\Users\\lili\\Desktop\\hewasborn-static.html', font: 'Courier New', size: 18, color: '555555' })] }),
      new Paragraph({ children: [new TextRun({ text: '🎬 视频路径：', font: 'Arial', size: 18, bold: true, color: '1a1a1a' }), new TextRun({ text: 'C:\\Users\\lili\\Desktop\\豆包.mp4', font: 'Courier New', size: 18, color: '555555' })] }),
      new Paragraph({ children: [new TextRun({ text: '🖼️ 图片路径：', font: 'Arial', size: 18, bold: true, color: '1a1a1a' }), new TextRun({ text: 'C:\\Users\\lili\\WorkBuddy\\20260509080323\\img\\  （1.jpg ~ 6.jpg）', font: 'Courier New', size: 18, color: '555555' })] }),

      new Paragraph({ children: [new PageBreak()] }),

      // ══════════════════════════════════════════════
      // 使用说明
      // ══════════════════════════════════════════════
      sectionLabel('使用说明'),
      new Paragraph({ spacing: { before: 80, after: 120 }, children: [new TextRun({ text: '使用方法', font: 'Arial', size: 28, bold: true, color: '1a1a1a' })] }),
      new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: [new TextRun({ text: '编辑 Word 文档中【内容区】一栏的空白区域，输入任意内容', font: 'Arial', size: 18 })] }),
      new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: [new TextRun({ text: '图片路径：替换为你的本地图片完整路径（绝对路径或相对路径）', font: 'Arial', size: 18 })] }),
      new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: [new TextRun({ text: '修改完成后告知我，我会将内容同步回 HTML 文件', font: 'Arial', size: 18 })] }),
      new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: [new TextRun({ text: '颜色格式：支持 HEX（如 #e8e9eb）、RGB（如 rgba(26,26,26,0.75)）', font: 'Arial', size: 18 })] }),
      note('提示：颜色值为空时使用默认值，图片路径需确保文件存在且路径正确'),
      spacer(),
      new Paragraph({ children: [new PageBreak()] }),

      // ══════════════════════════════════════════════
      // 区块 1：导航栏
      // ══════════════════════════════════════════════
      sectionLabel('第 1 部分'),
      new Paragraph({ spacing: { before: 60, after: 40 }, children: [new TextRun({ text: '导航栏  Navbar', font: 'Arial', size: 32, bold: true, color: '1a1a1a' })] }),
      note('文件位置：HTML 第 249-261 行（nav-bar）、第 285-296 行（menu-panel 汉堡菜单）'),
      spacer(),

      // Logo
      h2('1.1  Logo 文字'),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2800, 6560],
        rows: [
          new TableRow({ children: [
            cell('当前内容', 2800, { fill: 'F5F5F5', bold: true }),
            cell('Aliluya', 6560),
          ]}),
          new TableRow({ children: [
            cell('内容区（可编辑）', 2800, { fill: 'FAFAFA', bold: true }),
            cell('', 6560),
          ]}),
        ]
      }),
      note('第 252 行：替换 <span class="logo">Aliluya</span> 中的文字'),
      spacer(),

      // Nav item 1
      h2('1.2  导航项 1：项目案例（带下拉）'),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2800, 6560],
        rows: [
          new TableRow({ children: [
            cell('下拉触发文字', 2800, { fill: 'F5F5F5', bold: true }),
            cell('项目案例', 6560),
          ]}),
          new TableRow({ children: [
            cell('内容区（可编辑）', 2800, { fill: 'FAFAFA', bold: true }),
            cell('', 6560),
          ]}),
          new TableRow({ children: [
            cell('下拉项目 1', 2800, { fill: 'F5F5F5', bold: true }),
            cell('品牌设计', 6560),
          ]}),
          new TableRow({ children: [
            cell('下拉项目 2', 2800, { fill: 'F5F5F5', bold: true }),
            cell('网页开发', 6560),
          ]}),
          new TableRow({ children: [
            cell('下拉项目 3', 2800, { fill: 'F5F5F5', bold: true }),
            cell('3D 视觉', 6560),
          ]}),
          new TableRow({ children: [
            cell('下拉项目 4', 2800, { fill: 'F5F5F5', bold: true }),
            cell('视频制作', 6560),
          ]}),
          new TableRow({ children: [
            cell('下拉项目 5', 2800, { fill: 'F5F5F5', bold: true }),
            cell('UI/UX 设计', 6560),
          ]}),
          new TableRow({ children: [
            cell('下拉项目 6', 2800, { fill: 'F5F5F5', bold: true }),
            cell('动态交互', 6560),
          ]}),
          new TableRow({ children: [
            cell('内容区（全部可编辑）', 2800, { fill: 'FAFAFA', bold: true }),
            cell('', 6560),
          ]}),
        ]
      }),
      spacer(),

      // Nav item 2
      h2('1.3  导航项 2：联系我'),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2800, 6560],
        rows: [
          new TableRow({ children: [
            cell('当前内容', 2800, { fill: 'F5F5F5', bold: true }),
            cell('联系我', 6560),
          ]}),
          new TableRow({ children: [
            cell('内容区（可编辑）', 2800, { fill: 'FAFAFA', bold: true }),
            cell('', 6560),
          ]}),
        ]
      }),
      spacer(),

      // Mobile menu
      h2('1.4  移动端汉堡菜单（6 个项目 + 联系我）'),
      note('位置：HTML 第 285-296 行（menu-panel）'),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2800, 6560],
        rows: [
          new TableRow({ children: [
            cell('菜单项 1', 2800, { fill: 'F5F5F5', bold: true }),
            cell('品牌设计  →  #works-brand', 6560),
          ]}),
          new TableRow({ children: [
            cell('菜单项 2', 2800, { fill: 'F5F5F5', bold: true }),
            cell('网页开发  →  #works-web', 6560),
          ]}),
          new TableRow({ children: [
            cell('菜单项 3', 2800, { fill: 'F5F5F5', bold: true }),
            cell('3D 视觉  →  #works-3d', 6560),
          ]}),
          new TableRow({ children: [
            cell('菜单项 4', 2800, { fill: 'F5F5F5', bold: true }),
            cell('视频制作  →  #works-video', 6560),
          ]}),
          new TableRow({ children: [
            cell('菜单项 5', 2800, { fill: 'F5F5F5', bold: true }),
            cell('UI/UX 设计  →  #works-uiux', 6560),
          ]}),
          new TableRow({ children: [
            cell('菜单项 6', 2800, { fill: 'F5F5F5', bold: true }),
            cell('动态交互  →  #works-interaction', 6560),
          ]}),
          new TableRow({ children: [
            cell('菜单项 7', 2800, { fill: 'F5F5F5', bold: true }),
            cell('联系我  →  #contact', 6560),
          ]}),
          new TableRow({ children: [
            cell('全部可编辑', 2800, { fill: 'FAFAFA', bold: true }),
            cell('', 6560),
          ]}),
        ]
      }),

      new Paragraph({ children: [new PageBreak()] }),

      // ══════════════════════════════════════════════
      // 区块 2：Hero 首屏
      // ══════════════════════════════════════════════
      sectionLabel('第 2 部分'),
      new Paragraph({ spacing: { before: 60, after: 40 }, children: [new TextRun({ text: 'Hero 首屏  Hero Section', font: 'Arial', size: 32, bold: true, color: '1a1a1a' })] }),
      note('文件位置：HTML 第 359-377 行  ·  背景视频：./豆包.mp4  ·  背景色：#e8e9eb'),
      spacer(),

      h2('2.1  主标题'),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2800, 6560],
        rows: [
          new TableRow({ children: [
            cell('当前内容', 2800, { fill: 'F5F5F5', bold: true }),
            cell('Hi~\nI\'m 阿莉路亚', 6560),
          ]}),
          new TableRow({ children: [
            cell('内容区（可编辑）\n可多行，支持<br>换行', 2800, { fill: 'FAFAFA', bold: true }),
            cell('', 6560),
          ]}),
        ]
      }),
      note('第 367 行：替换 <span class="hero-name"> 中的文字'),
      spacer(),

      h2('2.2  副标题 / 简介正文'),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2800, 6560],
        rows: [
          new TableRow({ children: [
            cell('当前内容', 2800, { fill: 'F5F5F5', bold: true }),
            cell('8年以上设计行业经验，横跨数字艺术、游戏视觉及产品全案设计。曾参与王者好物和王者荣耀造物节七周年KV海报制作，自创 IP 曾被上市公司独家买断一年。\n\n我擅长将品牌逻辑与艺术感知结合，曾主导美容仪器产品的配色设计、包装配套及全链路物料落地。从 0 到 1 构建品牌视觉体系，不仅能画好一张画，更能打磨好一个产品。', 6560),
          ]}),
          new TableRow({ children: [
            cell('内容区（可编辑）\n支持多段，<br>为换行', 2800, { fill: 'FAFAFA', bold: true }),
            cell('', 6560),
          ]}),
        ]
      }),
      note('第 368-371 行：完整替换 <p class="hero-sub"> 中的文字和 <br> 标签'),
      spacer(),

      h2('2.3  背景视频'),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2800, 6560],
        rows: [
          new TableRow({ children: [
            cell('当前视频路径', 2800, { fill: 'F5F5F5', bold: true }),
            cell('./豆包.mp4', 6560),
          ]}),
          new TableRow({ children: [
            cell('建议替换为', 2800, { fill: 'F5F5F5', bold: true }),
            cell('推荐尺寸：1920×1080 或更高，MP4 格式，文件小于 50MB', 6560),
          ]}),
          new TableRow({ children: [
            cell('新视频路径（绝对路径）', 2800, { fill: 'FAFAFA', bold: true }),
            cell('', 6560),
          ]}),
        ]
      }),
      note('第 363 行：修改 <source src="..."> 中的路径'),
      spacer(),

      h2('2.4  文字颜色'),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2800, 3280, 3280],
        rows: [
          new TableRow({ children: [
            cell('元素', 2800, { fill: 'F5F5F5', bold: true }),
            cell('当前颜色值', 3280, { fill: 'F5F5F5', bold: true }),
            cell('可编辑（新值）', 3280, { fill: 'FAFAFA', bold: true }),
          ]}),
          new TableRow({ children: [
            cell('标题', 2800),
            cell('#1a1a1a（黑色）', 3280),
            cell('', 3280),
          ]}),
          new TableRow({ children: [
            cell('正文', 2800),
            cell('rgba(26,26,26,0.75)', 3280),
            cell('', 3280),
          ]}),
          new TableRow({ children: [
            cell('正文（行 368 style）', 2800),
            cell('rgba(26,26,26,0.75)', 3280),
            cell('', 3280),
          ]}),
        ]
      }),

      new Paragraph({ children: [new PageBreak()] }),

      // ══════════════════════════════════════════════
      // 区块 3：About
      // ══════════════════════════════════════════════
      sectionLabel('第 3 部分'),
      new Paragraph({ spacing: { before: 60, after: 40 }, children: [new TextRun({ text: 'About 关于区  About Section', font: 'Arial', size: 32, bold: true, color: '1a1a1a' })] }),
      note('文件位置：HTML 第 379-403 行'),
      spacer(),

      h2('3.1  小标签（Section Label）'),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2800, 6560],
        rows: [
          new TableRow({ children: [ cell('当前内容', 2800, { fill: 'F5F5F5', bold: true }), cell('About', 6560) ]}),
          new TableRow({ children: [ cell('内容区（可编辑）', 2800, { fill: 'FAFAFA', bold: true }), cell('', 6560) ]}),
        ]
      }),
      spacer(),

      h2('3.2  大标题（Section Title）'),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2800, 6560],
        rows: [
          new TableRow({ children: [ cell('当前内容', 2800, { fill: 'F5F5F5', bold: true }), cell('Crafting Digital\nExperiences', 6560) ]}),
          new TableRow({ children: [ cell('内容区（可编辑）\n支持换行', 2800, { fill: 'FAFAFA', bold: true }), cell('', 6560) ]}),
        ]
      }),
      note('第 383 行：替换 <h2 class="section-title"> 中的文字，<br> 换行'),
      spacer(),

      h2('3.3  正文第一段'),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2800, 6560],
        rows: [
          new TableRow({ children: [
            cell('当前内容', 2800, { fill: 'F5F5F5', bold: true }),
            cell('我是一名专注于创意前端开发与设计的技术美术。擅长将先进技术（WebGL、Framer Motion、Three.js）与审美直觉结合，打造令人难忘的数字体验。曾参与《王者荣耀》海报设计，创作的 IP 被上市公司收购。', 6560),
          ]}),
          new TableRow({ children: [
            cell('内容区（可编辑）', 2800, { fill: 'FAFAFA', bold: true }),
            cell('', 6560),
          ]}),
        ]
      }),
      spacer(),

      h2('3.4  正文第二段'),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2800, 6560],
        rows: [
          new TableRow({ children: [
            cell('当前内容', 2800, { fill: 'F5F5F5', bold: true }),
            cell('目前主导 NenoVia/霓诺（FDA/CE 认证医美品牌）全案设计，同时推进多个创意作品集项目。', 6560),
          ]}),
          new TableRow({ children: [
            cell('内容区（可编辑）', 2800, { fill: 'FAFAFA', bold: true }),
            cell('', 6560),
          ]}),
        ]
      }),

      new Paragraph({ children: [new PageBreak()] }),

      // ══════════════════════════════════════════════
      // 区块 4：NenoVia 瀑布流
      // ══════════════════════════════════════════════
      sectionLabel('第 4 部分'),
      new Paragraph({ spacing: { before: 60, after: 40 }, children: [new TextRun({ text: 'NenoVia 瀑布流图片区  Masonry Gallery', font: 'Arial', size: 32, bold: true, color: '1a1a1a' })] }),
      note('文件位置：HTML 第 405-451 行  ·  图片：6 张，高度自适应原始比例'),
      spacer(),

      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [560, 2800, 2800, 3200],
        rows: [
          new TableRow({ children: [
            cell('#', 560, { fill: '1a1a1a', bold: true, color: 'FFFFFF' }),
            cell('图片路径（绝对路径）', 2800, { fill: '1a1a1a', bold: true, color: 'FFFFFF' }),
            cell('大标题（hover 显示）', 2800, { fill: '1a1a1a', bold: true, color: 'FFFFFF' }),
            cell('小标题（hover 显示）', 3200, { fill: '1a1a1a', bold: true, color: 'FFFFFF' }),
          ]}),
          new TableRow({ children: [
            cell('1', 560, { fill: 'F5F5F5', bold: true }),
            cell('C:\\Users\\lili\\WorkBuddy\\20260509080323\\img\\1.jpg', 2800),
            cell('NenoVia 产品全案设计', 2800),
            cell('从用户调研到产品定义，主导品牌视觉重塑，并落地包装、物料及社媒宣发。', 3200),
          ]}),
          new TableRow({ children: [
            cell('2', 560, { fill: 'F5F5F5', bold: true }),
            cell('C:\\Users\\lili\\WorkBuddy\\20260509080323\\img\\3.jpg', 2800),
            cell('', 2800, { fill: 'FAFAFA' }),
            cell('', 3200, { fill: 'FAFAFA' }),
          ]}),
          new TableRow({ children: [
            cell('3', 560, { fill: 'F5F5F5', bold: true }),
            cell('C:\\Users\\lili\\WorkBuddy\\20260509080323\\img\\4.jpg', 2800),
            cell('', 2800, { fill: 'FAFAFA' }),
            cell('', 3200, { fill: 'FAFAFA' }),
          ]}),
          new TableRow({ children: [
            cell('4', 560, { fill: 'F5F5F5', bold: true }),
            cell('C:\\Users\\lili\\WorkBuddy\\20260509080323\\img\\5.jpg', 2800),
            cell('', 2800, { fill: 'FAFAFA' }),
            cell('', 3200, { fill: 'FAFAFA' }),
          ]}),
          new TableRow({ children: [
            cell('5', 560, { fill: 'F5F5F5', bold: true }),
            cell('C:\\Users\\lili\\WorkBuddy\\20260509080323\\img\\6.jpg', 2800),
            cell('', 2800, { fill: 'FAFAFA' }),
            cell('', 3200, { fill: 'FAFAFA' }),
          ]}),
          new TableRow({ children: [
            cell('6', 560, { fill: 'F5F5F5', bold: true }),
            cell('C:\\Users\\lili\\WorkBuddy\\20260509080323\\img\\1.jpg（复用）', 2800),
            cell('', 2800, { fill: 'FAFAFA' }),
            cell('', 3200, { fill: 'FAFAFA' }),
          ]}),
        ]
      }),
      note('说明：图片路径为绝对路径，建议替换为相对路径（如 ./img/2.jpg）。6 张卡片宽高比由图片原始比例决定，无需手动设置。'),
      spacer(),

      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2800, 3280, 3280],
        rows: [
          new TableRow({ children: [
            cell('瀑布流参数', 2800, { fill: 'F5F5F5', bold: true }),
            cell('当前值', 3280, { fill: 'F5F5F5', bold: true }),
            cell('可编辑（新值）', 3280, { fill: 'FAFAFA', bold: true }),
          ]}),
          new TableRow({ children: [
            cell('列数', 2800),
            cell('columns: 3 300px（3 列，最小宽度 300px）', 3280),
            cell('', 3280),
          ]}),
          new TableRow({ children: [
            cell('卡片间距（margin-bottom）', 2800),
            cell('16px', 3280),
            cell('', 3280),
          ]}),
          new TableRow({ children: [
            cell('卡片圆角', 2800),
            cell('border-radius: 16px', 3280),
            cell('', 3280),
          ]}),
          new TableRow({ children: [
            cell('hover 遮罩文字颜色', 2800),
            cell('白色（默认）', 3280),
            cell('', 3280),
          ]}),
        ]
      }),

      new Paragraph({ children: [new PageBreak()] }),

      // ══════════════════════════════════════════════
      // 区块 5：Contact
      // ══════════════════════════════════════════════
      sectionLabel('第 5 部分'),
      new Paragraph({ spacing: { before: 60, after: 40 }, children: [new TextRun({ text: 'Contact 联系区  Contact Section', font: 'Arial', size: 32, bold: true, color: '1a1a1a' })] }),
      note('文件位置：HTML 第 457-467 行'),
      spacer(),

      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2800, 6560],
        rows: [
          new TableRow({ children: [ cell('小标签', 2800, { fill: 'F5F5F5', bold: true }), cell('Contact', 6560) ]}),
          new TableRow({ children: [ cell('内容区（可编辑）', 2800, { fill: 'FAFAFA', bold: true }), cell('', 6560) ]}),
          new TableRow({ children: [ cell('大标题', 2800, { fill: 'F5F5F5', bold: true }), cell('Let\'s Work\nTogether', 6560) ]}),
          new TableRow({ children: [ cell('内容区（可编辑）\n支持换行', 2800, { fill: 'FAFAFA', bold: true }), cell('', 6560) ]}),
          new TableRow({ children: [ cell('描述文字', 2800, { fill: 'F5F5F5', bold: true }), cell('有想法？一起把数字体验做到极致。', 6560) ]}),
          new TableRow({ children: [ cell('内容区（可编辑）', 2800, { fill: 'FAFAFA', bold: true }), cell('', 6560) ]}),
          new TableRow({ children: [ cell('按钮文字', 2800, { fill: 'F5F5F5', bold: true }), cell('发邮件给我 →', 6560) ]}),
          new TableRow({ children: [ cell('内容区（可编辑）', 2800, { fill: 'FAFAFA', bold: true }), cell('', 6560) ]}),
          new TableRow({ children: [ cell('邮箱地址', 2800, { fill: 'F5F5F5', bold: true }), cell('mailto:hello@aliluya.com', 6560) ]}),
          new TableRow({ children: [ cell('内容区（可编辑）', 2800, { fill: 'FAFAFA', bold: true }), cell('', 6560) ]}),
        ]
      }),

      new Paragraph({ children: [new PageBreak()] }),

      // ══════════════════════════════════════════════
      // 区块 6：Footer
      // ══════════════════════════════════════════════
      sectionLabel('第 6 部分'),
      new Paragraph({ spacing: { before: 60, after: 40 }, children: [new TextRun({ text: 'Footer 页脚', font: 'Arial', size: 32, bold: true, color: '1a1a1a' })] }),
      note('文件位置：HTML 第 469-473 行'),
      spacer(),

      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2800, 6560],
        rows: [
          new TableRow({ children: [ cell('版权文字', 2800, { fill: 'F5F5F5', bold: true }), cell('© 2026 阿莉路亚. All rights reserved.', 6560) ]}),
          new TableRow({ children: [ cell('内容区（可编辑）', 2800, { fill: 'FAFAFA', bold: true }), cell('', 6560) ]}),
          new TableRow({ children: [ cell('技术栈说明', 2800, { fill: 'F5F5F5', bold: true }), cell('Built with Next.js · Three.js · Framer Motion', 6560) ]}),
          new TableRow({ children: [ cell('内容区（可编辑）', 2800, { fill: 'FAFAFA', bold: true }), cell('', 6560) ]}),
        ]
      }),

      new Paragraph({ children: [new PageBreak()] }),

      // ══════════════════════════════════════════════
      // 区块 7：全局样式
      // ══════════════════════════════════════════════
      sectionLabel('附录'),
      new Paragraph({ spacing: { before: 60, after: 40 }, children: [new TextRun({ text: '全局样式参数  Global Styles', font: 'Arial', size: 32, bold: true, color: '1a1a1a' })] }),
      note('文件位置：HTML 第 86-330 行（<style> 区块）'),
      spacer(),

      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2800, 3280, 3280],
        rows: [
          new TableRow({ children: [
            cell('样式属性', 2800, { fill: '1a1a1a', bold: true, color: 'FFFFFF' }),
            cell('当前值', 3280, { fill: '1a1a1a', bold: true, color: 'FFFFFF' }),
            cell('可编辑（新值）', 3280, { fill: '1a1a1a', bold: true, color: 'FFFFFF' }),
          ]}),
          new TableRow({ children: [ cell('页面背景色', 2800), cell('#e8e9eb（浅灰）', 3280), cell('', 3280) ]}),
          new TableRow({ children: [ cell('正文文字色', 2800), cell('#1a1a1a', 3280), cell('', 3280) ]}),
          new TableRow({ children: [ cell('小标签颜色（section-label）', 2800), cell('rgba(26,26,26,0.35)', 3280), cell('', 3280) ]}),
          new TableRow({ children: [ cell('光标颜色', 2800), cell('rgba(26,26,26,0.75)', 3280), cell('', 3280) ]}),
          new TableRow({ children: [ cell('瀑布流布局', 2800), cell('CSS columns: 3 300px', 3280), cell('', 3280) ]}),
          new TableRow({ children: [ cell('瀑布流卡片间距', 2800), cell('margin-bottom: 16px', 3280), cell('', 3280) ]}),
          new TableRow({ children: [ cell('瀑布流卡片圆角', 2800), cell('border-radius: 16px', 3280), cell('', 3280) ]}),
          new TableRow({ children: [ cell('Three.js 几何透明度', 2800), cell('opacity: 0.06', 3280), cell('', 3280) ]}),
          new TableRow({ children: [ cell('波光 Canvas 透明度', 2800), cell('rgba(150,150,150, 0.015)', 3280), cell('', 3280) ]}),
          new TableRow({ children: [ cell('字体家族', 2800), cell('Kanit（标题）/ Plus Jakarta Sans（正文）', 3280), cell('', 3280) ]}),
        ]
      }),

      spacer(),
      new Paragraph({
        spacing: { before: 200, after: 0 },
        border: { top: { style: BorderStyle.SINGLE, size: 2, color: 'DDDDDD', space: 1 } },
        children: [new TextRun({ text: '修改完成后，告诉我要修改的内容，我会同步更新 HTML 文件。', font: 'Arial', size: 17, color: '888888', italics: true })]
      }),

    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(OUTPUT, buffer);
  console.log('OK →', OUTPUT);
}).catch(e => { console.error(e); process.exit(1); });
