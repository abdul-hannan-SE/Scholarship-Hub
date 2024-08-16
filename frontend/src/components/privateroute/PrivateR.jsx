import React, { useEffect } from 'react'
import { useNavigate,  } from 'react-router-dom'

function PrivateR(props) {
  const { Component}=props;
  const navigate=useNavigate();
  useEffect(()=>{
    // const login=localStorage.getItem('user-token');
    if (JSON.parse(!localStorage.getItem('loggedInUser'))) {
      navigate('/register/login');
    }else{
      navigate('/eligibility');
    }
  },[])
  return (
    <Component/>
  )
}

export default PrivateR