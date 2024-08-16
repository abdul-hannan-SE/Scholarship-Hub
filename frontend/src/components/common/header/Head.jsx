import React from "react";
import Profile from "./profile/Profile";

const Head = () => {
  return (
    <>
      <section className='head'>
        <div className='container flexSB'>
          <div className='logo'>
            
            <h1>Pak Opportunity Hub</h1>
            <span> PLACE FOR SCHOLARSHIP OPPORTUNITIES</span>
          </div>

          <div className='right-corner'>
            <div className='social'>
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
            <a
              href="  https://www.youtube.com/@Fullscholarships"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className='fab fa-youtube icon'></i>
              </a>
            </div>
          

            <div className="profile-container">
              <Profile />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Head;
