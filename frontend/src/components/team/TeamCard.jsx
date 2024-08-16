import React from "react"
import { team } from "../../dummydata"
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Header from "../common/header/Header";

const TeamCard = () => {

  const navigate = useNavigate();

  const [TEAM , setTEAM] = useState([]);
  const [error ,setError] = useState("");

   useEffect(()=>{

    const getAppExperts=async()=>{
      try {
           const response = await fetch("http://localhost:8080/user/get-experts" , {
            headers :{
              'Content-Type' : 'application/json'
            }
           });

           const responseData = await response.json();

           if(response.status===400 || response.status===500 || response.status===422){
            throw new Error(responseData.message);
           }

           setTEAM(responseData.experts);

      } catch (error) {
          setError(error.message)
      }
  }
        
    getAppExperts();

  },[]);

  const navigateToHireScreen=(expertId)=>{
    navigate(`/expert/${expertId}`)
  }

  return (
    <>
      
       {error!== "" ? <h4 >{error }</h4> : null}
      {TEAM.length>0 && TEAM.map((val) => (
        <div className='items shadow' style={{display:"flex" , flexDirection:"column" , alignItems:"center"}} key={val._id}>
          <div className='img'>
            <img src={team[0].cover} alt='' />
            {/* <div className='overlay'>
              <i className='fab fa-facebook-f icon'></i>
              <i className='fab fa-twitter icon'></i>
              <i className='fab fa-instagram icon'></i>
              <i className='fab fa-tiktok icon'></i>
            </div> */}
          </div>
          <div className='details'>
            <h2>{val.username}</h2>
            <p>{val.email}</p>
            <p id="payment">Payment Amount: 10$</p>
          </div>

          <button onClick={()=>navigateToHireScreen(val._id)} className='btn'>Hire Him</button>
          
        </div>
      ))} 
      
    </>
  )
}

export default TeamCard
