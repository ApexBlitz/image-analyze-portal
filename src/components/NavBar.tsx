
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Zap, Image, Settings, HelpCircle, LayoutGrid, User, LogOut } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSelector from "./LanguageSelector";

const NavBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 
      "text-blue-600 font-medium" : 
      "text-gray-600 hover:text-blue-600 transition-colors";
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="w-full bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Zap className="h-6 w-6 text-blue-500" />
            <span className="text-xl font-semibold">{t("app.name")}</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/">
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "gap-2")}>
                      <Image className="h-4 w-4" />
                      <span>{t("app.nav.imageAnalysis")}</span>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/models">
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "gap-2")}>
                      <LayoutGrid className="h-4 w-4" />
                      <span>{t("app.nav.aiModels")}</span>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="gap-2">
                    <HelpCircle className="h-4 w-4" />
                    <span>{t("app.nav.help")}</span>
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
                            <h3 className="font-medium">{t("app.nav.installation")}</h3>
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
                            <h3 className="font-medium">{t("app.nav.howItWorks")}</h3>
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
                            <h3 className="font-medium">{t("app.nav.features")}</h3>
                          </div>
                          <p className="text-sm text-gray-600">Toutes les fonctionnalités de l'application</p>
                        </div>
                      </Link>
                      
                      <a href="https://ollama.com/download" target="_blank" rel="noopener noreferrer">
                        <div className="flex flex-col gap-1 p-3 hover:bg-slate-100 rounded-md">
                          <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-amber-600" />
                            <h3 className="font-medium">{t("app.nav.ollamaSite")}</h3>
                            <Badge variant="outline" className="ml-2">{t("app.nav.external")}</Badge>
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
                      {t("app.nav.contact")}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/about">
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle())}>
                      {t("app.nav.about")}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <div className="flex items-center gap-2">
              <LanguageSelector />
              
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback>{user?.name ? getInitials(user.name) : "UI"}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>{t("app.nav.logout")}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <Link to="/login">
                      {t("app.nav.login")}
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    asChild
                  >
                    <Link to="/register">
                      {t("app.nav.register")}
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
