import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import formatToMMDDYYYY from '../../mytools/dateformate/dateformate';
import { useAuthContext } from "../../mytools/context/context";
import Swal from "sweetalert2";

export default () => {
  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState(null);
  const [btn, setBtn] = useState('Join to group');
  const [error, setError] = useState(null);

  const { user } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

    useEffect(() => {
      document.title = "Group Details- HobbyHub"; // your dynamic title
  }, []);

  useEffect(() => {
    try {
      const g = location?.state?.massage ?? null;
      if (!g) {
        setError("You do not have such a group.");
        setLoading(false);
        return;
      }

      setGroup(g);
      const date = new Date();
      const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const startDate = new Date(g.startDate);

      if (user?.email === g.userEmail) {
        setBtn('Joined (You Owner)');
      } else if (today >= startDate) {
        setBtn('Unable to join (Activity Started)');
      }

    } catch (e) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [location?.state, user]);

  const callWorn = (msg) => {
    Swal.fire({
      icon: "error",
      title: "Group join!",
      text: msg,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!group) return;

    const date = new Date();
    const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const startDate = new Date(group.startDate);
    const joineduser=await fetch(`https://express-server-for-practice.vercel.app/joineduser?email=${user?.email}&groupId=${group?._id}`)
    const flag=await joineduser.json();
    if(flag.sign===true){
      return callWorn(flag.message);
    }
    if (user.email === group.userEmail) {
      return callWorn("You are owner of this group so you do not need to join.");
    }

    if (today >= startDate) {
      return callWorn("The group activity has already started, so you cannot join.");
    }

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You will permanently join the group!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, join it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch("https://express-server-for-practice.vercel.app/savejoineduser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({email: user?.email,
                    groupId:group?._id,}),
        });

        if (res.ok) {
          await Swal.fire("Success!", "You have successfully joined the group.", "success");
          navigate("/All Groups");
        } else {
          const error = await res.json();
          Swal.fire("Error", error.message || "Update failed", "error");
        }
      } catch (err) {
        Swal.fire("Error", "Something went wrong.", "error");
      }
    }
  };

  if (loading) return <div className="text-center text-white">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!group) return null;

  return (
    <div className="p-6 w-full h-full inline-flex justify-center items-center">
      <div className="bg-gradient-to-tr h-full max-w-2xl w-full pb-2 overflow-visible from-indigo-950 via-purple-950 to-blue-950/10 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
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

        <div className="p-5 h-52 relative space-y-3 bg-white text-gray-900 rounded-b-2xl">
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
            onClick={handleSubmit}
            className="block absolute bottom-4 left-4 right-4 text-center mt-3 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
          >
            {btn}
          </button>
        </div>
      </div>
    </div>
  );
};
