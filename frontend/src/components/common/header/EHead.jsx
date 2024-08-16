import React from "react"
import Profile from "./profile/Profile"

const EHead = () => {
  return (
    <>
      <section className='head'>
        <div className='container flexSB'>
          <div className='logo'>
          <h1>Welcome to HireAnExpert Dashboard</h1>
            <span>Pak Opportunity Hub</span>
          </div>

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
      </section>
    </>
  )
}

export default EHead
