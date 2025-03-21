
import React from "react";
import { Link } from "react-router-dom";
import { Heart, Github, ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="w-full bg-gray-100 border-t border-gray-200 mt-16 py-6">
      <div className="container max-w-5xl px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="font-medium text-gray-800 mb-3">{t("app.name")}</h3>
            <p className="text-gray-600 text-sm">
              {t("app.footer.subtitle")}
            </p>
            <div className="flex items-center gap-1 mt-3 text-sm text-gray-600">
              <span>{t("app.footer.madeWith")}</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>{t("app.footer.by")}</span>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-medium text-gray-800 mb-3">{t("app.footer.links")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-blue-600 hover:underline">{t("app.footer.home")}</Link>
              </li>
              <li>
                <Link to="/about" className="text-blue-600 hover:underline">{t("app.footer.about")}</Link>
              </li>
              <li>
                <Link to="/documentation" className="text-blue-600 hover:underline">{t("app.footer.documentation")}</Link>
              </li>
              <li>
                <Link to="/models" className="text-blue-600 hover:underline">{t("app.footer.models")}</Link>
              </li>
              <li>
                <Link to="/contact" className="text-blue-600 hover:underline">{t("app.footer.contact")}</Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-medium text-gray-800 mb-3">{t("app.footer.resources")}</h3>
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
          <p>© {new Date().getFullYear()} Vision IA. {t("app.footer.rights")}</p>
          <div className="mt-2 space-x-4">
            <Link to="/terms" className="hover:underline">{t("app.footer.terms")}</Link>
            <button 
              onClick={() => window.dispatchEvent(new Event('openCookieSettings'))}
              className="hover:underline"
            >
              {t("app.footer.cookies")}
            </button>
            <Link to="/privacy" className="hover:underline">{t("app.footer.privacy")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
