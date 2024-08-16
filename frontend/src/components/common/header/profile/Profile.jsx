import React, { useState } from 'react';
import './Profile.css';
import { useContext } from 'react';
import { AuthContext } from '../../../hook/HuzAuthProvider.jsx';
import { useNavigate } from 'react-router';
import LogOutH from '../../../LogOutH.js';
import { Link } from 'react-router-dom';

const Profile = () => {

  const navigate = useNavigate();
  const ctx = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(ctx?.user?.username ? ctx?.user?.username : "no username");
  const [profilePicture, setProfilePicture] = useState(ctx?.user?.imageUrl ? ctx?.user?.imageUrl : null);

  console.log(ctx?.user?.imageUrl);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the submission, e.g., send data to the server

    // For demonstration purposes, log the updated information
    console.log('Updated Name:', name);
    console.log('Updated Profile Picture:', profilePicture);

    // Exit edit mode after submission
    setEditMode(false);
  };

  const navigateToUpdateUser = () => {
    navigate(`/user/${ctx?.user?.userId}`)
  }

  return (
    <div className='Prifile' >
      {ctx?.user?
      <ul>
    <li className='profile-image' onClick={handleEditToggle}>
      {profilePicture !== null ? (
          <img src={ profilePicture} alt="Profile" />
        ) : (
         <h4 className='default-profil'>{name.charAt(0)}</h4>
        )}
         
      {editMode && <ul className= "shw dropdown">
       
        <li><div onClick={navigateToUpdateUser} className="edit-overlay">Edit</div></li>
        <li><LogOutH/></li>
        
      </ul>
      }
    
    </li>
  </ul>: <div className='regis'> <Link to='/register/login'>SignUp</Link> </div>  }
 
    {/* <Logout /><div className="profile-container">
      <div className={`profile-image ${editMode ? 'editable' : ''}`} onClick={handleEditToggle}>
        {profilePicture!==null? (
          <img src={ profilePicture} alt="Profile" />
        ) : (
          <div className="default-profile"></div>
        )}
        {editMode && <div onClick={navigateToUpdateUser} className="edit-overlay">Edit</div>}
      </div> */}

      {/* {editMode && (
        <div className="edit-modal">
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input type="text" value={name} onChange={handleNameChange} />
            </label>
            <br />
            <label>
              Profile Picture:
              <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
            </label>
            <br />
            <button type="submit">Save Changes</button>
          </form>
        </div>
      )} */}
{/* 
      {!editMode && (
        <div className="current-profile-info">
          <p>{name}</p>
        </div>
      )}
    </div> */}
    </div>
  );
};

export default Profile;
