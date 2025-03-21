
import React from "react";
import { Zap, Image, Search, MessageCircleQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

const Header: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <header className="w-full pt-6 pb-12 flex flex-col justify-center items-center animate-fade-in">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Zap className="h-6 w-6 text-blue-500" />
          <span className="text-xl font-semibold text-blue-600">{t("app.name")}</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-gray-800">
          {t("app.header.title").split(" ").slice(0, -1).join(" ")} <span className="text-blue-600">{t("app.header.title").split(" ").slice(-1)}</span>
        </h1>
        
        <p className="text-gray-600 max-w-xl mx-auto text-lg mb-8">
          {t("app.header.subtitle")}
        </p>
        
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-700 text-sm">
            <Image className="h-4 w-4" />
            <span>{t("app.header.feature1")}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full text-indigo-700 text-sm">
            <Search className="h-4 w-4" />
            <span>{t("app.header.feature2")}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full text-purple-700 text-sm">
            <MessageCircleQuestion className="h-4 w-4" />
            <span>{t("app.header.feature3")}</span>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={() => {
            const analyzeTab = document.querySelector('[data-value="analyze"]') as HTMLElement;
            if (analyzeTab) analyzeTab.click();
            // Scroll to upload section
            setTimeout(() => {
              const uploadSection = document.querySelector('input[type="file"]')?.closest('div');
              uploadSection?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}>
            {t("app.header.start")}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
