
import React from "react";
import { Separator } from "@/components/ui/separator";

const Terms = () => {
  return (
    <div className="container max-w-4xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-6">Conditions d'utilisation</h1>
      <Separator className="mb-8" />
      
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">1. Acceptation des conditions</h2>
          <p className="text-gray-700">
            En accédant et en utilisant le service Vision IA, vous acceptez d'être lié par ces conditions d'utilisation. 
            Si vous n'êtes pas d'accord avec une partie de ces conditions, vous ne pouvez pas utiliser notre service.
          </p>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">2. Description du service</h2>
          <p className="text-gray-700">
            Vision IA est une application d'analyse d'images qui utilise des modèles de vision IA locaux ou via API pour décrire et analyser des images.
            Nous proposons des fonctionnalités d'analyse d'images via différents modèles d'intelligence artificielle.
          </p>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">3. Comptes utilisateurs</h2>
          <p className="text-gray-700">
            Certaines fonctionnalités de notre service peuvent nécessiter un compte. Vous êtes responsable du maintien de la confidentialité de votre compte
            et mot de passe, ainsi que de la restriction de l'accès à votre ordinateur. Vous acceptez la responsabilité de toutes les activités qui se 
            produisent sous votre compte.
          </p>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">4. Propriété intellectuelle</h2>
          <p className="text-gray-700">
            Le service et son contenu original, ses fonctionnalités et ses fonctionnalités sont la propriété de Vision IA et sont protégés par les lois
            internationales sur le droit d'auteur, les marques déposées, les brevets, les secrets commerciaux et autres lois sur la propriété intellectuelle.
          </p>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">5. Utilisation des images</h2>
          <p className="text-gray-700">
            En téléchargeant des images sur notre plateforme, vous confirmez que vous avez le droit d'utiliser ces images. Les images que vous téléchargez
            peuvent être temporairement stockées sur nos serveurs pour fournir le service d'analyse, mais nous ne revendiquons aucun droit de propriété sur ces images.
          </p>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">6. Limitation de responsabilité</h2>
          <p className="text-gray-700">
            Vision IA ne sera pas responsable des dommages directs, indirects, accessoires, spéciaux ou consécutifs qui résultent de votre utilisation ou
            de votre incapacité à utiliser le service. Le service est fourni "tel quel" sans garantie d'aucune sorte.
          </p>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">7. Modifications des conditions</h2>
          <p className="text-gray-700">
            Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications entreront en vigueur immédiatement après leur publication 
            sur cette page. Votre utilisation continue du service après ces modifications constitue votre acceptation des nouvelles conditions.
          </p>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">8. Contact</h2>
          <p className="text-gray-700">
            Si vous avez des questions concernant ces conditions d'utilisation, veuillez nous contacter via la page de contact de notre site.
          </p>
        </div>
      </section>
      
      <div className="mt-12 text-center text-gray-500 text-sm">
        Dernière mise à jour: {new Date().toLocaleDateString('fr-FR', {day: 'numeric', month: 'long', year: 'numeric'})}
      </div>
    </div>
  );
};

export default Terms;
