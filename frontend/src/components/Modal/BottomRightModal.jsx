import React, { useContext, useEffect, useState } from 'react';
import './BottomRightModal.css'; // Import CSS file for styling
import { AuthContext } from '../hook/HuzAuthProvider';

const BottomRightModal = () => {

  const [notifications , setNotifications] = useState([]);
  const [error , setError] = useState("");

  const ctx = useContext(AuthContext);

  // const notifications = [
  //   { title: 'New Program Available', description: 'Check out our latest program!' , targetedRegions : ["FATA , Punjab"] },
  //   { title: 'Program Expiring Soon', description: 'Renew your subscription before it expires.' ,  targetedRegions : ["FATA , Punjab"] },
  //   { title: 'Program Expiring Soon', description: 'Renew your subscription before it expires.' ,  targetedRegions : ["FATA , Punjab"] },
  //   { title: 'Program Expiring Soon', description: 'Renew your subscription before it expires.' ,  targetedRegions : ["FATA , Punjab"] },
  //   // Add more notifications as needed
  // ];

  useEffect(()=>{
          
    const getNotificationsByRegion=async()=>{
        try {

              if(!ctx?.user?.token){
                throw new Error("You are not authorized to access this page!");
              }

              const response = await fetch("http://localhost:8080/user/get-notifications" , {
                headers :{
                  'Content-Type' : 'application/json' ,
                  'Authorization' : `Bearer ${ctx?.user?.token}`
                }
              });

              const responseData = await response.json();

              if(response.status===400 || response.status===500 || response.status===401 || response.status===403){
                throw new Error(responseData.message);
              }

              setNotifications(responseData.notifications);
              console.log(responseData.notifications
                );

              if(responseData.notifications.length===0){
                throw new Error("No current notifications to show!");
              }

        } catch (error) {
             setError(error.message);
        }
    }

    getNotificationsByRegion();
  },[ctx?.user?.token]);

  return (
    <div className="bottom-middle-modal">
      
    <h2 className="modal-title">Notifications</h2>
    {error!=="" ? <h4 style={{color:"red"}}>{error}</h4> : null}
    <ul className="notification-list">
      {notifications.length>0 && notifications.map((notification, index) => (
        <li key={index} className="notification-item">
          <h3 className="notification-title">{notification?.related_program?.title}</h3>
          <p className="notification-description">{notification?.related_program?.description}</p>
          {notification.regions && notification.regions.length > 0 && (
            <div className="targeted-regions">
              <h4 className="targeted-regions-title">Targeted Regions</h4>
              <ul className="targeted-regions-list">
                {notification.regions.map((region, regionIndex) => (
                  <li key={regionIndex} className="targeted-region-item">
                    {region}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  </div>
  );
};

export default BottomRightModal;
