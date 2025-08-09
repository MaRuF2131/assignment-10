import { useState, useRef, useEffect, useContext } from "react"
import { Tooltip } from "react-tooltip"
import DarkModeToggle from "../../mytools/Toggletheme/Toggletheme"
import { NavLink, useNavigate } from "react-router-dom"
import { AuthContext } from "../../mytools/context/context"

const ProfileDropDown = ({ className }) => {
    const { user, logout } = useContext(AuthContext)
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const dropdownRef = useRef()

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener("click", handleClickOutside)
        return () => document.removeEventListener("click", handleClickOutside)
    }, [])

    if (!user) {
        return (
            <div className={`inline-flex gap-2 items-center justify-end ${className}`}>
                <p onClick={() => navigate('/login')} className="px-4 py-2 bg-blue-900 hover:bg-blue-600 rounded-md text-white cursor-pointer">Login</p>
                <p onClick={() => navigate('/signup')} className="px-4 py-2 bg-blue-900 hover:bg-blue-600 rounded-md text-white cursor-pointer">Signup</p>
            </div>
        )
    }

    const menuItems = [
        { title: "Dashboard", path: "/dashboard" },
        { title: "Settings", path: "/settings" }
    ]

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <div className="flex items-center space-x-4">
                <a data-tooltip-id="my-tooltip"
                   data-tooltip-content={user.displayName}
                   data-tooltip-place="top"
                   className=""
                  >
                <button onClick={() => setOpen(!open)} className="w-13 h-13 rounded-full border-2 border-white overflow-hidden">
                    <img src={user?.photoURL} referrerPolicy="no-referrer" alt="Profile" className="w-full h-full object-cover" />
                </button>
                </a>
                <Tooltip id="my-tooltip" className="z-50" />

                     {
                         user&&<div className="flex items-center space-x-2 border rounded-md ">
                             <p onClick={()=>logout()} className="w-20 p-1 text-center rounded-md bg-blue-900 hover:bg-blue-400 text-lg cursor-pointer text-white">Logout</p>
                        </div>
                   } 
            </div>

               

            <ul className={`absolute z-[999] right-0 mt-2 w-56 rounded-xl bg-white/20 backdrop-blur-lg shadow-lg ring-1 ring-white/20 text-white ${open ? 'block' : 'hidden'}`}>
                <li className="px-4 py-2 text-sm text-gray-200 border-b border-white/20">{user?.email}</li>
                {menuItems.map((item, idx) => (
                    <li key={idx}>
                        <NavLink to={item.path} className="block px-4 py-2 hover:bg-black/40 rounded-md">
                            {item.title}
                        </NavLink>
                    </li>
                ))}
                <li>
                    <button onClick={logout} className="w-full cursor-pointer text-left block px-4 py-2 hover:bg-black/40 rounded-md">
                        Log out
                    </button>
                </li>
            </ul>
        </div>
    )
}

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)

    const navigation = [
        { title: "Home", path: "/" },
        { title: "All Groups", path: "/All Groups" },
        { title: "My Groups", path: "/My Groups" },
        { title: "Create Group", path: "/Create Group" },
    ]

    return (
        <nav className="fixed top-0 left-0 right-0 z-[70] bg-white/20 backdrop-blur-md  text-white rounded-md shadow-xl  border-1 border-blue-700/50">
            <div className="flex   w-full items-center justify-between space-x-8 py-3 px-4 max-w-screen-xl mx-auto md:px-8">
                <div className="flex items-center space-x-4">
                    <NavLink to="/" className="flex-none lg:flex-initial">
                        <img
                            src="https://www.floatui.com/logo.svg" 
                            width={120} 
                            height={50}
                            alt="Float UI logo"
                        />
                    </NavLink>
                </div>
                <div className="lg:flex  hidden items-center space-x-6">
                    {navigation.map((item, idx) => (
                        <NavLink key={idx} to={item.path} className={({isActive})=>`${isActive?"text-blue-800":"text-gray-300"} text-lg hover:text-white`}>
                            {item.title}
                        </NavLink>
                    ))}
                    <DarkModeToggle />
                </div>
                <ProfileDropDown />
                <div className="lg:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
                        {menuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
            {menuOpen && (
                <div className="lg:hidden px-4 pb-4 flex flex-col gap-2 z-[75]">
                    {navigation.map((item, idx) => (
                        <NavLink key={idx} to={item.path} className={({isActive})=>`${isActive?"text-blue-800":"text-gray-300"} text-lg hover:text-white`}>
                            {item.title}
                        </NavLink>
                    ))}
                    <div className="mt-2">
                        <DarkModeToggle />
                    </div>
                </div>
            )}
        </nav>
    )
}
export default Navbar
