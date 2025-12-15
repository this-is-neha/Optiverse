import React from "react";
import { useNavigate } from "react-router-dom";

const HeaderComponent: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full sticky top-0 z-50 bg-gradient-to-br from-blue-100 to-indigo-200 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
   
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className="text-2xl font-bold text-indigo-700">
            TodoApp
          </span>
        </div>

     
      </div>
    </header>
  );
};

export default HeaderComponent
