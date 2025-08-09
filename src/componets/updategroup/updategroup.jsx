import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuthContext } from "../../mytools/context/context";
import formatToMMDDYYYY from'../../mytools/dateformate/dateformate'
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

const UpdaetGroup = () => {
  const navigate = useNavigate();
  const location =useLocation();
  const {user}=useAuthContext();
  const[merror,seterror]=useState(false);

    useEffect(() => {
     document.title = "UpdateGroup - HobbyHub"; // your dynamic title
    }, []);
  const [formData, setFormData]=useState({
            groupName: "",
            hobbyCategory: "",
            description: "",
            location: "",
            maxMembers: "",
            startDate: "",
            imageUrl: "",
/*             userName: user.name,///bug 
            userEmail: user.email, */
          });

   useEffect(()=>{
      try{
        const group=location?.state?.massage??null;
        const username=user.displayName===group.userName?user.displayName:null;
        const useremail=user.email===group.userEmail?user.email:null;
        if(!useremail || !username) seterror("You do not Author such a group.")
         else  if(group){
            const date=formatToMMDDYYYY(group.startDate)
            setFormData({
                groupId:group._id,
                groupName: group.groupName,
                hobbyCategory: group.hobbyCategory,
                description:group.description,
                location: group.location,
                maxMembers:group.maxMembers,
                startDate:date,
                imageUrl:group.imageUrl,
                userName: username ,
                userEmail:useremail,
            })
            seterror(false)
        }else{
          seterror('You do not have such a group.');
        } 
    }catch(error){
        seterror("You do not have such a group.")
    }
   },[location,user]);

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your DB logic
      Swal.fire({
        title: "Are you sure?",
        text: "This will permanently update the group!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, update it!",
      }).then(async (result) => {
            if(result.isConfirmed){
                const res= await fetch("https://express-server-for-practice.vercel.app/updategroup",{
                    method:"PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                  })
                    if(res.ok){
                            Swal.fire({
                              icon: "success",
                              title: "Group Created!",
                              text: `Your ${formData.groupName} group has been successfully created.`,
                            }).then((result)=>{if(result.isConfirmed)navigate('/My Groups')});
                    }else {
                        const error = await res.json();
                        Swal.fire("Error", error.message || "Update failed", "error");
                      }

                    }
            }
      )}
       catch (error) {
          console.error("Error saving group:", error);
        }
  };

  return (
    merror?<div>
      <p className="text-center text-2xl p-4 text-white">{merror}</p>
      <div className="w-full inline-flex items-center justify-center">
          <p onClick={()=>navigate('/My Groups')} className="w-25 px-1 py-2 text-center rounded-md bg-blue-900 text-xl cursor-pointer text-white">Go Back</p>
      </div>
    </div>
    :<div className="max-w-3xl mx-auto w-full p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 text-gray-100 space-y-5">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-300">
        Update {formData.groupName} Group
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
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdaetGroup;
