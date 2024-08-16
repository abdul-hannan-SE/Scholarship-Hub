import React, { useContext, useEffect, useState } from 'react';
import './ManageUsers.css';
import { AuthContext } from '../hook/HuzAuthProvider';

const ManageUsers = () => {
  const[error , setError] = useState("");
  const [users, setUsers] = useState([
    // { id: 1, name: 'John Doe', role: 'User' },
    // { id: 2, name: 'Jane Smith', role: 'Expert' },
    // { id: 1, name: 'John Doe', role: 'User' },
    // { id: 2, name: 'Jane Smith', role: 'Expert' },
    // { id: 1, name: 'John Doe', role: 'User' },
    // { id: 2, name: 'Jane Smith', role: 'Expert' },
    // { id: 1, name: 'John Doe', role: 'User' },
    // { id: 2, name: 'Jane Smith', role: 'Expert' },
    // // Add more user and expert data as needed
  ]);

  const ctx = useContext(AuthContext);

  useEffect(()=>{
      
    const getAllUsers=async()=>{
            try {

              if(!ctx?.user ){
                throw new Error("You are not authorized to access this page!");
                
              }
                 const response = await fetch(`http://localhost:8080/admin/all-users` ,{
                  headers :{
                    'Content-Type' : 'application/json' ,
                    'Authorization' : `Bearer ${ctx?.user?.token}`
                  }
                 });

                 const responseData = await response.json();
                 
                 if(response.status===400 || response.status===500 || response.status===401 || response.status===403){
                  throw new Error(responseData.message);
                 }

                 if(responseData.users.length===0){
                  throw new Error("Currently there are no users in your app!");
                 }

                   setUsers(responseData.users);
                setError("");
            } catch (error) {
              setError(error.message);
            }
    };

    getAllUsers();
  },[]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = async(userId) => {
       try {
          const response = await fetch(`http://localhost:8080/admin/delete-user/${userId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${ctx?.user?.token}`
            }
          });

          const responseData = await response.json();

          if (response.status === 400 || response.status === 500 || response.status === 401 || response.status === 403) {
            throw new Error(responseData.message);
          }
 
          setUsers((prev) => {
            return prev.filter((user) => user._id!== userId);
          });

          setError("");

       } catch (error) {
          setError(error.message);
       }
  };

  const filteredUsers = users.filter((user) =>
    user?.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="manage-users-container">
      <h2>Manage Users</h2>
      <input className='search'
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {error!=="" ? <h4 style={{color:"red"}}>{error}</h4> : null}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length>0 && filteredUsers.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <button className='delete' onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
