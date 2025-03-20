
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Twitter, Linkedin, ArrowUpRight } from "lucide-react";

const AboutPage: React.FC = () => {
  return (
    <main className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold mb-4">À propos de Vision Insight</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Vision Insight est une interface utilisateur pour Ollama qui facilite l'analyse d'images via des modèles d'IA locaux.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Rendre accessible l'analyse d'images par IA à tous, en utilisant des modèles open source exécutés localement pour préserver la confidentialité.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Technologie</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Nous utilisons des technologies web modernes (React, TypeScript) et nous connectons à Ollama pour l'inférence de modèles d'IA multimodaux.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Confidentialité</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Vos images ne quittent jamais votre ordinateur. Tout le traitement est effectué localement via Ollama, garantissant la sécurité de vos données.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Notre équipe</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Emma Laurent",
                role: "Fondatrice & Développeuse",
                image: "https://randomuser.me/api/portraits/women/44.jpg",
                bio: "Passionnée d'IA et de vision par ordinateur, Emma a créé Vision Insight pour démocratiser l'accès à l'analyse d'images.",
              },
              {
                name: "Thomas Dubois",
                role: "Ingénieur IA",
                image: "https://randomuser.me/api/portraits/men/32.jpg",
                bio: "Spécialiste des modèles multimodaux, Thomas optimise les intégrations avec Ollama et améliore la qualité des analyses.",
              },
              {
                name: "Sophie Moreau",
                role: "Designer UX/UI",
                image: "https://randomuser.me/api/portraits/women/68.jpg",
                bio: "Sophie conçoit des interfaces intuitives qui rendent l'IA accessible même aux utilisateurs novices.",
              }
            ].map((member, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
                <h3 className="text-lg font-medium">{member.name}</h3>
                <p className="text-blue-600 mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Notre histoire</h2>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-8">
            <div className="prose max-w-none">
              <p>
                Vision Insight est née de la frustration face aux services d'analyse d'images basés sur le cloud, qui nécessitent souvent l'envoi de données sensibles vers des serveurs distants.
              </p>
              <p className="mt-4">
                Avec l'émergence d'Ollama et des modèles multimodaux légers, nous avons vu l'opportunité de créer une interface conviviale permettant aux utilisateurs d'analyser leurs images localement, sans compromettre leur vie privée.
              </p>
              <p className="mt-4">
                Notre objectif est de continuer à développer des outils qui rendent l'IA accessible tout en respectant la confidentialité des données.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold mb-6">Nous soutenir</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="gap-2">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github size={18} />
                Star sur GitHub
              </a>
            </Button>
            <Button variant="outline" asChild className="gap-2">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter size={18} />
                Suivre sur Twitter
              </a>
            </Button>
            <Button variant="secondary" asChild className="gap-2">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin size={18} />
                Connecter sur LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
