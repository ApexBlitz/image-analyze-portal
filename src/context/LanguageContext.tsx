
import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "fr" | "en";
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const translations = {
  fr: {
    // Header
    "app.name": "Vision Insight",
    "app.header.title": "Analyse d'Images Intelligente",
    "app.header.subtitle": "Découvrez ce que l'IA voit dans vos images grâce à notre plateforme d'analyse visuelle avancée",
    "app.header.feature1": "Analyse visuelle",
    "app.header.feature2": "Recherche web",
    "app.header.feature3": "Questions sur l'image",
    "app.header.start": "Commencer l'analyse",
    
    // Navbar
    "app.nav.imageAnalysis": "Analyse d'image",
    "app.nav.aiModels": "Modèles IA",
    "app.nav.help": "Aide & Documentation",
    "app.nav.installation": "Installation",
    "app.nav.howItWorks": "Comment ça marche",
    "app.nav.features": "Fonctionnalités",
    "app.nav.ollamaSite": "Site officiel Ollama",
    "app.nav.contact": "Contact",
    "app.nav.about": "À propos",
    "app.nav.login": "Se connecter",
    "app.nav.register": "S'inscrire",
    "app.nav.external": "Externe",
    "app.nav.logout": "Déconnexion",
    
    // Auth
    "auth.login.title": "Connexion",
    "auth.login.subtitle": "Connectez-vous pour accéder à toutes les fonctionnalités",
    "auth.login.withGoogle": "Continuer avec Google",
    "auth.login.withEmail": "Ou avec email",
    "auth.login.email": "Email",
    "auth.login.password": "Mot de passe",
    "auth.login.submit": "Se connecter",
    "auth.login.noAccount": "Pas encore de compte ?",
    "auth.login.createAccount": "Créer un compte",
    "auth.login.submitting": "Connexion en cours...",
    
    "auth.register.title": "Créer un compte",
    "auth.register.subtitle": "Inscrivez-vous pour accéder à toutes les fonctionnalités",
    "auth.register.withGoogle": "Continuer avec Google",
    "auth.register.withEmail": "Ou avec email",
    "auth.register.fullName": "Nom complet",
    "auth.register.email": "Email",
    "auth.register.password": "Mot de passe",
    "auth.register.confirmPassword": "Confirmer le mot de passe",
    "auth.register.terms": "J'accepte les conditions d'utilisation",
    "auth.register.submit": "Créer un compte",
    "auth.register.haveAccount": "Déjà un compte ?",
    "auth.register.login": "Se connecter",
    "auth.register.submitting": "Inscription en cours...",
    
    // Footer
    "app.footer.subtitle": "Une application d'analyse d'images qui utilise des modèles de vision IA locaux ou via API pour décrire vos images.",
    "app.footer.madeWith": "Fait avec",
    "app.footer.by": "par l'équipe Vision IA",
    "app.footer.links": "Liens",
    "app.footer.home": "Accueil",
    "app.footer.about": "À propos",
    "app.footer.documentation": "Documentation",
    "app.footer.models": "Modèles",
    "app.footer.contact": "Contact",
    "app.footer.resources": "Ressources",
    "app.footer.rights": "Tous droits réservés",
    "app.footer.terms": "Conditions d'utilisation",
    "app.footer.cookies": "Paramètres des cookies",
    "app.footer.privacy": "Politique de confidentialité",

    // Features
    "app.features.title": "Fonctionnalités de Vision Insight",
    "app.features.subtitle": "Découvrez toutes les possibilités offertes par notre plateforme d'analyse d'images alimentée par l'IA.",
    "app.features.cta.title": "Prêt à analyser vos images ?",
    "app.features.cta.subtitle": "Connectez-vous à votre serveur Ollama et commencez à explorer le potentiel de l'analyse d'images par IA dès maintenant.",
    "app.features.cta.button": "Commencer l'analyse",
  },
  en: {
    // Header
    "app.name": "Vision Insight",
    "app.header.title": "Intelligent Image Analysis",
    "app.header.subtitle": "Discover what AI sees in your images with our advanced visual analysis platform",
    "app.header.feature1": "Visual analysis",
    "app.header.feature2": "Web search",
    "app.header.feature3": "Questions about the image",
    "app.header.start": "Start analysis",
    
    // Navbar
    "app.nav.imageAnalysis": "Image Analysis",
    "app.nav.aiModels": "AI Models",
    "app.nav.help": "Help & Documentation",
    "app.nav.installation": "Installation",
    "app.nav.howItWorks": "How it works",
    "app.nav.features": "Features",
    "app.nav.ollamaSite": "Official Ollama Site",
    "app.nav.contact": "Contact",
    "app.nav.about": "About",
    "app.nav.login": "Log in",
    "app.nav.register": "Sign up",
    "app.nav.external": "External",
    "app.nav.logout": "Log out",
    
    // Auth
    "auth.login.title": "Log in",
    "auth.login.subtitle": "Sign in to access all features",
    "auth.login.withGoogle": "Continue with Google",
    "auth.login.withEmail": "Or with email",
    "auth.login.email": "Email",
    "auth.login.password": "Password",
    "auth.login.submit": "Log in",
    "auth.login.noAccount": "Don't have an account yet?",
    "auth.login.createAccount": "Create an account",
    "auth.login.submitting": "Logging in...",
    
    "auth.register.title": "Create an account",
    "auth.register.subtitle": "Sign up to access all features",
    "auth.register.withGoogle": "Continue with Google",
    "auth.register.withEmail": "Or with email",
    "auth.register.fullName": "Full name",
    "auth.register.email": "Email",
    "auth.register.password": "Password",
    "auth.register.confirmPassword": "Confirm password",
    "auth.register.terms": "I agree to the terms of use",
    "auth.register.submit": "Create account",
    "auth.register.haveAccount": "Already have an account?",
    "auth.register.login": "Log in",
    "auth.register.submitting": "Signing up...",
    
    // Footer
    "app.footer.subtitle": "An image analysis application that uses local AI vision models or API to describe your images.",
    "app.footer.madeWith": "Made with",
    "app.footer.by": "by the Vision IA team",
    "app.footer.links": "Links",
    "app.footer.home": "Home",
    "app.footer.about": "About",
    "app.footer.documentation": "Documentation",
    "app.footer.models": "Models",
    "app.footer.contact": "Contact",
    "app.footer.resources": "Resources",
    "app.footer.rights": "All rights reserved",
    "app.footer.terms": "Terms of use",
    "app.footer.cookies": "Cookie settings",
    "app.footer.privacy": "Privacy policy",

    // Features
    "app.features.title": "Vision Insight Features",
    "app.features.subtitle": "Discover all the possibilities offered by our AI-powered image analysis platform.",
    "app.features.cta.title": "Ready to analyze your images?",
    "app.features.cta.subtitle": "Connect to your Ollama server and start exploring the potential of AI image analysis now.",
    "app.features.cta.button": "Start analysis",
  }
};

export const LanguageContext = createContext<LanguageContextType>({
  language: "fr",
  setLanguage: () => {},
  t: () => "",
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("language");
    return (savedLanguage as Language) || "fr";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
