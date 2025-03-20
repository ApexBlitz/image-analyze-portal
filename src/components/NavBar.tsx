
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Zap } from "lucide-react";

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
          
          <div className="flex space-x-8">
            <Link to="/" className={`${isActive("/")}`}>
              Analyse d'image
            </Link>
            <Link to="/models" className={`${isActive("/models")}`}>
              Modèles IA
            </Link>
            <Link to="/contact" className={`${isActive("/contact")}`}>
              Contact
            </Link>
            <Link to="/about" className={`${isActive("/about")}`}>
              À propos
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
