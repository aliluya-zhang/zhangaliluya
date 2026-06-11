import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import WorksSection from "@/components/WorksSection";
import ContactSection from "@/components/ContactSection";
import BackgroundDynamic from "@/components/BackgroundDynamic";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* 全屏动态背景（效果5） */}
      <BackgroundDynamic />

      {/* 各内容区块按顺序集成动效 */}
      <HeroSection />           {/* 效果1: Logo波光 + 基础入场 */}
      <AboutSection />          {/* 效果7: 滚动触发淡入 */}
      <ServicesSection />       {/* 效果7: 滚动触发 + 效果5背景补充 */}
      <WorksSection />          {/* 效果3: 卡片悬停 + 效果6: 横向滚动 + 效果7 */}
      <ContactSection />        {/* 效果7: 滚动触发 + 效果8: 数字计数器 */}

      {/* 效果9（橡皮筋）由 ScrollContainer 在 layout 中提供 */}
    </main>
  );
}
