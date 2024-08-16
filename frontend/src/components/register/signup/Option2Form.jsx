import React, { useState } from 'react';
import "./Form.css"

const Option2Form = () => {
  const [isSuccess , setIsSuccess] = useState(false);
  const [showSubForm1, setShowSubForm1] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    role:'UniversityStudent',
    cgpa:0,
    semester:0,
    image:null,
    username: null,
    age: 20,
    email: null,
    password: null,
    province: "Punjab",
    hasOtherScholarship: false,
    monthlyIncome: 0,
    SSCPercentage: 0,
    HSC_percentage:0
  });
  const [userImage, setUserImage] = useState(null);
  const handleShowSubForm1 = () => {
    setShowSubForm1(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'file') {
      // For file input, update separate state
      setUserImage(e.target.files[0]);
    } else {
      // For other inputs, update form data
      setFormData(prevState => ({
        ...prevState,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Send form data to backend
    const apiData = new FormData();
    // Append each form field to FormData object
    for (const key in formData) {
      apiData.append(key, formData[key]);
    }
    if (userImage) {
      apiData.append('user_image', userImage);
      console.log(' test image' ,userImage);
    }
    const url = "http://localhost:8080/auth/register";
    fetch(url, {
      method: "POST",
      body: apiData,
    })
      .then(response => {
        if (response.ok) {
          // Handle success
          console.log('Form data submitted successfully');
          setIsSuccess(true);
        } else {
          // Handle errors
          console.error('Error submitting form data');
        }
      })
      .catch(error => {
        console.error('Error submitting form data:', error);
      })
      .finally(() => {
        setIsSubmitting(false);
        
        
      });
  };

  return (
    <form className='admin-upload-post-container text-center' onSubmit={handleSubmit}>
      <button className='button-blue button-auto-width button-height button-rounded' type="button" onClick={handleShowSubForm1}>Post_College_Form</button>
      {showSubForm1 && <SubForm1 formData={formData} handleChange={handleChange} isSuccess={isSuccess} />}

      <br className='margin-top-16' />
      <button className='button-green button-auto-width button-height button-rounded' type="submit">
        {isSubmitting ? "submitting..." : "submit"}
      </button>
    </form>
  );
};

const SubForm1 = ({ formData, handleChange , isSuccess }) => {



  return (
    <div className='admin-form-container' style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', textAlign: "left" }}>
      <label className='admin-form-label'>
        Image:
        <input className='admin-form-input' type="file" accept="image/*" name="user_image" onChange={handleChange} />
      </label>
      <br />
      <label className='admin-form-label'>
        Username:
        <input className='admin-form-input' type="text" name="username" value={formData.username} onChange={handleChange} required />
      </label>
      <br />
      <label className='admin-form-label'>
        Age:
        <input className='admin-form-input' type="number" name="age" value={formData.age} onChange={handleChange} required />
      </label>
      <br />
      <label className='admin-form-label'>
        Email:
        <input className='admin-form-input' type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>
      <br />
      <label className='admin-form-label'>
        Password:
        <input className='admin-form-input' type="password" name="password" value={formData.password} onChange={handleChange} required />
      </label>
      <br />
      <label className='admin-form-label'>
        Province:
        <input className='admin-form-input' type="text" name="province" value={formData.province} onChange={handleChange} required />
      </label>
      <br />
      <label className='admin-form-label'>
        Has Other Scholarship:
        <input className='admin-form-checkbox' type="checkbox" name="hasOtherScholarship" checked={formData.hasOtherScholarship} onChange={handleChange} />
      </label>
      <br />
      <label className='admin-form-label'>
        Monthly Income:
        <input className='admin-form-input' type="number" name="monthlyIncome" value={formData.monthlyIncome} onChange={handleChange} required />
      </label>
      <br />
      <label className='admin-form-label'>
        SSC Percentage:
        <input className='admin-form-input' type="number" name="SSC_prcntg" value={formData.SSC_prcntg} onChange={handleChange} required />
      </label>
      <br />
      <label className='admin-form-label'>
        HSC Percentage:
        <input className='admin-form-input' type="number" name="HSC_prcntg" value={formData.HSC_prcntg} onChange={handleChange} required />
      </label>
      <br />
      {isSuccess ?(
      <div className="success-message">Form submitted successfully</div>
    ) :
    ( <div className="success-message">Form is not submitted successfully</div>) }
    </div>
  );
};




export default Option2Form;
