import React, { useContext, useEffect, useRef, useState } from 'react';
import "./EditProgram.css";
import { AuthContext } from '../hook/HuzAuthProvider';
import { useParams } from 'react-router';
import UniEditForm from './UniEditForm';
import PostGardEditForm from './PostGradEditForm';
import CollegeEditForm from './CollegeEditForm';

const EditProgram = () => {
    const [formData, setFormData] = useState({
        lastDateToApply: '',
        maxAge: '',
        maxIncomeLimit: '',
        amountOfScholarship: '',
        durationOfProgram: '',
        targetedRegions: [],
        minQualification: 'UniversityStudentProgram',
        description: '',
        title: '',
        category: 'national',
        eligibilityCriteria: [],
        termsAndConditions: [],
      });

    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleArrayChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value.split(',').map((item) => item.trim()),
        });
      };

      const [error ,setError] = useState("");
      const [successMsg ,setSuccessMsg] = useState("");
  
  
      const ctx = useContext(AuthContext);
      const[isLoading ,setIsLoading] = useState(false);
  
      const {programId} = useParams();
      const formShowRef = useRef();
      
      useEffect(()=>{
    
        const getSinglePostDetails=async()=>{
          try {
            setIsLoading(true);
               const response = await fetch(`http://localhost:8080/user/program/${programId}` , {
                headers :{
                  'Content-Type' : 'application/json'
                }
               });
    
               const responseData = await response.json();
    
               if(response.status===400 || response.status===500 || response.status===422){
                throw new Error(responseData.message);
               }
    
               setFormData(responseData.data);
               console.log(responseData.data);
               setIsLoading(false);
               if(responseData.data.minQualification==="UniversityStudentProgram"){
                 formShowRef.current = <UniEditForm passedForm={responseData.data} setUpliftedForm={(upliftedForm)=>handleUpliftedSubmit(upliftedForm)}/>;
               }

               else if(responseData.data.minQualification==="PostGraduateStudentProgram"){
                formShowRef.current = <PostGardEditForm passedForm={responseData.data} setUpliftedForm={(upliftedForm)=>handleUpliftedSubmit(upliftedForm)}/>;
               }

               else{
                formShowRef.current = <CollegeEditForm passedForm={responseData.data} setUpliftedForm={(upliftedForm)=>handleUpliftedSubmit(upliftedForm)}/>;
               }
    
          } catch (error) {
              setError(error.message)
              setSuccessMsg("");
              setIsLoading(false);
          }
      }
            
        getSinglePostDetails();
    
      },[]);

      const handleUpliftedSubmit=async(upliftedData)=>{

        console.log("uplifted data : ");
        console.log(upliftedData);
        try {
               const response = await fetch(`http://localhost:8080/admin/program/edit/${programId}`, {
                method: 'PATCH',
                headers :{
                  'Content-Type' : 'application/json' ,
                  'Authorization' : `Bearer ${ctx?.user?.token}`
                },
                body: JSON.stringify(upliftedData)
               });

               const responseData = await response.json();

               if(response.status===400 || response.status===500 || response.status===401 || response.status===403){
                throw new Error(responseData.message);
               }
              
               setSuccessMsg(responseData.message);
               setError("");

        } catch (error) {
            setError(error.message);
            setSuccessMsg("");
        }

      }

      const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
               const response = await fetch(`http://localhost:8080/admin/program/edit/${programId}`, {
                method: 'PATCH',
                headers :{
                  'Content-Type' : 'application/json' ,
                  'Authorization' : `Bearer ${ctx?.user?.token}`
                },
                body: JSON.stringify(formData)
               });

               const responseData = await response.json();

               if(response.status===400 || response.status===500 || response.status===401 || response.status===403){
                throw new Error(responseData.message);
               }
              
               setSuccessMsg(responseData.message);

        } catch (error) {
            setError(error.message);
            setSuccessMsg("");
        }

      }
    
      return (
        <div className="form-container">
        
          {isLoading && <p style={{textAlign :"center" ,marginTop:"20px"}}>Loading...</p>}
          
          {formShowRef.current}
          {error!=="" ? <h4 style={{color :"red" , textAlign:"center"}}>{error}</h4>: null}
          {successMsg!=="" ? <h4 style={{color :"green" , textAlign:"center"}}>{successMsg}</h4>: null}
          {/* <h2 style={{textAlign:"center"}}>Update Program</h2>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Last Date To Apply:</label>
              <input
                type="text"
                name="lastDateToApply"
                value={formData.lastDateToApply}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Max Age:</label>
              <input
                type="number"
                name="maxAge"
                value={formData.maxAge}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Max Income Limit:</label>
              <input
                type="number"
                name="maxIncomeLimit"
                value={formData.maxIncomeLimit}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Amount Of Scholarship:</label>
              <input
                type="text"
                name="amountOfScholarship"
                value={formData.amountOfScholarship}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Duration Of Program:</label>
              <input
                type="text"
                name="durationOfProgram"
                value={formData.durationOfProgram}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Targeted Regions (comma-separated):</label>
              <input
                type="text"
                name="targetedRegions"
                value={formData.targetedRegions.join(', ')}
                onChange={handleArrayChange}
              />
            </div>
            <div className="form-group">
          <label>Minimum Qualification:</label>
          <select
            name="minQualification"
            value={formData.minQualification}
            onChange={handleChange}
          >
            <option value="PostGraduateStudentProgram">Post Graduate Student Program</option>
            <option value="CollegeStudentProgram">College Student Program</option>
            <option value="UniversityStudentProgram">University Student Program</option>
          </select>
        </div>
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
          <label>Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="national">National</option>
            <option value="international">International</option>
          </select>
        </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="form-group">
              <label>Eligibility Criteria (comma-separated):</label>
              <input
                type="text"
                name="eligibilityCriteria"
                value={formData.eligibilityCriteria.join(', ')}
                onChange={handleArrayChange}
              />
            </div>
            <div className="form-group">
              <label>Terms And Conditions (comma-separated):</label>
              <input
                type="text"
                name="termsAndConditions"
                value={formData.termsAndConditions.join(', ')}
                onChange={handleArrayChange}
              />
            </div>
            <button type='submit'>Update</button>
            {error!=="" ? <p style={{color:"red"}}>{error}</p> : null}
            {successMsg!=="" ? <p style={{color:"green"}}>{successMsg}</p> : null}
          </form> */}
        </div>
        
      );
};

export default EditProgram;
