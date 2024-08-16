import React, { useState } from "react"
import { Link } from "react-router-dom"
import Head from "./Head"
import "./header.css"
import { useContext } from "react"
import { AuthContext } from "../../hook/HuzAuthProvider"

const Header = () => {
  const [click, setClick] = useState(false)

  const ctx = useContext(AuthContext);

  return (
    <>
      <Head />
      <header>
        <nav className='flexSB'>
          <ul className={click ? "mobile-nav" : "flexSB "} onClick={() => setClick(false)}>
            <li>
              <Link to='/'>Home</Link>
            </li>
            
            {/* <li>
              <Link to='/program'>Programs</Link>
            </li> */}
            <li>
              <Link to='/about'>About</Link>
            </li>
            <li>
              <Link to='/expert'>Hire An Expert</Link>
            </li>
            { ctx?.user?.token ? 
            <li>
              <Link to='/chat'>Chats with Expert</Link> 
            </li> : "" }
            {/* <li>
              <Link to='/pricing'>Pricing</Link>
            </li> */}
            <li>
              <Link to='/posts'>Posts</Link>
            </li>
            <li>
              <Link to='/contact'>Contact</Link>
            </li>
            { ctx?.user?.token ? 
            <li>
             <Link to='/eligibility'>Check Eligibilty</Link>
            </li>
             : "" }
             
            { ctx?.user?.token ?  " " :
            <li>
            <Link to='/register/login'>Register</Link> 
            </li>
            }

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

export default Header
