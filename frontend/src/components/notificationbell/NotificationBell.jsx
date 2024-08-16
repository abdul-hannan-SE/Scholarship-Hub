import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import "./NotificationBell.css";
import { useContext } from "react";
import { AuthContext } from "../hook/HuzAuthProvider";
import BottomRightModal from "../Modal/BottomRightModal";

const NotificationBell = () => {
  const [modalOpened , setModalOpened] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(false);
  const ctx = useContext(AuthContext);

  useEffect(() => {
      ctx?.socketRef.on("receive-noti", (notification) => {
        console.log(notification);
        if(notification.targetedRegions.includes(ctx?.user?.region)){
          setHasNotifications(true);
        }
      });
  }, [ctx.socketRef]);


  const handleModal=()=>{
    setModalOpened(!modalOpened);
    setHasNotifications(false);
  }

  return (
    <>
        <button onClick={handleModal} className="bell-icon-button">
          <FontAwesomeIcon icon={faBell} />
          {hasNotifications && <span className="notification-dot"></span>}
        </button>
    
      {modalOpened ?  <BottomRightModal/> : null}
    </>
  );
};

export default NotificationBell;
