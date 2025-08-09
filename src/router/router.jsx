import { createBrowserRouter,RouterProvider } from "react-router-dom";
import { lazy,Suspense } from "react";
import Loader from"../mytools/loader/loader"
const Mainlayout=lazy(()=>import("../mainlayout/mainlayout"));
const Slider=lazy(()=>import("../componets/slide/slide"));
const Allgroup=lazy(()=>import("../componets/Allgroup/Allgroup"))
const Loginform=lazy(()=>import("../componets/login-form/login-form"))
const Signup=lazy(()=>import("../componets/registration/registration"))
const Privateroute=lazy(()=>import("../mytools/privateroute/privateroute"))
const Error=lazy(()=>import("../mytools/error/error"))
const CreateGroup=lazy(()=>import("../componets/creategroup/creategroup"))
const MyGroup=lazy(()=>import("../componets/mygroup/mygroup"))
const UpdateGroup=lazy(()=>import("../componets/updategroup/updategroup"))
const Extrasection =lazy(()=>import("../componets/extrasection/extrasection"))
const Ongoinggroup=lazy(()=>import("../componets/ongoinggroup/ongoinggroup"))
const Groupdetails=lazy(()=>import("../componets/groupdetails/groupdetails"))

const root =createBrowserRouter([
    {
        path:'/',
        element:(
            <Suspense fallback={<Loader/>}>
                <Mainlayout/>
            </Suspense>

        ),
        children:[
            {
                    index:true,
                    element:(
                        <Suspense fallback={<Loader/>}>
                             <>
                               <Slider></Slider>
                               <Ongoinggroup/>
                               <Extrasection/>
                             </>
                        </Suspense>

                    ),

            },
 
            {
                    path:'/All Groups',
                    element:(
                        <Suspense fallback={<Loader/>}>
                               <Allgroup/>
                        </Suspense>

                    ),
            },
            {
                    path:'/My Groups',
                    element:(
                        <Suspense fallback={<Loader/>}>
                            <Privateroute >
                               <MyGroup/>
                            </Privateroute>
                        </Suspense>

                    ),
            },
            {
                    path:'/Create Group',
                    element:(
                        <Suspense fallback={<Loader/>}>
                            <Privateroute>
                               <CreateGroup/>
                            </Privateroute>
                        </Suspense>

                    ),
            },
            {
                    path:'/updategroup/:id',
                    element:(
                        <Suspense fallback={<Loader/>}>
                            <Privateroute >
                               <UpdateGroup/>
                            </Privateroute>
                        </Suspense>

                    ),
            },
            {
                    path:'/groupdetails/:id',
                    element:(
                        <Suspense fallback={<Loader/>}>
                            <Privateroute >
                               <Groupdetails/>
                            </Privateroute>
                        </Suspense>

                    ),
            },
            {
                path:'/login',
                element:(
                  <Suspense fallback={<Loader/>}>
                          <Loginform></Loginform>
                    </Suspense>
                )
            },
            {
                path:'/signup',
                element:(
                  <Suspense fallback={<Loader/>}>
                          <Signup></Signup>
                    </Suspense>
                )
            }
        ]
    },{
        path:'/*',
       element:(
                  <Suspense fallback={<Loader/>}>
                          <Error></Error>
                    </Suspense>
                )
    }
])
export default ()=>{
   return( <RouterProvider router={root}> </RouterProvider>)
}