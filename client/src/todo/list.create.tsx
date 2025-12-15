import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "../home/header";

const baseURL = "http://localhost:3001/todos";

const ListCreate: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image:  null as File | null, 
    status: "pending",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 const handleFileChange = (e: any) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file }); 
      console.log("Uploaded file:", file);
    }
  };
 
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("status", formData.status);
    if (formData.image) form.append("image", formData.image);

    const response = await axios.post(baseURL, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Todo created:", response.data);
    setSuccess(true);
    setFormData({ title: "", description: "", image: null, status: "pending" });

    setTimeout(() => setSuccess(false), 2500);
    navigate("/todos");
  } catch (err) {
    console.error("Error creating todo:", err);
    setError("Failed to create todo. Please try again.");
  }
};

  return (
    <>
      <HeaderComponent />
      <div className="min-h-screen flex items-center justify-center bg-indigo-100 p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
            Create Todo
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter todo title"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description"
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none placeholder-gray-400 resize-none"
              />
            </div>

            <div>
            <label className="block text-lg mb-1">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded text-lg"
              required
            />
          </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {error && <p className="text-red-500 text-center font-medium">{error}</p>}

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Create Todo
            </button>
          </form>

          {success && (
            <div className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg text-center font-medium">
              Todo Created Successfully!
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ListCreate;
