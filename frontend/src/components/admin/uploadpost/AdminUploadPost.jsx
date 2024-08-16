import React, { useState } from 'react';
import Option1Form from './Option1Form';
import Option2Form from './Option2Form';
import Option3Form from './Option3Form';
import Option4Form from './Option4Form';
import "./Form.css"

const AdminUploadPost = () => {
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
      <h1 className="admin-upload-post-title">Upload Post</h1>
      <div className="admin-upload-post-select-wrapper">
        <select
          value={selection}
          onChange={(e)=> setSelection(e.target.value)}
        >
          <option value="option1">Pre_College_Program</option>
          <option value="option2">Post_College_Program</option>
          <option value="option3">Under_Graduate_Program</option>
          <option value="option4">Post_Graduate_Program</option>
        </select>
      </div>
      <div className="admin-upload-post-form-container">
        {renderForm()}
      </div>
    </div>
    </div>
  );
};

export default AdminUploadPost;
