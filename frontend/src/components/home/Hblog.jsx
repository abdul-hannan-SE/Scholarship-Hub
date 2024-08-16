import React from "react";
import "../blog/blog.css";
import { blog } from "../../dummydata";
import Heading from "../common/heading/Heading";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// copy code of blog => blogCard

const Hblog = () => {
  const [BLOG, setBLOGS] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getAdminLatestPosts = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/user/latest-programs",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const responseData = await response.json();

        if (
          response.status === 400 ||
          response.status === 500 ||
          response.status === 422
        ) {
          throw new Error(responseData.message);
        }

        setBLOGS(responseData.programs);
      } catch (error) {
        setError(error.message);
      }
    };

    getAdminLatestPosts();
  }, []);

  const navigateToDetails = (programId) => {
    navigate(`/program/${programId}`);
  };

  return (
    <>
      <section className="blog">
        <div className="container">
          <Heading subtitle="OUR posts" title="Recent From Admin" />
          {error !== "" ? <h4>{error}</h4> : null}
          <div className="grid2">
            {BLOG.length > 0 &&
              BLOG.map((val) => (
                <div
                  style={{ cursor: "pointer" }}
                  className="items shadow"
                  onClick={() => navigateToDetails(val._id)}
                >
                  <div className="img">
                    <img
                      src={val?.imageUrl ? val.imageUrl : blog[0].cover}
                      alt=""
                    />
                  </div>
                  <div className="text">
                    <div className="admin flexSB">
                      <span>
                        <i className="fa fa-user"></i>
                        <label htmlFor="">{"Admin"}</label>
                      </span>
                      <span>
                        <i className="fa fa-calendar-alt"></i>
                        <label htmlFor="">{val.lastDateToApply}</label>
                      </span>
                      <span>
                        <i className="fa fa-comments"></i>
                        <label htmlFor="">{val.noOfReviews} reviews</label>
                      </span>
                    </div>
                    <h1>{val.title}</h1>
                    <p>{val.description}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hblog;
