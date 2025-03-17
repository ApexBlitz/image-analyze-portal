
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 flex justify-center items-center animate-fade-in">
      <div className="text-center">
        <div className="inline-block px-3 py-1 mb-2 bg-blue-100 text-blue-600 rounded-full text-xs font-medium tracking-wider animate-slide-down">
          IMAGE ANALYSIS
        </div>
        <h1 className="text-4xl font-light tracking-tight mb-1">Vision Insight</h1>
        <p className="text-gray-500 max-w-md mx-auto text-sm">
          Upload your image and discover what AI sees in it
        </p>
      </div>
    </header>
  );
};

export default Header;
