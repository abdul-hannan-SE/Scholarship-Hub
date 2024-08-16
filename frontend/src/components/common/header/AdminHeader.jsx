import React, { useState } from "react"
import { Link } from "react-router-dom"
import AHead from "./AHead"
import "./header.css"

const AdminHeader = () => {
  const [click, setClick] = useState(false)

  return (
    <>
      <AHead />
      <header>
        <nav className='flexSB'>
          <ul className={click ? "mobile-nav" : "flexSB "} onClick={() => setClick(false)}>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/manageusers'>Manage Users</Link>
            </li>
            <li>
              <Link to='/uploadpost'>Upload Posts</Link>
            </li>
            <li>
              <Link to='/posts'>Posts</Link>
            </li>
            <li>
              <Link to='/scholarshipscrap'>Scholarship Scrap</Link>
            </li>
         

          </ul>
          <div className='start'>
            <div className='button'>GET CONNECTED</div>
          </div>
          <button className='toggle' onClick={() => setClick(!click)}>
            {click ? <i className='fa fa-times'> </i> : <i className='fa fa-bars'></i>}
          </button>
        </nav>
      </header>
    </>
  )
}

export default AdminHeader
