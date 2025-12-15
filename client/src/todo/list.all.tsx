import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "../home/header";

const baseURL = "http://localhost:3001/todos";

const ListList: React.FC = () => {
  const [lists, setLists] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await axios.get(baseURL);
        setLists(response.data || []);
        console.log("Fetched todos:", response.data);
      } catch (exception) {
        console.error("Error fetching todos:", exception);
        setLists([]);
      }
    };
    fetchLists();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${baseURL}/${id}`);
      setLists(lists.filter((list) => list.id !== id));
    } catch (exception) {
      console.error("Error deleting todo:", exception);
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/todos/edit/${id}`);
  };

  return (
    <>
      <HeaderComponent />
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200 flex items-center justify-center p-6">
        <div className="w-full max-w-5xl bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-indigo-700">Your Todo Lists</h1>
            <button
              onClick={() => navigate("/todos/create")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-lg transition"
            >
              Create New
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg shadow">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium">Title</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Description</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Image</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
                  <th className="px-6 py-3 text-center text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {lists.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-500 px-6 py-8 text-lg">
                      No Todos available
                    </td>
                  </tr>
                ) : (
                  lists.map((list) => (
                    <tr key={list.id} className="hover:bg-indigo-50 transition">
                      <td className="px-6 py-4 border-b text-gray-800 font-medium">{list.title}</td>
                      <td className="px-6 py-4 border-b text-gray-600">{list.description || "-"}</td>
                      <td className="px-6 py-4 border-b text-gray-600">
                        {list.image ? (
                          <img
                            src={`http://localhost:3001${list.image}`}
                            alt={list.title}
                            className="w-16 h-16 object-cover rounded"
                          />
                        ) : (
                          "-"
                        )}
                      </td>

                      <td className="px-6 py-4 border-b text-gray-800">{list.status}</td>
                      <td className="px-6 py-4 border-b text-center space-x-3">
                        <button
                          onClick={() => handleEdit(list.id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-lg transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(list.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListList;
