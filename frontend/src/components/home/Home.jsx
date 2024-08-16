import React, { useEffect, useContext } from "react";
import AboutCard from "../about/AboutCard";
import Hblog from "./Hblog";
import HAbout from "./HAbout";
import Hero from "./hero/Hero";
import Testimonal from "./testimonal/Testimonal";
import NotificationBell from "../notificationbell/NotificationBell";
import Header from "../common/header/Header";
import { AuthContext } from "../hook/HuzAuthProvider";
import AdminHeader from "../common/header/AdminHeader";
import HireExpertHeader from "../common/header/HireExpertHeader";
import Footer from "../common/footer/Footer";
import Adminlogout from "../Adminlogout";

const Home = () => {
  const ctx = useContext(AuthContext);

  useEffect(() => {
    if (ctx?.user?.userId && ctx?.user?.token) {
      ctx.socketRef.emit("add-user", ctx?.user?.userId);
    }
  }, [ctx?.user?.userId, ctx?.user?.token, ctx.socketRef]);

  const userRole = ctx?.user?.role || [];

  return (
    <>
      {ctx?.user?.token && userRole.includes("Admin") ? <Adminlogout /> : null}

      {ctx?.user?.token ? (
        userRole.includes("Admin") ? (
          <AdminHeader />
        ) : userRole.includes("Agent") ? (
          <HireExpertHeader />
        ) : (
          <Header />
        )
      ) : (
        <Header />
      )}

      {ctx?.user?.token && userRole.includes("Student") ? <NotificationBell /> : null}
      
      <Hero />
      <AboutCard />
      <HAbout />
      <Testimonal />
      <Hblog />
      <Footer />
    </>
  );
};

export default Home;
