import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import formatToMMDDYYYY from'../../mytools/dateformate/dateformate'
export default () => {

 const[groups,setgroups]=useState();
 const[loading,setLoading]=useState(true);
 const navigate=useNavigate();
   useEffect(() => {
    document.title = "All group - HobbyHub"; // your dynamic title
  }, []);

useEffect(()=>{
  const  allgroup=async()=>{
    const result =await fetch('https://express-server-for-practice.vercel.app/allgroup');
    const data=await result.json();
    setgroups(data);
    setLoading(false);
  }
  allgroup();
},[])

const gotodetails=(group)=>{
    navigate(`/groupdetails/${group._id}`,{
      state:{massage:group}
    })
}
if (loading) return <div className="text-center text-white">Loading...</div>;
return (
     <div className="p-6 h-full max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {groups.map((group) => (
        <div
          key={group._id}
          className="bg-gradient-to-tr h-full pb-2  overflow-visible from-indigo-950 via-purple-950 to-blue-950/10 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300  cursor-pointer"
        >
          <div className="relative h-48 overflow-hidden rounded-t-2xl">
            <img
              src={group.imageUrl}
              alt={group.groupName}
              className="w-full h-full object-cover brightness-90 hover:brightness-110 transition duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <h2 className="text-white text-2xl font-bold truncate">{group.groupName}</h2>
              <p className="text-gray-300 text-sm truncate">{group.hobbyCategory}</p>
            </div>
          </div>

          <div className="p-5 h-52  relative space-y-3 bg-white text-gray-900 rounded-b-2xl">
            <p className="text-sm line-clamp-3">{group.description}</p>

            <div className="flex justify-between text-xs text-gray-600 font-semibold">
              <span>📍 {group.location}</span>
              <span>👥 Max: {group.maxMembers}</span>
            </div>

            <div className="text-xs text-gray-500 font-medium">
              Start Date: <time dateTime={group.startDate}>{formatToMMDDYYYY(group.startDate)}</time>
            </div>

            <div className="text-xs text-gray-400 italic">
              Created by: {group.userName} ({group.userEmail})
            </div>

            <button
              onClick={()=>gotodetails(group)}
              className="block  absolute bottom-4 left-4 right-4 text-center mt-3 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
            >
              See More
            </button>
          </div>
       </div>
      ))}
    </div> 
  );
}

