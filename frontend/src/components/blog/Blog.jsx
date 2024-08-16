import React, { useContext } from "react";
import Back from "../common/back/Back";
import BlogCard from "./BlogCard";
import "./blog.css";
import { AuthContext } from "../hook/HuzAuthProvider";
import Header from "../common/header/Header";
import AdminHeader from "../common/header/AdminHeader";
import Footer from "../common/footer/Footer";

const Blog = () => {
  const ctx = useContext(AuthContext);
  return (
    <>
      {ctx?.user?.role.includes("Student") ? (
        <Header />
      ) : ctx?.user?.role.includes("Admin") ? (
        <AdminHeader />
      ) : (
        <Header />
      )}
      <Back title="Posts" />
      <section className="blog padding">
        <div className="container grid2">
          <BlogCard />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Blog;
