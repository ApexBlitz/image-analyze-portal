
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import InstallationGuide from "@/components/InstallationGuide";
import { useLocation, useNavigate } from "react-router-dom";

const Documentation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hash = location.hash.replace('#', '');
  
  const [activeTab, setActiveTab] = useState<string>(
    hash === 'installation' || hash === 'howItWorks' || hash === 'features' 
      ? hash 
      : 'installation'
  );

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/documentation#${value}`, { replace: true });
  };

  return (
    <main className="min-h-screen flex flex-col items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-gray-100 -z-10"></div>
      
      <div className="w-full max-w-5xl px-6 py-8 flex flex-col items-center">
        <div className="w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm p-6 mb-8">
          <h1 className="text-3xl font-bold text-center mb-6">Documentation</h1>
          
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full mt-4">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
              <TabsTrigger value="installation" className="rounded-md">Installation</TabsTrigger>
              <TabsTrigger value="howItWorks" className="rounded-md">Comment ça marche</TabsTrigger>
              <TabsTrigger value="features" className="rounded-md">Fonctionnalités</TabsTrigger>
            </TabsList>
            
            <TabsContent value="installation" className="pt-6">
              <InstallationGuide />
            </TabsContent>
            
            <TabsContent value="howItWorks" className="pt-6">
              <HowItWorks />
            </TabsContent>
            
            <TabsContent value="features" className="pt-6">
              <Features />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
};

export default Documentation;
