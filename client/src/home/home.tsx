import React from "react";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "./header";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <HeaderComponent />
      <div className="min-h-screen flex flex-col items-center justify-center bg-indigo-100 p-6">
        <h1 className="text-4xl font-bold text-indigo-700 mb-4">Welcome to TodoApp</h1>
        <p className="text-center text-gray-700 mb-8 max-w-md">
          TodoApp is a simple and easy-to-use application to help you organize your tasks,
          create new todo lists, and keep track of all your important activities in one place.
        </p>

        <div className="space-x-4">
          <button
            onClick={() => navigate("/todos/create")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            Create Todo
          </button>

          <button
            onClick={() => navigate("/todos")}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            View All Todos
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
