
import React from "react";
import { Link } from "react-router-dom";
import { Heart, Github, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 border-t border-gray-200 mt-16 py-6">
      <div className="container max-w-5xl px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="font-medium text-gray-800 mb-3">Vision IA</h3>
            <p className="text-gray-600 text-sm">
              Une application d'analyse d'images qui utilise des modèles de vision IA locaux ou via API pour décrire vos images.
            </p>
            <div className="flex items-center gap-1 mt-3 text-sm text-gray-600">
              <span>Fait avec</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>par l'équipe Vision IA</span>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-medium text-gray-800 mb-3">Liens</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-blue-600 hover:underline">Accueil</Link>
              </li>
              <li>
                <Link to="/about" className="text-blue-600 hover:underline">À propos</Link>
              </li>
              <li>
                <Link to="/documentation" className="text-blue-600 hover:underline">Documentation</Link>
              </li>
              <li>
                <Link to="/models" className="text-blue-600 hover:underline">Modèles</Link>
              </li>
              <li>
                <Link to="/contact" className="text-blue-600 hover:underline">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-medium text-gray-800 mb-3">Ressources</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-1">
                <Github className="h-4 w-4" />
                <a 
                  href="https://github.com/ollama/ollama" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  Ollama
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li className="flex items-center gap-1">
                <Github className="h-4 w-4" />
                <a 
                  href="https://github.com/openai/openai-node" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  OpenAI API
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-6 pt-6 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Vision IA. Tous droits réservés.</p>
          <div className="mt-2 space-x-4">
            <Link to="/privacy" className="hover:underline">Politique de confidentialité</Link>
            <button 
              onClick={() => window.dispatchEvent(new Event('openCookieSettings'))}
              className="hover:underline"
            >
              Paramètres des cookies
            </button>
            <Link to="/terms" className="hover:underline">Conditions d'utilisation</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
