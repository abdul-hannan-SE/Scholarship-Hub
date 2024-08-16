// Register.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Option1Form from './Option1Form';
import Option2Form from './Option2Form';
import Option3Form from './Option3Form';
import Option4Form from './Option4Form';
import './Form.css'

const SignUp = () => {
  const [selection, setSelection] = useState('option1'); // Default selection

  const renderForm = () => {
    switch (selection) {
      case 'option1':
        return <Option1Form />;
      case 'option2':
        return <Option2Form />;
      case 'option3':
        return <Option3Form />;
      case 'option4':
        return <Option4Form />;
      default:
        return null;
    }
  };
  
  return (
   
<div className='bg-image'>
<div className="admin-upload-post-container">
      <h1 className="admin-upload-post-title">SignUp_Form</h1>
      <div className="admin-upload-post-select-wrapper">
        <select
          value={selection}
          onChange={(e) => setSelection(e.target.value)}
        >
          <option value="option1">Pre_College_Student</option>
          <option value="option2">Post_College_Student</option>
          <option value="option3">Under_Graduate_Student</option>
          <option value="option4">Post_Graduate_Student</option>
        </select>
      </div>
      <div className="admin-upload-post-form-container">
        {renderForm()}
        <div className="register-link">
        <p>If you are registered, please <Link to="/register/login">Login</Link></p>
      </div>
      </div>
     
    </div>
</div>
   
    
  );
};

export default SignUp;
