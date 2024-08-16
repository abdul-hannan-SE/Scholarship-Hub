import React, { useContext } from "react";
import { blog } from "../../dummydata";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router/dist";
import { AuthContext } from "../hook/HuzAuthProvider";

const BlogCard = () => {
  const ctx = useContext(AuthContext);

  const [BLOG, setBLOGS] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getAdminPosts = async () => {
      try {
        const response = await fetch("http://localhost:8080/user/programs", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const responseData = await response.json();

        if (
          response.status === 400 ||
          response.status === 500 ||
          response.status === 422
        ) {
          throw new Error(responseData.message);
        }

        setBLOGS(responseData.data);
      } catch (error) {
        setError(error.message);
      }
    };

    getAdminPosts();
  }, []);

  const navigateToEdit = (programId) => {
    navigate(`/program/edit/${programId}`);
  };

  const navigateToDetails = (programId) => {
    navigate(`/program/${programId}`);
  };

  const handleDeleteProgram = async (programId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/admin/program/${programId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ctx?.user?.token}`,
          },
        }
      );

      const responseData = await response.json();

      if (
        response.status === 400 ||
        response.status === 500 ||
        response.status === 401 ||
        response.status === 403
      ) {
        throw new Error(responseData.message);
      }

      setBLOGS((prev) => {
        return prev.filter((blog) => {
          return blog._id !== programId;
        });
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      {error !== "" ? <h4>{error}</h4> : null}
      {BLOG.length > 0 &&
        BLOG.map((val) => (
          <div
            style={{ cursor: "pointer" }}
            className="items shadow blog-card"
            key={val._id}
          >
            <div className="img-blog">
              <img src={val?.imageUrl ? val?.imageUrl : blog[0].cover} alt="" />
            </div>
            <div className="text">
              <div className="admin flexSB">
                <span>
                  <i className="fa fa-user"></i>
                  <label htmlFor="">{"Admin"}</label>
                </span>
                <span>
                  <i className="fa fa-calendar-alt"></i>
                  <label htmlFor="">{val?.lastDateToApply}</label>
                </span>
                <span>
                  <i className="fa fa-comments"></i>
                  <label htmlFor="">{val?.noOfReviews} reviews</label>
                </span>
              </div>
              <h1>{val.title}</h1>
              <p>{val.description}</p>
              <button onClick={() => navigateToDetails(val._id)}>
                Read More
              </button>

              {ctx?.user?.token && ctx?.user?.role === "Admin" ? (
                <button onClick={() => navigateToEdit(val._id)}>Edit</button>
              ) : null}
              {ctx?.user?.token && ctx?.user?.role === "Admin" ? (
                <button onClick={() => handleDeleteProgram(val._id)}>
                  Delete
                </button>
              ) : null}
            </div>
          </div>
        ))}
    </>
  );
};

export default BlogCard;
