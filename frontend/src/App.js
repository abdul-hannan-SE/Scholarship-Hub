// App.js
import React, { useEffect, useRef, useState } from "react";
import Header from "./components/common/header/Header";
import AdminHeader from "./components/common/header/AdminHeader";
import Footer from "./components/common/footer/Footer";
import Login from "./components/registration/Login";
import { Outlet, useLocation } from "react-router";
import HireExpertHeader from "./components/common/header/HireExpertHeader";
import "./App.css";
import AuthProvider from "./components/hook/AuthProvider";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/home/Home";
import About from "./components/about/About";
import CourseHome from "./components/allcourses/CourseHome";
import Team from "./components/team/Team";
import Pricing from "./components/pricing/Pricing";
import Blog from "./components/blog/Blog";
import Contact from "./components/contact/Contact";
import ManageUsers from "./components/admin/ManageUsers";
import Chat from "./components/chat/Chat";
import PrivateR from "./components/privateroute/PrivateR";
import Eligibility from "./components/eligibility/Eligibility";
import Loginform from "./components/register/login/Loginform";
import SignUp from "./components/register/signup/SignUp";
import Profile from "./components/common/header/profile/Profile";
import AdminUploadPost from "./components/admin/uploadpost/AdminUploadPost";
import ScholarshipScrap from "./components/admin/scholarshipscrp/ScholarshipScrap";
import { AuthContext } from "./components/hook/HuzAuthProvider";
import { useCallback } from "react";
import ProgramDetails from "./components/SinglePost/SinglePostDetails";
import HireAnExpert from "./components/HireExpert/HireAnExpert";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import {io} from "socket.io-client";
import UpdateUser from "./components/UpdateUser/UpdateUser";
import EditProgram from "./components/EditProgram/EditProgram";
import EligibilityResults from "./components/eligibility/EligibilityResults";




const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
      { path: '/about', element: <About /> },
      { path: '/program', element: <CourseHome /> },
      { path: '/expert', element: <Team /> },
      { path: '/pricing', element: <Pricing /> },
      { path: '/posts', element: <Blog /> },
      { path: '/contact', element: <Contact /> },
      { path: '/login', element: <Login /> },
      { path: '/manageusers', element: <ManageUsers /> },
      { path: '/chat', element: <Chat /> },
      { path: '/eligibility', element: <PrivateR Component={Eligibility} /> },
      { path: '/eligibility/results', element: <PrivateR Component={EligibilityResults} /> },
      { path: '/register/login', element: <Loginform /> },
      { path: '/register/signup', element: <SignUp /> },
      { path: '/profile', element: <Profile /> },
      { path: '/uploadpost', element: <AdminUploadPost /> },
      { path: '/scholarshipscrap', element: <ScholarshipScrap /> } ,
      {path : '/program/:programId' , element : <ProgramDetails/>} ,
      {path : '/expert/:expertId' , element : <HireAnExpert/>},
      { path: '/user/:userId', element: <UpdateUser/> },
      {path : "/program/edit/:programId" , element : <EditProgram/>}
]);
function App() {

  const socketRef = useRef();
 socketRef.current = io('http://localhost:8080' , {
  transports: ["websocket"]
 });

  const [user , setUser] = useState(JSON.parse(localStorage.getItem('loggedInUser')) || null);

  useEffect(()=>{
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if(loggedInUser){
          setUser(loggedInUser);
        }
  },[]);
   

  const setLogin=useCallback((user)=>{
             setUser(user);
  } , []);

  const setUserVal=(val)=>{
setUser(val);
  }

  const loadedStripe = loadStripe("pk_test_51NQRbTCO2UA2pw05r4yVyOp82QK3MIepskJGNRmlseC4RXKtfs9wou7Ge6ma6GujxwCyW6V7KUiCXiPUi49vTA9X00dC1RmMyx");


  return (
    <AuthContext.Provider value={{user : user , setLogin : setLogin , setUser : setUserVal , socketRef : socketRef.current  }}>
      <Elements stripe={loadedStripe}>
    <RouterProvider router={router} />
    </Elements>
    </AuthContext.Provider>
  );
}

export default App;















// // App.js
// import React, { useState } from "react";
// import Header from "./components/common/header/Header";
// import AdminHeader from "./components/common/header/AdminHeader";
// import Footer from "./components/common/footer/Footer";
// import Login from "./components/registration/Login";
// import { Outlet } from "react-router";
// import HireExpertHeader from "./components/common/header/HireExpertHeader";
// import "./App.css";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [isHireExpert, setIsHireExpert] = useState(false);

//   const handleLogin = (isAdminLogin, isHireExpertLogin) => {
//     setIsLoggedIn(true);
//     setIsAdmin(isAdminLogin);
//     setIsHireExpert(isHireExpertLogin);
//   };

//   return (
//     <>
//       {isLoggedIn ? (
//         <>
//           {isAdmin ? <AdminHeader /> : isHireExpert ? <HireExpertHeader /> : <Header />}
//           <Outlet />
//           <Footer />
//         </>
//       ) : (
//         <Login onLogin={handleLogin} />
//       )}
//     </>
//   );
// }

// export default App;
