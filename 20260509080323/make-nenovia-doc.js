const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = require('docx');

const doc = new Document({
  sections: [{
    children: [

      // ===== 1. Hero Section =====
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: "1. Hero Section", bold: true, size: 28 })]
      }),
      new Paragraph({
        children: [new TextRun({ text: "标语 (hero-tag)：", bold: true }), new TextRun("Brand Design · Package · CG Rendering")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "主标题下方定位语 (hero-subtitle)：", bold: true })]
      }),
      new Paragraph({
        children: [new TextRun("在\u201C专业科技\u201D与\u201C女性温和\u201D之间找到平衡，")]
      }),
      new Paragraph({
        children: [new TextRun("建立一套有辨识度、可执行、可感知的品牌视觉体系")]
      }),
      new Paragraph({ children: [new TextRun("")] }),
      new Paragraph({
        children: [new TextRun({ text: "服务内容 (hero-meta)：", bold: true }), new TextRun("重塑产品配色 丨重塑logo标识丨包装配件丨线上宣发物料")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "品牌调性：", bold: true }), new TextRun("专业而不冰冷，科技而有温度")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "认证资质：", bold: true }), new TextRun("FDA · CE")]
      }),
      new Paragraph({ children: [new TextRun("")] }),

      // ===== 2. Brand Story =====
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: "2. Brand Story", bold: true, size: 28 })]
      }),
      new Paragraph({
        children: [new TextRun({ text: "左列大标题：", bold: true })]
      }),
      new Paragraph({
        children: [new TextRun("分析核心问题")]
      }),
      new Paragraph({ children: [new TextRun("")] }),
      new Paragraph({
        children: [new TextRun({ text: "右列品牌介绍 (brand-intro)：", bold: true })]
      }),
      new Paragraph({
        children: [new TextRun("品牌方是一家拥有20年OEM/ODM出口经验的公司，NenoVia是该公司的自有品牌产品。拥有20年OEM/ODM出口经验，产品远销全球100+国家。")]
      }),
      new Paragraph({ children: [new TextRun("")] }),
      new Paragraph({
        children: [new TextRun({ text: "问题分析 (标签)：", bold: true })]
      }),
      new Paragraph({ children: [new TextRun("品牌早期视觉体系混乱 / 配色男性化 / 包装过于华丽")] }),
      new Paragraph({ children: [new TextRun("")] }),
      new Paragraph({
        children: [new TextRun({ text: "设计目标 (标签)：", bold: true })]
      }),
      new Paragraph({ children: [new TextRun("重塑产品配色 / 重塑logo标识 / 包装配件 / 线上宣发物料")] }),
      new Paragraph({ children: [new TextRun("")] }),
      new Paragraph({
        children: [new TextRun({ text: "设计目标描述：", bold: true })]
      }),
      new Paragraph({
        children: [new TextRun("在"专业科技"与"女性温和"之间找到平衡，建立一套有辨识度、可执行、可感知的品牌视觉体系，适配欧美海外市场。")]
      }),
      new Paragraph({ children: [new TextRun("")] }),
      new Paragraph({
        children: [new TextRun({ text: "风格关键词：", bold: true })]
      }),
      new Paragraph({ children: [new TextRun("暖调科技感 / 柔肤几何 / 专业")] }),
      new Paragraph({ children: [new TextRun("")] }),

      // ===== 3. Brand Statement =====
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: "3. Brand Statement", bold: true, size: 28 })]
      }),
      new Paragraph({
        children: [new TextRun({ text: "品牌口号 (statement-label)：", bold: true })]
      }),
      new Paragraph({
        children: [new TextRun("专业而不冰冷，科技而有温度")]
      }),
      new Paragraph({ children: [new TextRun("")] }),
      new Paragraph({
        children: [new TextRun({ text: "英文口号 (statement-tagline)：", bold: true })]
      }),
      new Paragraph({
        children: [new TextRun("Precision with care. Technology with touch.")]
      }),
      new Paragraph({ children: [new TextRun("")] }),

      // ===== 4. Logo Design =====
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: "4. Logo Design", bold: true, size: 28 })]
      }),
      new Paragraph({
        children: [new TextRun({ text: "左列标题：", bold: true })]
      }),
      new Paragraph({
        children: [new TextRun("logo设计")]
      }),
      new Paragraph({ children: [new TextRun("")] }),
      new Paragraph({
        children: [new TextRun({ text: "左列描述 (logo-desc)：", bold: true })]
      }),
      new Paragraph({
        children: [new TextRun("图形符号组成N字的「渗透感」，与"打开肌肤通道、促进精华吸收"的核心功能高度契合，用户看到符号就能联想到"补水、渗透、水润"的护肤效果。")]
      }),
      new Paragraph({ children: [new TextRun("")] }),

      // ===== 5. Visual Identity =====
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: "5. Visual Identity", bold: true, size: 28 })]
      }),
      new Paragraph({
        children: [new TextRun({ text: "色板1：", bold: true }), new TextRun("中性灰 #727174")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "色板2：", bold: true }), new TextRun("暖粉 #DFB398")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "色板3：", bold: true }), new TextRun("柔粉 #E0B2B2")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "色板4：", bold: true }), new TextRun("浅灰白 #E7E7E7")]
      }),
      new Paragraph({ children: [new TextRun("")] }),

      // ===== 6. Product Color =====
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: "6. Product Color", bold: true, size: 28 })]
      }),
      new Paragraph({
        children: [new TextRun({ text: "左列标题：", bold: true })]
      }),
      new Paragraph({
        children: [new TextRun("重塑产品颜色")]
      }),
      new Paragraph({ children: [new TextRun("")] }),
      new Paragraph({
        children: [new TextRun({ text: "右列段落1 - 小标题：", bold: true })]
      }),
      new Paragraph({
        children: [new TextRun("问题分析")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "右列段落1 - 描述：", bold: true })]
      }),
      new Paragraph({
        children: [new TextRun("拿到这个项目时，产品的外观已经定稿，黑色的机身，亮面银色的装饰环，从工程角度看，它没有任何问题，材质扎实，工艺精密，参数过硬。但从设计角度看，它有一个致命的矛盾：这是一台给25-40岁女性的家用美容仪。但它看起来像男士用品，它传递力量、专业、耐用——但这些词，恰好不是目标用户想要的。")]
      }),
      new Paragraph({ children: [new TextRun("")] }),
      new Paragraph({
        children: [new TextRun({ text: "右列段落2 - 小标题：", bold: true })]
      }),
      new Paragraph({
        children: [new TextRun("设计分析")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "右列段落2 - 描述：", bold: true })]
      }),
      new Paragraph({
        children: [new TextRun("配色不能独立存在。它必须回应产品的三个层面：")]
      }),
      new Paragraph({ children: [new TextRun("功能层面：纳米导入 → 精准、温和、有效")] }),
      new Paragraph({ children: [new TextRun("情感层面：晚间护理 → 松弛、自我照顾、仪式感")] }),
      new Paragraph({ children: [new TextRun("品牌层面：专业而不冰冷 → 可信、有温度、不疏离")] }),
      new Paragraph({ children: [new TextRun("")] }),
      new Paragraph({
        children: [new TextRun({ text: "右列段落3 - 小标题：", bold: true })]
      }),
      new Paragraph({
        children: [new TextRun("最后敲定主题方向")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "右列段落3 - 大标题：", bold: true })]
      }),
      new Paragraph({
        children: [new TextRun("沉稳、温暖、触感、不张扬、有高级感但不冷")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "右列段落3 - 描述：", bold: true })]
      }),
      new Paragraph({
        children: [new TextRun("玫瑰金自带温润质感，比纯金内敛、比玫瑰粉稳重。市面常见玫瑰金过亮过甜，易显廉价少女感。我们调低饱和度、压暗明度，调出不甜的暗调玫瑰金，质感如黄昏余晖落于磨砂金属，低调不张扬、高级有分量，深沉不飘、温暖不冷。单靠暗调玫瑰金不足以撑起品牌视觉，需搭配裸色。裸色贴近肌肤色调，中和玫瑰金的强存在感，留出视觉呼吸感")]
      }),
      new Paragraph({ children: [new TextRun("")] }),

      // ===== 7. Products =====
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: "7. Products", bold: true, size: 28 })]
      }),
      new Paragraph({
        children: [new TextRun({ text: "标题：", bold: true }), new TextRun("产品矩阵")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "描述：", bold: true })]
      }),
      new Paragraph({
        children: [new TextRun("围绕纳米微晶笔核心单品，构建完整的家用美容仪器产品线，涵盖洁面、导入、提拉等多种护肤需求。")]
      }),
      new Paragraph({ children: [new TextRun("")] }),
      new Paragraph({
        children: [new TextRun({ text: "产品卡片1：", bold: true })]
      }),
      new Paragraph({ children: [new TextRun("NenoVia 纳米微晶笔 — 核心单品，专利纳米微晶技术，院线级护肤体验")] }),
      new Paragraph({
        children: [new TextRun({ text: "产品卡片2：", bold: true })]
      }),
      new Paragraph({ children: [new TextRun("配套精华液系列 — 医美级配方，精准导入，直达肌底")] }),
      new Paragraph({
        children: [new TextRun({ text: "产品卡片3：", bold: true })]
      }),
      new Paragraph({ children: [new TextRun("节日礼盒套装 — 磨砂半透材质，高端礼品体验")] }),
      new Paragraph({ children: [new TextRun("")] }),

      // ===== 8. Package Design =====
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: "8. Package Design", bold: true, size: 28 })]
      }),
      new Paragraph({
        children: [new TextRun({ text: "标题：", bold: true }), new TextRun("包装设计")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "描述：", bold: true })]
      }),
      new Paragraph({
        children: [new TextRun("包装设计延续品牌玫瑰金+磨砂质感调性，营造高端医美产品应有的精致感。")]
      }),
      new Paragraph({ children: [new TextRun("")] }),
      new Paragraph({
        children: [new TextRun({ text: "包装亮点：", bold: true })]
      }),
      new Paragraph({ children: [new TextRun("• 磨砂半透明材质，营造高端质感")] }),
      new Paragraph({ children: [new TextRun("• 玫瑰金烫印工艺，突出品牌标识")] }),
      new Paragraph({ children: [new TextRun("• 简约结构设计，易于开箱体验")] }),
      new Paragraph({ children: [new TextRun("• 环保材料选用，可持续理念")] }),
      new Paragraph({ children: [new TextRun("• FDA/CE 认证标识，权威背书")] }),
      new Paragraph({ children: [new TextRun("• 全链路物料配套：说明卡、贴纸、手袋")] }),
      new Paragraph({ children: [new TextRun("")] }),

      // ===== 9. Gallery =====
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: "9. Gallery", bold: true, size: 28 })]
      }),
      new Paragraph({
        children: [new TextRun({ text: "标题：", bold: true }), new TextRun("项目图库")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "描述：", bold: true })]
      }),
      new Paragraph({
        children: [new TextRun("从概念到落地，完整呈现 NenoVia 品牌全案设计的每一处细节。")]
      }),
      new Paragraph({ children: [new TextRun("")] }),

      // ===== 10. Certification =====
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: "10. Certification", bold: true, size: 28 })]
      }),
      new Paragraph({
        children: [new TextRun({ text: "标题：", bold: true }), new TextRun("权威认证")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "描述：", bold: true })]
      }),
      new Paragraph({
        children: [new TextRun("NenoVia 产品已获得美国 FDA 与欧盟 CE 双重认证，品质安全有保障。")]
      }),
      new Paragraph({ children: [new TextRun("")] }),
      new Paragraph({
        children: [new TextRun({ text: "认证1：", bold: true }), new TextRun("FDA 认证 — 美国食品药品监督管理局")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "认证2：", bold: true }), new TextRun("CE 认证 — 欧盟市场准入许可")]
      }),
      new Paragraph({ children: [new TextRun("")] }),

      // ===== 11. Footer =====
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: "11. Footer", bold: true, size: 28 })]
      }),
      new Paragraph({
        children: [new TextRun("返回主页链接文字：「返回作品集 / Back to Portfolio」")]
      }),

    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('nenovia-content.docx', buffer);
  console.log('Done: nenovia-content.docx');
});
