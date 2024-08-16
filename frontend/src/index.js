import React from "react";
import ReactDOM from "react-dom";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import {createRoot} from "react-dom/client";

import App from "./App";
import About from "./components/about/About";
import CourseHome from "./components/allcourses/CourseHome";
import Team from "./components/team/Team";
import Pricing from "./components/pricing/Pricing";
import Blog from "./components/blog/Blog";
import Contact from "./components/contact/Contact";
import Home from "./components/home/Home";
import Login from "./components/registration/Login";
import Chat from "./components/chat/Chat";
import Eligibility from "./components/eligibility/Eligibility";
import Profile from "./components/common/header/profile/Profile";
import Loginform from './components/register/login/Loginform';
import SignUp from './components/register/signup/SignUp';
import ManageUsers from "./components/admin/ManageUsers";
import AdminUploadPost from "./components/admin/uploadpost/AdminUploadPost";
import ScholarshipScrap from "./components/admin/scholarshipscrp/ScholarshipScrap.jsx";
// import PrivateRoute from "./components/privateroute/Privateroute.jsx";
import PrivateR from "./components/privateroute/PrivateR.jsx";
import PrivateE from "./components/privateroute/PrivateE.jsx";
import AuthProviderH, { AuthContext } from "./components/hook/HuzAuthProvider.jsx";
import EligibilityResults from "./components/eligibility/EligibilityResults.jsx";

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
      { path: '/eligibility', element: <Eligibility /> },
    { path: '/eligibility/results', element: <EligibilityResults /> },
      { path: '/register/login', element: <Loginform /> },
      { path: '/register/signup', element: <SignUp /> },
      { path: '/profile', element: <Profile /> },
      { path: '/uploadpost', element: <AdminUploadPost /> },
      { path: '/scholarshipscrap', element: <ScholarshipScrap /> }
]);

const root = createRoot(document.getElementById("root"));

root.render(
    <App/>
   
);

    // {/* <AuthProviderH> */}
    //   {/* </AuthProviderH> */}
