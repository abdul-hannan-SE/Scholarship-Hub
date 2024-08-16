// import React, { useState } from "react";
// import {  Link } from "react-router-dom";
// // import axios from "axios"; // Import axios for making HTTP requests
// import "./Loginform.css";

// const Loginform = ({ onLogin }) => {

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async () => {
//     try {
//       // Make HTTP request to your backend for login
//       // const response = await axios.post("http://localhost:8080/auth/login", { email, password });
      
//       // Assuming your response contains isAdmin and isExpert properties
//       // const { isAdmin, isExpert } = response.data;

//       // Simulating login success
//       const isAdmin = true; // Change this based on your response
//       const isExpert = true; // Change this based on your response

//       setError("");
//       onLogin(isAdmin, isExpert); // Notify parent component about successful login and specify the role
//     } catch (error) {
//       setError("Invalid email or password");
//     }
//   };

//   return (
//     <><div className="login-page">
//       <div className="login-container">
//         <h2>Login</h2>
//         {error && <p className="error-message">{error}</p>}
//         <form>
//           <label>Email:</label>
//           <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//           <label>Password:</label>
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         </form>
//         <div className="button-container">
//           <button type="button" onClick={handleLogin}>
//             Login
//           </button>
//         </div>
//         <div className="register-link">
//         <p>If you are not registered, please <Link to="/register/signup">SignUp</Link></p>
//       </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default Loginform;


import React, { useState,} from "react";
import {  Link, useNavigation , useNavigate } from "react-router-dom";
// import axios from "axios"; // Import axios for making HTTP requests
import "./Loginform.css";
import { useAuth } from "../../hook/AuthProvider";
import { AuthContext, useAuthH } from "../../hook/HuzAuthProvider";

import {} from "../../hook/HuzAuthProvider";
import { useContext } from "react";
import { useEffect } from "react";

const Loginform = () => {

  const ctx = useContext(AuthContext);
   const [email , setEmail] = useState("");
   const [password , setPassword] = useState("");
   const [error , setError] = useState("");
   const navigate = useNavigate();

   useEffect(()=>{
     if(ctx?.user?.token) 
     {
      navigate("/");
     }
     
   },[]);

   const handleEmail=(e)=>{
    setEmail(e.target.value);
   }

   const handlePassword=(e)=>{
    setPassword(e.target.value);
   }


  const handleLoginForm=async(e)=>{

    e.preventDefault();
    if(email.trim().length===0 || password.trim().length===0){
      alert("Please enter both username and password ");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/auth/login" ,{
        method : "POST" ,
        headers : {
          'Content-Type': 'application/json'
        } ,
        body : JSON.stringify({
          email : email,
          password : password
        })
       });

       const responseData = await response.json();

       if(response.status===422 || response.status===500 || response.status===400){
        throw new Error(responseData.message);
        }

        console.log(responseData);

        localStorage.setItem("loggedInUser" , JSON.stringify(
          {
            token : responseData?.token,
            userId: responseData?.user?._id,
            imageUrl: responseData?.user?.imageUrl ? responseData?.user?.imageUrl : "null",
            username: responseData?.user?.username ? responseData?.user?.username : "null" ,
            age: responseData.user?.age ? responseData?.user?.age : "null",
            email: responseData?.user?.email,
            role: responseData?.user?.role ,
            region : responseData?.user?.province
          }
        ))

        ctx.setLogin({
          token : responseData?.token,
          userId: responseData?.user?._id,
          imageUrl: responseData?.user?.imageUrl ? responseData?.user?.imageUrl : "null",
          username: responseData?.user?.username ? responseData?.user?.username : "null" ,
          age: responseData.user?.age ? responseData?.user?.age : "null",
          email: responseData?.user?.email,
          role: responseData?.user?.role,
          region : responseData?.user?.province
        });

        console.log("login successfull!");
        setEmail("");
        setPassword("");
        navigate("/");


    } catch (error) {
           setError(error.message);
           console.log(error.message);
    }
  }


  return (
    <><div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLoginForm}>
      <div className="form_control">
        <label htmlFor="user-email">Email:</label>
        <input
          type="email"
          id="user-email"
          name="email"
          placeholder="example@gmail.com"
          value={email}
          onChange={handleEmail}
        />
        <div id="user-email" className="sr-only">
          Please enter a valid username. It must contain at least 6 characters.
        </div>
      </div>
      <div className="form_control">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"

          value={password}
          onChange={handlePassword}
        />
        <div id="user-password" className="sr-only">
          your password should be more than 6 character
        </div>
      </div>
      <button className="submit">Submit</button>

      <h4 style={{color : "red"}}>{error}</h4>
    </form>
        <div className="register-link">
        <p>If you are not registered, please <Link to="/register/signup">SignUp</Link></p>
      </div>
      </div>
    </div>
    </>
  );
};

export default Loginform;
