import React from "react";
import { blog } from "../../../dummydata";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./footer.css";

const Footer = () => {
  const [BLOG, setBLOGS] = useState([]);
  const [error, setError] = useState("");

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

  return (
    <>
      <section className="newletter">
        <div className="container flexSB">
          <div className="left row">
            <h1>Newsletter - Stay tune and get the latest update</h1>
            <span>Far far away, behind the word mountains</span>
          </div>
          <div className="right row">
            <input type="text" placeholder="Enter email address" />
            <button className="fa fa-paper-plane"></button>
          </div>
        </div>
      </section>
      <footer>
        <div className="container padding">
          <div className="box logo">
            <h1>PAK OPPORTUNITY HUB</h1>
            <span>PLACE FOR SCHOLARSHIP OPPORTUNITIES</span>
            <p>
              "Beyond the chaos, within the reach of opportunities, Pak
              Opportunity Hub unveils a path for all aspiring hearts"
            </p>

            <a
              href="https://web.facebook.com/groups/103227147034428/?_rdc=1&_rdr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f icon"></i>
            </a>
            <a
              href=" https://twitter.com/scholarshipscom "
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter icon"></i>
            </a>
            <a
              href="https://www.instagram.com/explore/tags/scholarships/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram icon"></i>
            </a>
          </div>
          <div className="box link">
            <h3>Explore</h3>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/expert">Hire An Expert</Link>
              </li>
              <li>
                <Link to="/posts">Posts</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="box link">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <Link to="/eligibility">Check Eligibilty</Link>
              </li>
              <li>
                <Link to="/register/login">Register</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="box">
            <h3>Recent Post</h3>
            {error !== "" ? <h4>{error}</h4> : null}
            {BLOG.length > 0 &&
              BLOG.map((val) => (
                <div className="items flexSB">
                  <div className="img">
                    <img
                      src={val?.imageUrl ? val.imageUrl : blog[0].cover}
                      alt=""
                    />
                  </div>
                  <div className="text">
                    <span>
                      <i className="fa fa-calendar-alt"></i>
                      <label htmlFor="">{val.lastDateToApply}</label>
                    </span>
                    <span>
                      <i className="fa fa-user"></i>
                      <label htmlFor="">{val.type}</label>
                    </span>
                    <h4>{val.title.slice(0, 40)}...</h4>
                  </div>
                </div>
              ))}
          </div>
          <div className="box last">
            <h3>Have a Questions?</h3>
            <ul>
              <li>
                <i className="fa fa-map"></i>
                10 street Islam Nager,Gujrat,punjab,Pakistan
              </li>
              <li>
                <i className="fa fa-phone-alt"></i>
                +92 3484291267
              </li>
              <li>
                <i className="fa fa-paper-plane"></i>
                infoPakOppoertunityHub@gmail.com
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className="legal">
        <p>Copyright ©2022 All rights reserved by pak Opportunity Hub</p>
      </div>
    </>
  );
};

export default Footer;
