
import React, { createContext, useState, useContext, ReactNode } from "react";

type Language = "fr" | "en";

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Translations = {
  app: {
    en: {
      name: "Vision AI",
    },
    fr: {
      name: "Vision AI",
    },
  },
  nav: {
    en: {
      home: "Home",
      models: "Models",
      documentation: "Documentation",
      about: "About",
      login: "Login",
      register: "Register",
      contact: "Contact",
      account: "Account",
      logout: "Logout",
      subscription: "Subscription",
    },
    fr: {
      home: "Accueil",
      models: "Modèles",
      documentation: "Documentation",
      about: "À propos",
      login: "Connexion",
      register: "Inscription",
      contact: "Contact",
      account: "Compte",
      logout: "Déconnexion",
      subscription: "Abonnement",
    },
  },
  app: {
    en: {
      name: "Vision AI",
      header: {
        title: "AI Image Analysis Made Simple",
        subtitle: "Analyze images easily with your local Ollama instance or OpenAI API. Get detailed descriptions and insights without your data leaving your device.",
        feature1: "Local Image Analysis",
        feature2: "Advanced Recognition",
        feature3: "Private & Secure",
        start: "Get Started",
      },
    },
    fr: {
      name: "Vision AI",
      header: {
        title: "Analyse d'Images par IA Simplifiée",
        subtitle: "Analysez des images facilement avec votre instance locale Ollama ou l'API OpenAI. Obtenez des descriptions détaillées sans que vos données ne quittent votre appareil.",
        feature1: "Analyse locale d'images",
        feature2: "Reconnaissance avancée",
        feature3: "Privé et sécurisé",
        start: "Commencer",
      },
    },
  },
  footer: {
    en: {
      rights: "All rights reserved",
      terms: "Terms of Service",
      privacy: "Privacy Policy",
    },
    fr: {
      rights: "Tous droits réservés",
      terms: "Conditions d'utilisation",
      privacy: "Politique de confidentialité",
    },
  },
  auth: {
    en: {
      loginTitle: "Welcome back",
      loginSubtitle: "Enter your credentials to access your account",
      registerTitle: "Create an account",
      registerSubtitle: "Enter your details to create a new account",
      emailLabel: "Email",
      emailPlaceholder: "Enter your email",
      passwordLabel: "Password",
      passwordPlaceholder: "Enter your password",
      namePlaceholder: "Enter your name",
      nameLabel: "Name",
      loginButton: "Login",
      registerButton: "Register",
      googleLogin: "Login with Google",
      noAccount: "Don't have an account?",
      createAccount: "Create an account",
      haveAccount: "Already have an account?",
      loginHere: "Login here",
      requiredField: "This field is required",
      emailInvalid: "Please enter a valid email",
      passwordShort: "Password must be at least 6 characters",
    },
    fr: {
      loginTitle: "Bon retour",
      loginSubtitle: "Entrez vos identifiants pour accéder à votre compte",
      registerTitle: "Créer un compte",
      registerSubtitle: "Entrez vos détails pour créer un nouveau compte",
      emailLabel: "Email",
      emailPlaceholder: "Entrez votre email",
      passwordLabel: "Mot de passe",
      passwordPlaceholder: "Entrez votre mot de passe",
      nameLabel: "Nom",
      namePlaceholder: "Entrez votre nom",
      loginButton: "Connexion",
      registerButton: "S'inscrire",
      googleLogin: "Connexion avec Google",
      noAccount: "Vous n'avez pas de compte ?",
      createAccount: "Créer un compte",
      haveAccount: "Vous avez déjà un compte ?",
      loginHere: "Connectez-vous ici",
      requiredField: "Ce champ est obligatoire",
      emailInvalid: "Veuillez entrer un email valide",
      passwordShort: "Le mot de passe doit comporter au moins 6 caractères",
    },
  },
  cookie: {
    en: {
      title: "Cookie Notice",
      message: "We use cookies to enhance your experience on our website. By continuing to browse, you agree to our use of cookies.",
      accept: "Accept",
      decline: "Decline",
    },
    fr: {
      title: "Avis de cookies",
      message: "Nous utilisons des cookies pour améliorer votre expérience sur notre site web. En continuant à naviguer, vous acceptez notre utilisation des cookies.",
      accept: "Accepter",
      decline: "Refuser",
    },
  },
  features: {
    en: {
      title: "Key Features",
      subtitle: "Discover what makes Vision AI the perfect tool for image analysis",
      feature1: {
        title: "Local Image Processing",
        description: "Analyze images locally with Ollama, keeping your data private and secure.",
      },
      feature2: {
        title: "Multiple Model Support",
        description: "Use various vision-language models like LLaVA, Bakllava, and more.",
      },
      feature3: {
        title: "Web Search Integration",
        description: "Analyze images and search the web for related information.",
      },
      feature4: {
        title: "Interactive Questions",
        description: "Ask specific questions about your images and get detailed answers.",
      },
    },
    fr: {
      title: "Fonctionnalités Clés",
      subtitle: "Découvrez ce qui fait de Vision AI l'outil parfait pour l'analyse d'images",
      feature1: {
        title: "Traitement local d'images",
        description: "Analysez les images localement avec Ollama, en gardant vos données privées et sécurisées.",
      },
      feature2: {
        title: "Support de multiples modèles",
        description: "Utilisez divers modèles de vision-langage comme LLaVA, Bakllava, et plus encore.",
      },
      feature3: {
        title: "Intégration de recherche web",
        description: "Analysez des images et recherchez des informations connexes sur le web.",
      },
      feature4: {
        title: "Questions interactives",
        description: "Posez des questions spécifiques sur vos images et obtenez des réponses détaillées.",
      },
    },
  },
  how: {
    en: {
      title: "How It Works",
      subtitle: "Follow these simple steps to analyze your images with AI",
      step1: {
        title: "Configure API Connection",
        description: "Connect to Ollama locally or provide your OpenAI API key.",
      },
      step2: {
        title: "Select a Model",
        description: "Choose from various vision-language models like LLaVA or GPT-4V.",
      },
      step3: {
        title: "Upload Your Image",
        description: "Upload the image you want to analyze (JPG, PNG, etc.).",
      },
      step4: {
        title: "Get AI Analysis",
        description: "Receive detailed descriptions and insights about your image.",
      },
      step5: {
        title: "Ask Questions",
        description: "Ask specific questions about elements in your image.",
      },
    },
    fr: {
      title: "Comment Ça Marche",
      subtitle: "Suivez ces étapes simples pour analyser vos images avec l'IA",
      step1: {
        title: "Configurer la connexion API",
        description: "Connectez-vous à Ollama localement ou fournissez votre clé API OpenAI.",
      },
      step2: {
        title: "Sélectionner un modèle",
        description: "Choisissez parmi divers modèles de vision-langage comme LLaVA ou GPT-4V.",
      },
      step3: {
        title: "Télécharger votre image",
        description: "Téléchargez l'image que vous souhaitez analyser (JPG, PNG, etc.).",
      },
      step4: {
        title: "Obtenir l'analyse IA",
        description: "Recevez des descriptions détaillées et des insights sur votre image.",
      },
      step5: {
        title: "Poser des questions",
        description: "Posez des questions spécifiques sur les éléments de votre image.",
      },
    },
  },
  tabs: {
    en: {
      welcome: "Welcome",
      analyze: "Analyze",
      howItWorks: "How It Works",
    },
    fr: {
      welcome: "Accueil",
      analyze: "Analyser",
      howItWorks: "Fonctionnement",
    },
  },
  ollamaSection: {
    en: {
      title: "Local Ollama Server",
    },
    fr: {
      title: "Serveur Ollama Local",
    },
  },
  openaiSection: {
    en: {
      title: "OpenAI API",
    },
    fr: {
      title: "API OpenAI",
    },
  },
  modelSection: {
    en: {
      title: "Model Selection",
    },
    fr: {
      title: "Sélection du modèle",
    },
  },
  errors: {
    en: {
      configureOllamaFirst: "Please configure the Ollama URL first",
      configureOpenAIFirst: "Please configure your OpenAI API token first",
      ollamaConnectionFailed: "Could not connect to the Ollama server. Verify that the server is running at",
      modelNotInstalled: "The model {{model}} is not installed. Use the command \"ollama pull {{model}}\" in your terminal to install it.",
      analysisError: "Error during analysis",
      invalidOpenAIToken: "Invalid OpenAI token. Please check your API token.",
      openAIRateLimit: "OpenAI request limit reached. Please try again later.",
    },
    fr: {
      configureOllamaFirst: "Veuillez d'abord configurer l'URL d'Ollama",
      configureOpenAIFirst: "Veuillez d'abord configurer votre token API OpenAI",
      ollamaConnectionFailed: "Impossible de se connecter au serveur Ollama. Vérifiez que le serveur est bien lancé à l'adresse",
      modelNotInstalled: "Le modèle {{model}} n'est pas installé. Utilisez la commande \"ollama pull {{model}}\" dans votre terminal pour l'installer.",
      analysisError: "Erreur lors de l'analyse",
      invalidOpenAIToken: "Token OpenAI invalide. Veuillez vérifier votre token API.",
      openAIRateLimit: "Limite de requêtes OpenAI atteinte. Veuillez réessayer plus tard.",
    },
  },
  success: {
    en: {
      analysisComplete: "Image analysis complete!",
    },
    fr: {
      analysisComplete: "Analyse d'image terminée!",
    },
  },
  imageMetadata: {
    en: {
      title: "Image Metadata",
      format: "Format",
      size: "Size",
      dimensions: "Dimensions",
      fileName: "File Name",
      lastModified: "Last Modified",
    },
    fr: {
      title: "Métadonnées de l'image",
      format: "Format",
      size: "Taille",
      dimensions: "Dimensions",
      fileName: "Nom du fichier",
      lastModified: "Dernière modification",
    },
  },
  imageFormats: {
    en: {
      title: "Accepted Image Formats",
      jpeg: "Standard image format with good compression",
      png: "Lossless compression with alpha channel support",
      gif: "Animated image format (first frame only will be analyzed)",
      webp: "Modern format with superior compression",
      bmp: "Uncompressed bitmap format",
      note: "All images must be under 5MB for analysis",
    },
    fr: {
      title: "Formats d'image acceptés",
      jpeg: "Format d'image standard avec bonne compression",
      png: "Compression sans perte avec support de canal alpha",
      gif: "Format d'image animée (seule la première image sera analysée)",
      webp: "Format moderne avec compression supérieure",
      bmp: "Format bitmap non compressé",
      note: "Toutes les images doivent être inférieures à 5MB pour l'analyse",
    },
  },
  subscription: {
    en: {
      title: "Choose Your Plan",
      subtitle: "Select the plan that best fits your needs and unlock powerful AI image analysis features",
      perMonth: "/month",
      popular: "POPULAR",
      loginRequired: "Please log in to subscribe to a plan",
      successToast: "Successfully subscribed to the {{plan}} plan!",
      plans: {
        free: {
          name: "Free",
          price: "$0",
          description: "Basic image analysis for personal use",
          features: {
            f1: "5 image analyses per day",
            f2: "Basic image description",
            f3: "Standard response time",
          },
          limitations: {
            l1: "Limited to 3MB image size",
          },
          button: "Current Plan",
        },
        pro: {
          name: "Pro",
          price: "$9.99",
          description: "Advanced features for professionals",
          features: {
            f1: "Unlimited image analyses",
            f2: "Detailed image recognition",
            f3: "Priority processing",
            f4: "Up to 5MB image size",
            f5: "Access to all models",
          },
          button: "Upgrade to Pro",
        },
        enterprise: {
          name: "Enterprise",
          price: "Contact us",
          description: "Custom solutions for large organizations",
          features: {
            f1: "Everything in Pro plan",
            f2: "Custom API integration",
            f3: "Dedicated support",
            f4: "Custom model training options",
          },
          button: "Contact Sales",
        },
      },
      faq: {
        title: "Frequently Asked Questions",
        q1: "How will I be billed?",
        a1: "Pro plans are billed monthly and can be canceled at any time. Enterprise plans have custom billing options.",
        q2: "Can I upgrade or downgrade my plan?",
        a2: "Yes, you can change your plan at any time. Changes will be effective at the start of your next billing cycle.",
        q3: "Is there a free trial for paid plans?",
        a3: "Yes, all paid plans come with a 7-day free trial. No credit card required to start.",
        q4: "What payment methods do you accept?",
        a4: "We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.",
      },
    },
    fr: {
      title: "Choisissez Votre Forfait",
      subtitle: "Sélectionnez le forfait qui convient le mieux à vos besoins et débloquez des fonctionnalités puissantes d'analyse d'images par IA",
      perMonth: "/mois",
      popular: "POPULAIRE",
      loginRequired: "Veuillez vous connecter pour vous abonner à un forfait",
      successToast: "Abonnement au forfait {{plan}} réussi !",
      plans: {
        free: {
          name: "Gratuit",
          price: "0€",
          description: "Analyse d'image basique pour usage personnel",
          features: {
            f1: "5 analyses d'images par jour",
            f2: "Description d'image basique",
            f3: "Temps de réponse standard",
          },
          limitations: {
            l1: "Limité à 3MB par image",
          },
          button: "Forfait Actuel",
        },
        pro: {
          name: "Pro",
          price: "9,99€",
          description: "Fonctionnalités avancées pour professionnels",
          features: {
            f1: "Analyses d'images illimitées",
            f2: "Reconnaissance d'image détaillée",
            f3: "Traitement prioritaire",
            f4: "Jusqu'à 5MB par image",
            f5: "Accès à tous les modèles",
          },
          button: "Passer au Pro",
        },
        enterprise: {
          name: "Entreprise",
          price: "Contactez-nous",
          description: "Solutions personnalisées pour grandes organisations",
          features: {
            f1: "Tout ce qui est dans le forfait Pro",
            f2: "Intégration API personnalisée",
            f3: "Support dédié",
            f4: "Options de formation de modèles personnalisés",
          },
          button: "Contacter les Ventes",
        },
      },
      faq: {
        title: "Questions Fréquemment Posées",
        q1: "Comment serai-je facturé ?",
        a1: "Les forfaits Pro sont facturés mensuellement et peuvent être annulés à tout moment. Les forfaits Entreprise ont des options de facturation personnalisées.",
        q2: "Puis-je changer de forfait ?",
        a2: "Oui, vous pouvez changer de forfait à tout moment. Les changements prendront effet au début de votre prochain cycle de facturation.",
        q3: "Y a-t-il un essai gratuit pour les forfaits payants ?",
        a3: "Oui, tous les forfaits payants sont accompagnés d'un essai gratuit de 7 jours. Aucune carte de crédit n'est requise pour commencer.",
        q4: "Quels modes de paiement acceptez-vous ?",
        a4: "Nous acceptons toutes les principales cartes de crédit, PayPal et virements bancaires pour les forfaits Entreprise.",
      },
    },
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("fr");

  // Load language preference from localStorage
  React.useEffect(() => {
    const savedLanguage = localStorage.getItem("vision-ia-language");
    if (savedLanguage === "en" || savedLanguage === "fr") {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage when it changes
  React.useEffect(() => {
    localStorage.setItem("vision-ia-language", language);
  }, [language]);

  const translate = (key: string): string => {
    const keys = key.split(".");
    let section = keys[0];
    let item = keys.slice(1).join(".");

    // If the key has only one part, try to match it directly
    if (!item) {
      item = section;
      section = "common";
    }

    // Check if section exists
    if (!translations[section]) {
      console.warn(`Translation section '${section}' not found`);
      return key;
    }

    // Try to get the translation in the current language
    if (translations[section][language] && translations[section][language][item]) {
      return translations[section][language][item];
    }

    // Log warning for missing translation and return the key
    console.warn(`Translation missing for key '${key}' in language '${language}'`);
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translate }}>
      {children}
    </LanguageContext.Provider>
  );
};
