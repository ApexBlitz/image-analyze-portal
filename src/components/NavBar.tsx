
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Zap, Image, Settings, HelpCircle, LayoutGrid } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const NavBar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 
      "text-blue-600 font-medium" : 
      "text-gray-600 hover:text-blue-600 transition-colors";
  };

  return (
    <nav className="w-full bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Zap className="h-6 w-6 text-blue-500" />
            <span className="text-xl font-semibold">Vision Insight</span>
          </Link>
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "gap-2")}>
                    <Image className="h-4 w-4" />
                    <span>Analyse d'image</span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/models">
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "gap-2")}>
                    <LayoutGrid className="h-4 w-4" />
                    <span>Modèles IA</span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="gap-2">
                  <HelpCircle className="h-4 w-4" />
                  <span>Aide & Documentation</span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid grid-cols-2 gap-3 p-4 w-[500px]">
                    <Link to="/" onClick={() => {
                      const installationTab = document.querySelector('[data-value="installation"]') as HTMLElement;
                      if (installationTab) installationTab.click();
                    }}>
                      <div className="flex flex-col gap-1 p-3 hover:bg-slate-100 rounded-md">
                        <div className="flex items-center gap-2">
                          <Settings className="h-4 w-4 text-blue-600" />
                          <h3 className="font-medium">Installation</h3>
                        </div>
                        <p className="text-sm text-gray-600">Guide d'installation d'Ollama et configuration</p>
                      </div>
                    </Link>
                    
                    <Link to="/" onClick={() => {
                      const howItWorksTab = document.querySelector('[data-value="howItWorks"]') as HTMLElement;
                      if (howItWorksTab) howItWorksTab.click();
                    }}>
                      <div className="flex flex-col gap-1 p-3 hover:bg-slate-100 rounded-md">
                        <div className="flex items-center gap-2">
                          <HelpCircle className="h-4 w-4 text-purple-600" />
                          <h3 className="font-medium">Comment ça marche</h3>
                        </div>
                        <p className="text-sm text-gray-600">Explication du fonctionnement</p>
                      </div>
                    </Link>
                    
                    <Link to="/" onClick={() => {
                      const featuresTab = document.querySelector('[data-value="features"]') as HTMLElement;
                      if (featuresTab) featuresTab.click();
                    }}>
                      <div className="flex flex-col gap-1 p-3 hover:bg-slate-100 rounded-md">
                        <div className="flex items-center gap-2">
                          <LayoutGrid className="h-4 w-4 text-green-600" />
                          <h3 className="font-medium">Fonctionnalités</h3>
                        </div>
                        <p className="text-sm text-gray-600">Toutes les fonctionnalités de l'application</p>
                      </div>
                    </Link>
                    
                    <a href="https://ollama.com/download" target="_blank" rel="noopener noreferrer">
                      <div className="flex flex-col gap-1 p-3 hover:bg-slate-100 rounded-md">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-amber-600" />
                          <h3 className="font-medium">Site officiel Ollama</h3>
                          <Badge variant="outline" className="ml-2">Externe</Badge>
                        </div>
                        <p className="text-sm text-gray-600">Télécharger Ollama depuis le site officiel</p>
                      </div>
                    </a>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/contact">
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle())}>
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/about">
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle())}>
                    À propos
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
