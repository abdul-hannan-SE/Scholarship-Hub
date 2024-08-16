import React, { useEffect } from 'react'
import { useNavigate,  } from 'react-router-dom'

function PrivateE(props) {
  const { Component}=props;
  const navigate=useNavigate();
  useEffect(()=>{
    // const login=localStorage.getItem('user-token');
    if (JSON.parse(!localStorage.getItem('loggedInUser'))) {
      navigate('/register/login');
    }else{
      navigate('/expert');
    }
  },[])
  return (
    <Component/>
  )
}

export default PrivateE