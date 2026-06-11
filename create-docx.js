const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, LevelFormat, PageNumber, PageBreak
} = require('docx');
const fs = require('fs');

const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };
const headerBorder = { style: BorderStyle.SINGLE, size: 1, color: "2E75B6" };
const headerBorders = { top: headerBorder, bottom: headerBorder, left: headerBorder, right: headerBorder };

const doc = new Document({
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } }
        }]
      },
      {
        reference: "numbers",
        levels: [{
          level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } }
        }]
      }
    ]
  },
  styles: {
    default: {
      document: { run: { font: "Arial", size: 22 } }
    },
    paragraphStyles: [
      {
        id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, font: "Arial", color: "1F4E79" },
        paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 }
      },
      {
        id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Arial", color: "2E75B6" },
        paragraph: { spacing: { before: 300, after: 160 }, outlineLevel: 1 }
      },
      {
        id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, font: "Arial", color: "404040" },
        paragraph: { spacing: { before: 200, after: 120 }, outlineLevel: 2 }
      }
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
          children: [
            new TextRun({ text: "作品集网站开发修改文档", bold: true, size: 20, color: "666666" }),
            new TextRun({ text: "\t", size: 20 }),
            new TextRun({ text: "hewasborn-static.html", size: 20, color: "999999" })
          ],
          tabStops: [{ type: "right", position: 9360 }],
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "2E75B6", space: 4 } }
        })]
      })
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          children: [
            new TextRun({ text: "\u00A9 2026 \u963F\u8389\u8DEF\u4E9A \u2014 \u524D\u7AEF\u5F00\u53D1\u5DE5\u7A0B\u5E08", size: 18, color: "999999" }),
            new TextRun({ text: "\t\u7B2C ", size: 18, color: "999999" }),
            new TextRun({ children: [PageNumber.CURRENT], size: 18, color: "999999" }),
            new TextRun({ text: " \u9875", size: 18, color: "999999" })
          ],
          tabStops: [{ type: "right", position: 9360 }],
          border: { top: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC", space: 4 } }
        })]
      })
    },
    children: [

      // ── 标题 ──
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: "\u300AHe Was Born\u300B\u98CE\u683C\u4F5C\u54C1\u96C6\u7F51\u7AD9 \u2014 \u5F00\u53D1\u4FEE\u6539\u6587\u6863", bold: true })]
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "\u6587\u4EF6\u540D\u79F0\uFF1A", bold: true, size: 22 }),
          new TextRun({ text: "hewasborn-static.html", size: 22, color: "2E75B6" })
        ]
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "\u6587\u4EF6\u8DEF\u5F84\uFF1A", bold: true, size: 22 }),
          new TextRun({ text: "c:\\Users\\lili\\WorkBuddy\\20260509080323\\hewasborn-static.html", size: 22 })
        ]
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "\u5F00\u53D1\u65E5\u671F\uFF1A", bold: true, size: 22 }),
          new TextRun({ text: "2026-05-09", size: 22 })
        ]
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "\u7248\u672C\uFF1A", bold: true, size: 22 }),
          new TextRun({ text: "v1.0.0", size: 22 })
        ]
      }),
      new Paragraph({ children: [new PageBreak()] }),

      // ── 一、项目概述 ──
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: "\u4E00\u3001\u9879\u76EE\u6982\u8FF0", bold: true })]
      }),
      new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun({
          text: "\u672C\u9879\u76EE\u5C31\u300AHe Was Born\u300B\u7F51\u7AD9\uff08https://www.hewasborn.com/\uff09\u5B8C\u6574\u52A8\u6548\u4E0E\u4EA4\u4E92\u8BBE\u8BA1\u7684\u521B\u610F\u5C55\u793A\u9875\u9762\u3002\u9879\u76EE\u91C7\u7528\u201C\u9759\u6001 HTML + CDN \u5F15\u5165\u201D\u65B9\u5F0F\u5B9E\u73B0\uFF0C\u65E0\u9700\u7F16\u8BD1\u73AF\u5883\uFF0C\u76F4\u63A5\u6D4F\u89C8\u5668\u6253\u5F00\u5373\u53EF\u9884\u89C8\u3002",
          size: 22
        })]
      }),

      // ── 二、技术选型 ──
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: "\u4E8C\u3001\u6280\u672F\u9009\u578B", bold: true })]
      }),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2800, 6560],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: headerBorders,
                width: { size: 2800, type: WidthType.DXA },
                shading: { fill: "2E75B6", type: ShadingType.CLEAR },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun({ text: "\u7C7B\u522B", bold: true, color: "FFFFFF", size: 22 })] })]
              }),
              new TableCell({
                borders: headerBorders,
                width: { size: 6560, type: WidthType.DXA },
                shading: { fill: "2E75B6", type: ShadingType.CLEAR },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun({ text: "\u8BE6\u60C5", bold: true, color: "FFFFFF", size: 22 })] })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, width: { size: 2800, type: WidthType.DXA }, shading: { fill: "F2F7FC", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: "\u7F51\u9875\u7ED3\u6784", bold: true, size: 22 })] })] }),
              new TableCell({ borders, width: { size: 6560, type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: "HTML5 + CSS3 + Vanilla JavaScript", size: 22 })] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, width: { size: 2800, type: WidthType.DXA }, shading: { fill: "F2F7FC", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: "\u52A8\u6548\u5E93", bold: true, size: 22 })] })] }),
              new TableCell({ borders, width: { size: 6560, type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: "Framer Motion (CDN) + Three.js (CDN) + Canvas API", size: 22 })] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, width: { size: 2800, type: WidthType.DXA }, shading: { fill: "F2F7FC", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: "\u5B57\u4F53", bold: true, size: 22 })] })] }),
              new TableCell({ borders, width: { size: 6560, type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: "Inter (Google Fonts) + Noto Sans SC", size: 22 })] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, width: { size: 2800, type: WidthType.DXA }, shading: { fill: "F2F7FC", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: "\u989C\u8272\u4E3B\u8C31", bold: true, size: 22 })] })] }),
              new TableCell({ borders, width: { size: 6560, type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: "\u80CC\u666F #0A0A0A\uFF0C\u5B57\u4F53 #FFFFFF\uFF0C\u4E3B\u989C\u8272 #E8C4A0\uFF0C\u6D89\u53EF\u8272 #FFB3D9\uFF0C\u70ED\u60C5\u6A59 #FF8A5C", size: 22 })] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, width: { size: 2800, type: WidthType.DXA }, shading: { fill: "F2F7FC", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: "\u54CD\u5E94\u5F0F\u5B9E\u73B0", bold: true, size: 22 })] })] }),
              new TableCell({ borders, width: { size: 6560, type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: "CSS Media Queries\uff08\u57FA\u4E8E 768px \u5206\u6BB5\u70B9\uff09+ \u79FB\u52A8\u7AEF\u5141\u8BB8\u9ED8\u8BA4\u5149\u6807", size: 22 })] })] })
            ]
          })
        ]
      }),

      new Paragraph({ children: [new PageBreak()] }),

      // ── 三、动效清单 ──
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: "\u4E09\u3001\u5168\u90E8\u52A8\u6548\u6E05\u5355", bold: true })]
      }),

      // 动效表格
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [500, 1600, 2400, 4860],
        rows: [
          new TableRow({
            children: [
              new TableCell({ borders: headerBorders, width: { size: 500, type: WidthType.DXA }, shading: { fill: "2E75B6", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, verticalAlign: "center", children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "\u7F16\u53F7", bold: true, color: "FFFFFF", size: 20 })] })] }),
              new TableCell({ borders: headerBorders, width: { size: 1600, type: WidthType.DXA }, shading: { fill: "2E75B6", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, verticalAlign: "center", children: [new Paragraph({ children: [new TextRun({ text: "\u52A8\u6548\u540D\u79F0", bold: true, color: "FFFFFF", size: 20 })] })] }),
              new TableCell({ borders: headerBorders, width: { size: 2400, type: WidthType.DXA }, shading: { fill: "2E75B6", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, verticalAlign: "center", children: [new Paragraph({ children: [new TextRun({ text: "\u4F4D\u7F6E", bold: true, color: "FFFFFF", size: 20 })] })] }),
              new TableCell({ borders: headerBorders, width: { size: 4860, type: WidthType.DXA }, shading: { fill: "2E75B6", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, verticalAlign: "center", children: [new Paragraph({ children: [new TextRun({ text: "\u5B9E\u73B0\u8BE6\u60C5", bold: true, color: "FFFFFF", size: 20 })] })] })
            ]
          }),
          ...[
            ["1", "Logo \u6CE2\u5149\u52A8\u753B", "#wave-canvas (Hero)", "\u9875\u9762\u52A0\u8F7D\u65F6\uFF0CCanvas \u7ED8\u5236\u591A\u5C42\u6B63\u5F26\u6CE2\u5E26 + blur \u6EE4\u955C\uFF0C\u4F9D\u65F6\u95F4\u6D41\u52A8\uFF0C\u7ED8\u5236 3 \u4E2A\u6CE2\u5E26\uFF0C\u4ECE\u6DF1\u5230\u6D45\u900F\u660E\u5EA6\u9010\u589E\u52A0"],
            ["2", "\u81EA\u5B9A\u4E49\u5149\u6807\u8DDF\u968F", "#cursor", "\u76D1\u542C mousemove \u4E8B\u4EF6\uFF0C\u7ED8\u5236 20px \u7圆形\uFF0Cmix-blend-mode: difference\u3002hover \u53EF\u70B9\u51FB\u5143\u7D20\u65F6\u653E\u5927\u81F3 44px\u5E76\u53D8\u989C\u8272"],
            ["3", "\u9879\u76EE\u5361\u7247\u60AC\u6052\u6548\u679C", ".project-card", "CSS transition: scale(1.03)\u3001\u56FE\u7247 scale(1.08)\u3001\u8FB9\u6846\u53D8\u8272\u3001\u6D6A\u5C3E\u9632\u715E\u3002\u6301\u7EED 0.25s ease-out"],
            ["4", "\u6C49\u5821\u83DC\u5355\u6ED1\u5165", "#menu-panel", "CSS translateX(100%) \u2192 0 \u6ED1\u5165\uFF0C\u80CC\u666F\u6D45\u9ED8\u900F\u660E\u3002\u83DC\u5355\u9879\u4F9D\u6B21\u6E10\u6D89\u5165\uFF0C\u901A\u8FC7 nth-child \u5EF6\u8FDF\u63A7\u5236"],
            ["5", "Three.js \u52A8\u6001\u80CC\u666F", "#bg-canvas", "WebGL \u7ED8\u5236 Icosahedron\u3001Octahedron\u3001Tetrahedron\u3001Torus \u7EBF\u6846\u67F1\u4F53\uFF0C\u989C\u8272\u91C7\u7528\u7C89/\u6A59/\u84DD\u9AD8\u998D\u548C\u8272\uFF0C\u5C4F\u5E55\u56FA\u5B9A\u5728\u80CC\u666F"],
            ["6", "\u6A2A\u5411\u6E2F\u52A8\u89C6\u5DEE", "#works-track", "\u76D1\u542C scroll \u4E8B\u4EF6\uFF0C\u5C06\u6EDA\u52A8\u8FDB\u5EA6\u6620\u5C04\u5230 translateX\uFF0C\u4EA7\u751F\u6A2A\u5411\u89C6\u5DEE\u6548\u679C\u3002\u9700\u8981\u624B\u52A8\u6EDA\u52A8\u624D\u80FD\u89C2\u770B"],
            ["7", "\u6EDA\u52A8\u89E6\u53D1\u6D89\u5165", ".reveal", "IntersectionObserver \u76D1\u542C\u5143\u7D20\u8FDB\u5165\u89C6\u53E3\uFF0C\u6DFB\u52A0 in-view \u7C7B\u540E\u89E6\u53D1 CSS \u8F6C\u6362\uFF1Aopacity 0\u21921\u3001translateY 50px\u21920\u3001\u7B49\u5F85 0.15s"],
            ["8", "\u6570\u5B57\u9010\u589E\u8BA1\u6570\u5668", ".counter-num", "IntersectionObserver \u89E6\u53D1\u540E\u4F7F\u7528 requestAnimationFrame \u8FD0\u884C easeOutQuart \u7F13\u52A8\u51CF\u901F\uFF0C1.5s \u5185\u4ECE 0 \u9010\u589E\u81F3\u76EE\u6807\u503C"],
            ["9", "\u6A61\u76D4\u7B94\u56DE\u6293\u6548\u679C", ".elastic-wrap", "\u6A61\u76D4\u7B94\u6548\u679C\uFF1A\u6EDA\u5230\u9876\u90E8/\u5E95\u90E8\u65F6\u7EE7\u7EED\u6EDA\u52A8\u4EA7\u751F\u7F29\u6027\u504F\u79FB\uFF08translateY\uFF09\uFF0C\u4F7F\u7528\u7B80\u5355 scroll \u4E8B\u4EF6\u5B9E\u73B0"]
          ].map(([num, name, loc, desc], i) =>
            new TableRow({
              children: [
                new TableCell({ borders, width: { size: 500, type: WidthType.DXA }, shading: { fill: i % 2 === 0 ? "FFFFFF" : "F5F8FC", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, verticalAlign: "center", children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: num, bold: true, size: 20 })] })] }),
                new TableCell({ borders, width: { size: 1600, type: WidthType.DXA }, shading: { fill: i % 2 === 0 ? "FFFFFF" : "F5F8FC", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: name, bold: true, size: 20 })] })] }),
                new TableCell({ borders, width: { size: 2400, type: WidthType.DXA }, shading: { fill: i % 2 === 0 ? "FFFFFF" : "F5F8FC", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: loc, size: 20, color: "666666" })] })] }),
                new TableCell({ borders, width: { size: 4860, type: WidthType.DXA }, shading: { fill: i % 2 === 0 ? "FFFFFF" : "F5F8FC", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: desc, size: 20 })] })] })
              ]
            })
          )
        ]
      }),

      new Paragraph({ children: [new PageBreak()] }),

      // ── 四、页面结构 ──
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: "\u56DB\u3001\u9875\u9762\u7ED3\u6784", bold: true })]
      }),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2200, 2400, 4760],
        rows: [
          new TableRow({
            children: [
              new TableCell({ borders: headerBorders, width: { size: 2200, type: WidthType.DXA }, shading: { fill: "2E75B6", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: "\u533A\u5757", bold: true, color: "FFFFFF", size: 22 })] })] }),
              new TableCell({ borders: headerBorders, width: { size: 2400, type: WidthType.DXA }, shading: { fill: "2E75B6", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: "ID", bold: true, color: "FFFFFF", size: 22 })] })] }),
              new TableCell({ borders: headerBorders, width: { size: 4760, type: WidthType.DXA }, shading: { fill: "2E75B6", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: "\u5185\u5BB9\u8BF4\u660E", bold: true, color: "FFFFFF", size: 22 })] })] })
            ]
          }),
          ...[
            ["\u5BFC\u822A\u680F", "#navbar", "\u5BFC\u822A\u680F\uFF0C\u6EDA\u52A8 60px \u540E\u6DFB\u52A0\u6B65\u52A8\u80CC\u666F + backdrop-filter blur"],
            ["\u6C49\u5821\u83DC\u5355\u8986\u76D6\u5C42", "#menu-overlay + #menu-panel", "\u6ED1\u51FA\u83DC\u5355\u9762\u677F\uFF0C\u4ECE\u53F3\u4FA7\u6ED1\u5165"],
            ["Hero \u9996\u5C4F\u533A\u57DF", "#hero", "\u6CE2\u5149 Canvas \u52A8\u753B\u80CC\u666F\uFF0C\u5B57\u4F53\u6D89\u5165\u6D88\u606F\uFF0C\u63A7\u5236\u6F14\u793A\u65F6\u95F4 2.2s"],
            ["\u5173\u4E8E\u6211\u4EEC", "#about", "\u96C6\u6210\u9875\u9762\u8BF4\u660E\u6587\u6848\uFF0C\u53CC\u5217\u5E03\u5C40"],
            ["\u670D\u52A1\u4E13\u533A", "#services", "3 \u4E2A\u670D\u52A1\u5361\u7247\uFF0C\u60AC\u6052\u6D6A\u5C3E\u6548\u679C"],
            ["\u4F5C\u54C1\u5C55\u793A", "#works", "\u6A2A\u5411\u6E2F\u52A8\u5217\u8868\uFF0C\u9879\u76EE\u5361\u7247\u7F1D\u5217\u5C55\u793A"],
            ["\u6570\u636E\u8BA1\u6570\u5668", ".counter-row", "3 \u4E2A\u7EDF\u8BA1\u6570\u5B57\uFF0C\u6EDA\u52A8\u89E6\u53D1\u9010\u589E\u52A8\u753B"],
            ["\u8054\u7CFB\u6211\u4EEC", "#contact", "\u8054\u7CFB\u53F3\u4E0B\u65B9\uFF0C\u90AE\u4EF6\u6309\u94AE"],
            ["\u9875\u811A", ".footer", "\u7248\u6743\u4FE1\u606F\u548C\u6280\u672F\u6807\u7B7E"]
          ].map(([block, id, content], i) =>
            new TableRow({
              children: [
                new TableCell({ borders, width: { size: 2200, type: WidthType.DXA }, shading: { fill: i % 2 === 0 ? "FFFFFF" : "F5F8FC", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: block, bold: true, size: 22 })] })] }),
                new TableCell({ borders, width: { size: 2400, type: WidthType.DXA }, shading: { fill: i % 2 === 0 ? "FFFFFF" : "F5F8FC", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: id, size: 20, color: "2E75B6", font: "Consolas" })] })] }),
                new TableCell({ borders, width: { size: 4760, type: WidthType.DXA }, shading: { fill: i % 2 === 0 ? "FFFFFF" : "F5F8FC", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: content, size: 22 })] })] })
              ]
            })
          )
        ]
      }),

      new Paragraph({ children: [new PageBreak()] }),

      // ── 五、修改指南 ──
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: "\u4E94\u3001\u4FEE\u6539\u6307\u5357", bold: true })]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({ text: "5.1 \u5982\u4F55\u4FEE\u6539\u6587\u5B57\u5185\u5BB9", bold: true })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "\u5728 HTML \u6587\u4EF6\u4E2D\u67E5\u627E\u76F8\u5E94\u7684\u6587\u5B57\u5185\u5BB9\uFF0C\u76F4\u63A5\u4FEE\u6539\u5373\u53EF\u3002", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "\u9879\u76EE\u5361\u7247\u5185\u5BB9\u4F4D\u4E8E works-track \u533A\u5757\u4E2D\uFF0C\u6BCF\u4E2A project-card \u5361\u7247\u5305\u542B\u6807\u9898\u3001\u63CF\u8FF0\u548C\u6807\u7B7E\u3002", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "\u5B57\u4F53\u63CF\u8FF0\u4F4D\u4E8E .hero-sub \u548C .hero-title \u5143\u7D20\u4E2D\u3002", size: 22 })]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({ text: "5.2 \u5982\u4F55\u66FF\u6362\u80CC\u666F\u89C6\u9891", bold: true })]
      }),
      new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun({ text: "\u5F53\u524D\u91C7\u7528 Three.js \u7ED8\u5236\u52A8\u6001\u51E0\u4F55\u4F53\u80CC\u666F\u3002\u5982\u9700\u66FF\u6362\u4E3A\u56FA\u5B9A\u56FE\u7247\uFF0C\u4FEE\u6539 #bg-canvas \u76F8\u5173\u4EE3\u7801\uFF1A", size: 22 })]
      }),
      new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun({ text: "// \u539F\u59CB\u4EE3\u7801\uFF08\u5185\u7F6E\u5728\u811A\u672C\u4E2D\uFF09", size: 20, color: "666666", font: "Consolas" })]
      }),
      new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun({ text: "#bg-canvas { background: url('your-image.jpg') center/cover no-repeat fixed; }", size: 20, font: "Consolas", color: "2E75B6" })]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({ text: "5.3 \u5982\u4F55\u6DFB\u52A0\u65B0\u7684\u9879\u76EE\u5361\u7247", bold: true })]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun({ text: "\u5728 works-track \u5143\u7D20\u5185\u90E8\u6DFB\u52A0\u65B0\u7684 project-card div", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun({ text: "\u4FEE\u6539 project-thumb-inner \u7684 background \u5C5E\u6027\u6765\u8C03\u6574\u989C\u8272", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun({ text: "\u6DFB\u52A0 data-cursor-hover \u5C5E\u6027\u4EE5\u542F\u7528\u81EA\u5B9A\u4E49\u5149\u6807\u6548\u679C", size: 22 })]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({ text: "5.4 \u989C\u8272\u4E3B\u8C31\u4FEE\u6539", bold: true })]
      }),
      new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun({ text: "\u5728 <style> \u533A\u5757\u4E2D\u67E5\u627E .text-gradient\uFF0C\u4FEE\u6539 background \u5C5E\u6027\u5373\u53EF\u8C03\u6574\u6D89\u6D3A\u6587\u5B57\u989C\u8272\u3002", size: 22 })]
      }),
      new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun({ text: "\u989C\u8272\u53D8\u91CF\u5B58\u50A8\u5728 CSS :root \u4E2D\uFF0C\u53EF\u6DFB\u52A0 --primary-color \u7B49\u81EA\u5B9A\u4E49\u5C5E\u6027\u3002", size: 22 })]
      }),

      // ── 六、已知问题 ──
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: "\u516D\u3001\u5DF2\u77E5\u9650\u5236\u4E0E\u95EE\u9898", bold: true })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "\u79FB\u52A8\u7AEF\u9690\u85CF\u81EA\u5B9A\u4E49\u5149\u6807\uFF0C\u4F7F\u7528\u9ED8\u8BA4\u5149\u6807\uFF08@media (pointer: coarse)\uFF09", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "\u6A2A\u5411\u6E2F\u52A8\u9700\u8981\u624B\u52A8\u6EDA\u52A8\u624D\u80FD\u89C2\u770B\uFF0C\u6EDA\u8F6E\u65E0\u6CD5\u89E6\u53D1", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Three.js \u80CC\u666F\u5728\u6781\u4F4E\u901F\u8BBE\u5907\u4E0A\u53EF\u80FD\u6709\u6027\u80FD\u95EE\u9898\uFF0C\u5EFA\u8BAE\u5728\u79FB\u52A8\u7AEF\u4F7F\u7528\u9759\u6001\u80CC\u666F", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "\u6B64\u9879\u76EE\u4E3A\u9884\u89C8\u7248\u672C\uFF0C\u6B63\u5F0F\u751F\u4EA7\u73AF\u5883\u5EFA\u8BAE\u8FC1\u79FB\u81F3 Next.js App Router \u9879\u76EE", size: 22 })]
      }),

      new Paragraph({ children: [new PageBreak()] }),

      // ── 七、技术架构 ──
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: "\u4E03\u3001\u6280\u672F\u67B6\u6784\u8BF4\u660E", bold: true })]
      }),
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({ text: "\u7F51\u9875\u5C42\u6B21\u7ED3\u6784", bold: true })]
      }),
      new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun({ text: "body > #cursor (z:9999) > #bg-canvas (z:0 fixed) > .elastic-wrap > nav + sections + footer", size: 20, font: "Consolas", color: "333333" })]
      }),
      new Paragraph({
        spacing: { after: 160 },
        children: [new TextRun({ text: "\u5173\u4E8E\u5C42\u53E0\u987A\u5E8F\uFF1A\u5149\u6807\u6700\u9AD8\uFF08\u63A7\u5236\u5143\u7D20\uFF09\uFF0C\u6D77\u6811\u7B49\u56FE\u5C42\uFF08\u89C6\u89C9\u6548\u679C\uFF09\uFF0C\u5185\u5BB9\u5C42\uFF08\u53EF\u6EDA\u52A8\uFF09\uFF0C\u56FA\u5B9A\u80CC\u666F\uFF08\u6700\u4F4E\uFF09", size: 22 })]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({ text: "JavaScript \u811A\u672C\u5206\u584C", bold: true })]
      }),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2600, 6760],
        rows: [
          new TableRow({
            children: [
              new TableCell({ borders: headerBorders, width: { size: 2600, type: WidthType.DXA }, shading: { fill: "2E75B6", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: "\u51FD\u6570\u540D\u79F0", bold: true, color: "FFFFFF", size: 22 })] })] }),
              new TableCell({ borders: headerBorders, width: { size: 6760, type: WidthType.DXA }, shading: { fill: "2E75B6", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: "\u804C\u80FD", bold: true, color: "FFFFFF", size: 22 })] })] })
            ]
          }),
          ...[
            ["initCursor()", "\u81EA\u5B9A\u4E49\u5149\u6807\u8DDF\u968F\u52A8\u753B + hover \u72B6\u6001\u5207\u6362"],
            ["initWave()", "Canvas \u7ED8\u5236 Hero \u533A\u57DF\u6CE2\u5149\u52A8\u753B"],
            ["initMenu()", "\u6C49\u5821\u83DC\u5355\u6253\u5F00/\u5173\u95ED\u903B\u8F91"],
            ["initThreeBG()", "Three.js WebGL \u7ED8\u5668\u521D\u59CB\u5316\u548C\u6A2A\u7EBF\u51E0\u4F55\u4F53\u8F6C\u52A8"],
            ["initHorizontalScroll()", "\u6A2A\u5411\u6E2F\u52A8\u7B11\u52A8\uFF0C\u6EDA\u52A8\u91C7\u7527\u8F6C\u6362"],
            ["initReveal()", "IntersectionObserver \u6EDA\u52A8\u6D89\u5165\u89E6\u53D1"],
            ["initCounters()", "requestAnimationFrame \u6570\u5B57\u9010\u589E\u8BA1\u6570\u5668"],
            ["initElastic()", "\u6A61\u76D4\u7B94\u6548\u679C\uFF0C\u6EDA\u52A8\u8D85\u754C\u65F6\u7684\u7F29\u6027\u504F\u79FB"],
          ].map(([fn, desc], i) =>
            new TableRow({
              children: [
                new TableCell({ borders, width: { size: 2600, type: WidthType.DXA }, shading: { fill: i % 2 === 0 ? "FFFFFF" : "F5F8FC", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: fn, size: 20, font: "Consolas", bold: true, color: "2E75B6" })] })] }),
                new TableCell({ borders, width: { size: 6760, type: WidthType.DXA }, shading: { fill: i % 2 === 0 ? "FFFFFF" : "F5F8FC", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: desc, size: 22 })] })] })
              ]
            })
          )
        ]
      }),

      new Paragraph({ children: [new PageBreak()] }),

      // ── 八、后续计划 ──
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: "\u516B\u3001\u540E\u7EED\u5F00\u53D1\u8BA1\u5212", bold: true })]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun({ text: "\u5B89\u88C5 Node.js \u540E\uFF0C\u5C06\u9879\u76EE\u8FC1\u79FB\u81F3 Next.js 15 App Router + TypeScript + Tailwind CSS + Framer Motion \u6B63\u5F0F\u9879\u76EE\u7ED3\u6784", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun({ text: "\u6DFB\u52A0\u9875\u9762\u8F6C\u573A\u8F6C\u573A\u8F6C\u573A\u7684\u5165\u573A\u52A8\u753B\uFF08\u57FA\u4E8E Framer Motion LayoutId\uFF09", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun({ text: "\u5B8C\u5584\u54CD\u5E94\u5F0F\u5B9E\u73B0\uFF0C\u6B63\u5F0F\u652F\u6301\u79FB\u52A8\u7AEF\u5C4F\u5E55\u5C3A\u5BF8\u81EA\u9002\u5E94", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun({ text: "\u6DFB\u52A0\u66F4\u591A\u9879\u76EE\u5B58\u50A8\u5728 projects.ts \u914D\u7F6E\u6587\u4EF6\u4E2D\uFF0C\u5B9E\u73B0\u6570\u636E\u4E0E\u8868\u73B0\u5206\u79BB", size: 22 })]
      }),

      new Paragraph({ spacing: { before: 400 }, children: [new TextRun({ text: "\u2014 \u6587\u6863\u7ED3\u675F \u2014", size: 20, color: "AAAAAA", italics: true })] })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('c:\\Users\\lili\\WorkBuddy\\20260509080323\\hewasborn-modification-report.docx', buffer);
  console.log('Word document created successfully!');
}).catch(err => {
  console.error('Error:', err);
});
