
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface CookieSettings {
  necessary: boolean;
  analytics: boolean;
  preferences: boolean;
  marketing: boolean;
}

const defaultSettings: CookieSettings = {
  necessary: true, // Always true and can't be turned off
  analytics: false,
  preferences: false,
  marketing: false,
};

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<CookieSettings>(defaultSettings);

  useEffect(() => {
    // Check if user has already made a choice
    const consentGiven = localStorage.getItem("cookieConsentGiven");
    
    if (!consentGiven) {
      // Show banner if no consent has been given yet
      setShowBanner(true);
    } else {
      // Load saved settings
      const savedSettings = localStorage.getItem("cookieSettings");
      if (savedSettings) {
        try {
          setSettings(JSON.parse(savedSettings));
        } catch (e) {
          console.error("Error parsing cookie settings", e);
          setSettings(defaultSettings);
        }
      }
    }

    // Listen for manual openings of the settings dialog
    const handleOpenSettings = () => setShowSettings(true);
    window.addEventListener('openCookieSettings', handleOpenSettings);
    
    return () => {
      window.removeEventListener('openCookieSettings', handleOpenSettings);
    };
  }, []);

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      preferences: true,
      marketing: true,
    };
    saveSettings(allAccepted);
  };

  const acceptNecessary = () => {
    saveSettings(defaultSettings);
  };

  const saveSettings = (newSettings: CookieSettings) => {
    setSettings(newSettings);
    localStorage.setItem("cookieSettings", JSON.stringify(newSettings));
    localStorage.setItem("cookieConsentGiven", "true");
    setShowBanner(false);
    setShowSettings(false);
    
    // Here you would typically initialize your tracking/cookie services
    // based on user consent
    toast.success("Préférences de cookies enregistrées");
  };

  const handleSaveSettings = () => {
    saveSettings(settings);
  };

  const handleSettingsChange = (key: keyof CookieSettings, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  if (!showBanner && !showSettings) {
    return null;
  }

  return (
    <>
      {/* Cookie Banner */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-4 sm:p-6">
          <div className="container max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex-1">
                <h3 className="font-medium text-lg mb-2">Nous utilisons des cookies</h3>
                <p className="text-gray-600 text-sm">
                  Ce site utilise des cookies pour améliorer votre expérience. Vous pouvez
                  personnaliser vos préférences ou accepter l'utilisation par défaut.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 whitespace-nowrap">
                <Button 
                  variant="outline" 
                  onClick={() => setShowSettings(true)}
                  className="w-full sm:w-auto"
                >
                  Personnaliser
                </Button>
                <Button 
                  variant="outline" 
                  onClick={acceptNecessary}
                  className="w-full sm:w-auto"
                >
                  Nécessaires uniquement
                </Button>
                <Button 
                  onClick={acceptAll}
                  className="w-full sm:w-auto bg-green-500 hover:bg-green-600"
                >
                  Tout accepter
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="sm:max-w-md md:max-w-lg">
          <DialogHeader>
            <DialogTitle>Paramètres des cookies</DialogTitle>
            <DialogDescription>
              Personnalisez les cookies que nous utilisons sur notre site.
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="all" className="mt-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="necessary">Nécessaires</TabsTrigger>
              <TabsTrigger value="analytics">Analytiques</TabsTrigger>
              <TabsTrigger value="preferences">Préférences</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Cookies nécessaires</h4>
                    <p className="text-sm text-gray-500">
                      Ces cookies sont essentiels au fonctionnement du site.
                    </p>
                  </div>
                  <Switch checked={true} disabled />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Cookies analytiques</h4>
                    <p className="text-sm text-gray-500">
                      Nous aident à comprendre comment vous utilisez le site.
                    </p>
                  </div>
                  <Switch 
                    checked={settings.analytics} 
                    onCheckedChange={(value) => handleSettingsChange("analytics", value)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Cookies de préférences</h4>
                    <p className="text-sm text-gray-500">
                      Permettent de mémoriser vos préférences sur le site.
                    </p>
                  </div>
                  <Switch 
                    checked={settings.preferences} 
                    onCheckedChange={(value) => handleSettingsChange("preferences", value)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Cookies marketing</h4>
                    <p className="text-sm text-gray-500">
                      Utilisés pour la publicité ciblée et le suivi marketing.
                    </p>
                  </div>
                  <Switch 
                    checked={settings.marketing} 
                    onCheckedChange={(value) => handleSettingsChange("marketing", value)}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="necessary" className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Cookies nécessaires</h4>
                  <p className="text-sm text-gray-500">
                    Ces cookies sont essentiels au fonctionnement du site et ne peuvent pas être désactivés.
                    Ils incluent la gestion des sessions, la mémorisation de vos choix de consentement,
                    et d'autres fonctionnalités essentielles.
                  </p>
                </div>
                <Switch checked={true} disabled />
              </div>
            </TabsContent>
            
            <TabsContent value="analytics" className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Cookies analytiques</h4>
                  <p className="text-sm text-gray-500">
                    Ces cookies nous permettent de mesurer l'audience, d'analyser votre navigation
                    et d'améliorer le fonctionnement de notre site en comprenant comment
                    vous l'utilisez.
                  </p>
                </div>
                <Switch 
                  checked={settings.analytics} 
                  onCheckedChange={(value) => handleSettingsChange("analytics", value)}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="preferences" className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Cookies de préférences</h4>
                  <p className="text-sm text-gray-500">
                    Ces cookies permettent à notre site de mémoriser vos préférences, comme
                    votre nom d'utilisateur, votre langue, la région de votre connexion
                    et vos paramètres personnalisés.
                  </p>
                </div>
                <Switch 
                  checked={settings.preferences} 
                  onCheckedChange={(value) => handleSettingsChange("preferences", value)}
                />
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="flex sm:justify-between">
            <div className="hidden sm:block">
              <Button variant="outline" onClick={() => setShowSettings(false)}>
                Annuler
              </Button>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={acceptNecessary}
              >
                Nécessaires uniquement
              </Button>
              <Button 
                variant="outline" 
                onClick={acceptAll}
              >
                Tout accepter
              </Button>
              <Button 
                onClick={handleSaveSettings}
                className="bg-green-500 hover:bg-green-600"
              >
                Enregistrer mes choix
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CookieConsent;
