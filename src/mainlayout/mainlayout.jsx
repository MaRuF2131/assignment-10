import { useEffect, useState } from "react";
import Navbar from "../componets/navbar/navbar"
import { Outlet, useLocation } from "react-router-dom"
import Loader from'../mytools/loader/loader'
import Footer from "../componets/footer/footer";
import { motion } from "framer-motion"
function mainlayout() {
    const location=useLocation();
    const[isloading,setisloading]=useState(true);
    useEffect(()=>{
           setisloading(true);
           const time =setTimeout(() => {
              setisloading(false);
           },1000);
           window.scrollTo(0,0);
           return ()=>clearTimeout(time);
    },[location])

  return (
    <div>
         <Navbar></Navbar>
         <div className="outlet pt-22 pb-3 w-full min-h-screen flex flex-col justify-center items-center">
             { 
               isloading?<Loader></Loader>:
                            <Outlet></Outlet>
             }
         </div>
         <Footer></Footer>
    </div>
  )
}

export default mainlayout