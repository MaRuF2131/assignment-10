import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuthContext } from "../../mytools/context/context";

// Assume user info comes from context or props

const categories = [
  "Drawing & Painting",
  "Photography",
  "Video Gaming",
  "Fishing",
  "Running",
  "Cooking",
  "Reading",
  "Writing",
];

const CreateGroup = () => {
    useEffect(() => {
    document.title = "Create Group - HobbyHub"; // your dynamic title
  }, []);
  const navigate = useNavigate();
  const {user}=useAuthContext();
  const [formData, setFormData] = useState({
    groupName: "",
    hobbyCategory: "",
    description: "",
    location: "",
    maxMembers: "",
    startDate: "",
    imageUrl: "",
    userName:user.displayName,
    userEmail:user.email,
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your DB logic
      console.log("Saving group to DB:", formData);
     const res= await fetch("https://express-server-for-practice.vercel.app/creategroup",{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

     if(res.ok){
            setFormData({
              groupName: "",
              hobbyCategory: "",
              description: "",
              location: "",
              maxMembers: "",
              startDate: "",
              imageUrl: "",
              userName: user.displayName,
              userEmail: user.email,
            });
            Swal.fire({
              icon: "success",
              title: "Group Created!",
              text: "Your hobby group has been successfully created.",
            }).then((result)=>{if(result.isConfirmed)navigate('/My Groups')});
    }else {
        const error = await res.json();
        Swal.fire("Error", error.message || "Update failed", "error");
      }

    } catch (error) {
      console.error("Error saving group:", error);
    }
  };

  return (
    <div className="max-w-3xl w-full mx-auto p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 text-gray-100 space-y-5">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-300">
        Create a New Hobby Group
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <label className="block">
          <span className="block mb-1">Group Name</span>
          <input
            type="text"
            name="groupName"
            value={formData.groupName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </label>

        <label className="block">
          <span className="block mb-1">Hobby Category</span>
          <select
            name="hobbyCategory"
            value={formData.hobbyCategory}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-gray-800 "
            required
          >
          <option value="" >Select Hobby Category</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="block mb-1">Description</span>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows="4"
            required
          />
        </label>

        <label className="block">
          <span className="block mb-1">Meeting Location</span>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </label>

        <label className="block">
          <span className="block mb-1">Max Members</span>
          <input
            type="number"
            name="maxMembers"
            min={0}
            value={formData.maxMembers}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </label>

        <label className="block">
          <span className="block mb-1">Start Date</span>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </label>

        <label className="block">
          <span className="block mb-1">Image URL</span>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </label>

        <label className="block">
          <span className="block mb-1">Your Name</span>
          <input
            type="text"
            value={formData.userName}
            readOnly
            className="w-full border p-2 rounded bg-gray-100 text-gray-500"
          />
        </label>

        <label className="block">
          <span className="block mb-1">Your Email</span>
          <input
            type="email"
            value={formData.userEmail}
            readOnly
            className="w-full border p-2 rounded bg-gray-100 text-gray-500"
          />
        </label>

        <button
          onClick={handleSubmit}
          type="submit"
          className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateGroup;
