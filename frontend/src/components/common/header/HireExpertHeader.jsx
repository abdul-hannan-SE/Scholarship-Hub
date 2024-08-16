import React, { useState } from "react"
import { Link } from "react-router-dom"
import EHead from "./EHead"
import "./header.css"

const HireExpertHeader = () => {
  const [click, setClick] = useState(false)

  return (
    <>
      <EHead />
      <header>
        <nav className='flexSB'>
          <ul className={click ? "mobile-nav" : "flexSB "} onClick={() => setClick(false)}>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/chat'>Your Users Chats</Link>
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

export default HireExpertHeader
