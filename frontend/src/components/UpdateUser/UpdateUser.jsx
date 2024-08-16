import React, { useContext, useEffect, useState } from 'react';
import './UpdateUser.css'; // Import CSS file
import { AuthContext } from '../hook/HuzAuthProvider';

const UpdateUser = () => {
    
    const ctx = useContext(AuthContext);
    const [error, setError] = useState("");
    const[successMsg ,setSuccessMsg] = useState("");
    const[successMsgPfp , setSuccessMsgPfp] = useState("");
    const [errorMsgPfp , setErrorMsgPfp] = useState("");


const[IMAGE , setIMAGE] = useState();

  const [user, setUser] = useState({
    username: '',
    age: 20,
    // email: '',
    password: '',
    province: '',
    hasOtherScholarship: true,
    monthlyIncome: 2000,
    role: 'PostGraduateStudent',
    __t: 'PostGraduateStudent',
    cgpa: 3.52
  });

  useEffect(()=>{
     
    const getMyCurrentDetails=async()=>{
          try {
               const response = await fetch("http://localhost:8080/user/my-details" , {
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${ctx?.user?.token}`
                }
               });

               const responseData = await response.json();

               if(response.status===400 || response.status===500 || response.status===401 || response.status===403){
                throw new Error(responseData.message);
               }

               setUser(responseData.user);
               setError("");
          } catch (error) {
             setError(error.message);
             setSuccessMsg("");
          }
    };

    getMyCurrentDetails();
},[]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setUser(prevUser => ({
      ...prevUser,
      [name]: val
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
       try {
            const response = await fetch("http://localhost:8080/user/update-profile-details" , {
                method : "PATCH" ,
                headers :{
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${ctx?.user?.token}`
                } ,
                body : JSON.stringify(user)
            });
            const responseData = await response.json();
            if(response.status===400 || response.status===500 || response.status===401 || response.status===403){
                throw new Error(responseData.message);
            }

            setSuccessMsg(responseData.message);
            setError("");
               
            const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

            localStorage.setItem("loggedInUser" , JSON.stringify(
              {
                token : loggedInUser.token,
                userId: loggedInUser.userId,
                imageUrl: responseData?.user?.imageUrl ? responseData?.user?.imageUrl : "null",
                username: responseData?.user?.username ? responseData?.user?.username : "null" ,
                age: responseData.user?.age ? responseData?.user?.age : "null",
                email: responseData?.user?.email,
                role: responseData?.user?.role ,
                region : responseData?.user?.province
              }
            ))
    
            ctx.setLogin({
              token : loggedInUser.token,
              userId: loggedInUser.userId,
              imageUrl: responseData?.user?.imageUrl ? responseData?.user?.imageUrl : "null",
              username: responseData?.user?.username ? responseData?.user?.username : "null" ,
              age: responseData.user?.age ? responseData?.user?.age : "null",
              email: responseData?.user?.email,
              role: responseData?.user?.role,
              region : responseData?.user?.province
            });

            setUser({
                username: '',
                age: 0,
                // email: '',
                password: '',
                province: '',
                hasOtherScholarship: false,
                monthlyIncome: 0,
                role: '',
                __t: 'PostGraduateStudent',
                cgpa: ""
            });
       } catch (error) {
          setError(error.message);
          setSuccessMsg("");
       }
  };

  const handleUploadProfilePic=async()=>{
    console.log(IMAGE);
    try {
      const formdata = new FormData();
      formdata.append("image" , IMAGE);
         const response = await fetch("http://localhost:8080/user/update-profile-pic" , {
            method : "PATCH" ,
            headers :{
                
                'Authorization' : `Bearer ${ctx?.user?.token}`
            } ,
            body : formdata
        });

        const responseData = await response.json();
        if(response.status===400 || response.status===500 || response.status===401 || response.status===403){
            throw new Error(responseData.message);
        }
        setSuccessMsgPfp(responseData.message);
        setErrorMsgPfp("");

        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

        localStorage.setItem("loggedInUser" , JSON.stringify(
          {
            token : loggedInUser.token,
            userId: loggedInUser.userId,
            imageUrl: responseData?.user?.imageUrl ? responseData?.user?.imageUrl : "null",
            username: responseData?.user?.username ? responseData?.user?.username : "null" ,
            age: responseData.user?.age ? responseData?.user?.age : "null",
            email: responseData?.user?.email,
            role: responseData?.user?.role ,
            region : responseData?.user?.province
          }
        ))

        ctx.setLogin({
          token : loggedInUser.token,
          userId: loggedInUser.userId,
          imageUrl: responseData?.user?.imageUrl ? responseData?.user?.imageUrl : "null",
          username: responseData?.user?.username ? responseData?.user?.username : "null" ,
          age: responseData.user?.age ? responseData?.user?.age : "null",
          email: responseData?.user?.email,
          role: responseData?.user?.role,
          region : responseData?.user?.province
        });

    } catch (error) {
         setErrorMsgPfp(error.message);
         setSuccessMsgPfp("");
    }
  }

  return (
    <div className='bg'>
    <div className="update-user-container">
        {error!=="" && <p style={{color:"red"}}>{error}</p>}
        <h2 >Update Profile Picture </h2>
        <input style={{marginTop:"15px"}} type='file'  onChange={(e)=>setIMAGE(e.target.files[0])} />
        <button onClick={handleUploadProfilePic}>Update</button>
        {successMsgPfp!=="" && <p style={{color:"green"}}>{successMsgPfp}</p> }
        {errorMsgPfp!=="" && <p style={{color:"red"}}>{errorMsgPfp}</p>}
      <h2 style={{marginTop:"25px" , marginBottom:"10px"}}>Update User</h2>
        
      <form  onSubmit={handleSubmit} className="update-user-form">
        <div className="form-group">
          <label>Username:</label>
          <input 
            type="text" 
            name="username" 
            value={user.username} 
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input 
            type="number" 
            name="age" 
            value={user.age} 
            onChange={handleChange} 
          />
        </div>
        {/* <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={user.email} 
            onChange={handleChange} 
          />
        </div> */}
        <div className="form-group">
          <label>Password:</label>
          <input 
            type="password" 
            name="password" 
            value={user.password} 
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label>Province:</label>
          <input 
            type="text" 
            name="province" 
            value={user.province} 
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label>Has Other Scholarship:</label>
          <input 
            type="checkbox" 
            name="hasOtherScholarship" 
            checked={user.hasOtherScholarship} 
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label>Monthly Income:</label>
          <input 
            type="number" 
            name="monthlyIncome" 
            value={user.monthlyIncome} 
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label>Role:</label>
          <select 
            name="role" 
            value={user.role} 
            onChange={handleChange}
          >
            <option value="CollegeStudent">College Student</option>
            <option value="PostGraduateStudent">Post Graduate Student</option>
            <option value="UniversityStudent">University Student</option>
          </select>
        </div>
        <div className="form-group">
          <label>CGPA:</label>
          <input 
            type="number" 
            name="cgpa" 
            value={user.cgpa} 
            onChange={handleChange} 
          />
        </div>
        <button type="submit">Update User</button>
        {successMsg!=="" && <p style={{color:"green"}}>{successMsg}</p> }
      </form>
    </div>
    </div>
  );
};

export default UpdateUser;
