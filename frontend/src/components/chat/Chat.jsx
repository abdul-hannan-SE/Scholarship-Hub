// ChatComponent.js

import React, { useContext, useEffect, useState } from 'react';
import './Chat.css'; // Import external CSS file
import { AuthContext } from '../hook/HuzAuthProvider';

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [convos , setConvos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [error , setError] = useState("");
  const [sendMsgError , setSendMsgError] = useState("");

  const ctx = useContext(AuthContext);

  useEffect(()=>{
        ctx?.socketRef?.on("receive-message" , (message)=>{
            setMessages((prev)=>[...prev , message]);
        });
  },[ctx?.socketRef])

  useEffect(()=>{
      
    const getAllConversations=async()=>{
            try {

              if(!ctx?.user ){
                throw new Error("You are not authorized to access this page!");
                
              }
                 const response = await fetch(`http://localhost:8080/chat/convos/all/${ctx?.user?.userId}` ,{
                  headers :{
                    'Content-Type' : 'application/json' ,
                    'Authorization' : `Bearer ${ctx?.user?.token}`
                  }
                 });

                 const responseData = await response.json();
                 
                 if(response.status===400 || response.status===500 || response.status===401 || response.status===403){
                  throw new Error(responseData.message);
                 }

                 if(responseData.chatList.length===0){
                  throw new Error("You have not hired any expert to begin chat!");
                 }

                 
                setConvos(responseData.chatList);
                setError("");
                setSendMsgError("");
            } catch (error) {
              setError(error.message);
            }
    };

    getAllConversations();
  },[]);

  // const users = [
  //   { name: 'Mr.Hanan', avatar: 'https://www.w3schools.com/howto/img_avatar.png' },
  //   { name: 'Mr.Kashif', avatar: 'https://www.w3schools.com/howto/img_avatar.png' },
  //   { name: 'Mr.Manan', avatar: 'https://www.w3schools.com/howto/img_avatar.png' }
  // ];  

  const handleUserClick = async(user) => {
    setSelectedUser(user);

      try {
           const response = await fetch(`http://localhost:8080/chat/${ctx?.user?.userId}/${user?._id}` ,{
            headers :{
              'Content-Type' : 'application/json' ,
              'Authorization' : `Bearer ${ctx?.user?.token}`
            }
           });

           const responseData = await response.json();
           
           if(response.status===400 || response.status===500 || response.status===401 || response.status===403){
            throw new Error(responseData.message);
           }

           
          setMessages(responseData.messages);
          setError("");
          setSendMsgError("");
      } catch (error) {
        setError(error.message);
      }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async() => {
    if (inputValue.trim() === '') {
        setSendMsgError("Please enter a message");
        return;
    }

    setMessages((prev)=>{
      return [...prev , { sender: ctx?.user?.userId,receiver : selectedUser._id,text : inputValue }]
     });

    try {
          const response = await fetch(`http://localhost:8080/chat/message/send` ,{
            method : 'POST',
            headers :{
              'Content-Type' : 'application/json' ,
              'Authorization' : `Bearer ${ctx?.user?.token}`
            } ,
            body : JSON.stringify({
              senderId : ctx?.user?.userId,
              receiverId : selectedUser._id,
              text : inputValue
            })
           });

           const responseData = await response.json();

           if(response.status===400 || response.status===500 || response.status===401 || response.status===403){
            throw new Error(responseData.message);
           }
            
           ctx.socketRef.emit("send-message" , {sender: ctx?.user?.userId , receiver : selectedUser._id , text : inputValue});
           setInputValue(''); 
           setError("");
           setSendMsgError("");
    } catch (error) {
             setSendMsgError(error.message);
    }

  };

  return (
    <div className="chat-container">
      <div className="user-list">
        <h2>Chat Penal</h2>
        {error!=="" ? <h4 style={{color:"red"}}>{error}</h4>: null}
        <ul>
          {convos.length>0 && convos.map((convo, index) => (
            <li key={index} onClick={() => handleUserClick(convo.sender?._id===ctx?.user?.userId ? convo.receiver : convo.sender )}>
              <img src={convo.sender?._id===ctx?.user?.userId ? convo?.receiver?.imageUrl : convo?.sender?.imageUrl} alt={convo?.sender?._id===ctx?.user?.userId ? convo?.reciever?.username : convo?.sender?.username} className="avatar" />
              <span>{convo.sender?._id===ctx?.user?.userId ? convo?.receiver?.username : convo?.sender?.username}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-window">
        <div className="chat-header">
          <h2>{selectedUser ? `Chat with ${selectedUser?.username}` : 'Select a chat'}</h2>
        </div>
        <div className="message-container">
          {selectedUser && (
            <div className="messages">
              {messages.map((message, index) => (
                <div key={index} className={message.sender === ctx?.user?.userId ? 'sent' : 'received'}>
                  {message.text}
                </div>
              ))}
            </div>
          )}
        </div>
        {selectedUser && (
          <div className="input-container">
            <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Type a message" />
            <button onClick={handleSendMessage} >Send</button>
            {sendMsgError!=="" ? <h4 style={{color:"red"}}>{sendMsgError}</h4>: null}
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;



// // Chat.js
// import React, { useState } from "react";
// import "./Chat.css"



// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");

//   const handleSendMessage = () => {
//     if (newMessage.trim() === "") {
//       return;
//     }

//     const updatedMessages = [...messages, { text: newMessage, sender: "user" }];
//     setMessages(updatedMessages);
//     setNewMessage("");
//   };

//   return (
//     <>
//     <div className="chat-container">
//           <div className="chat-messages">
//               {messages.map((message, index) => (
//                   <div key={index} className={`message ${message.sender}`}>
//                       {message.text}
//                   </div>
//               ))}
//           </div>
//           <div className="chat-input">
//               <input
//                   type="text"
//                   value={newMessage}
//                   onChange={(e) => setNewMessage(e.target.value)}
//                   placeholder="Type your message..." />
//               <button onClick={handleSendMessage}>Send</button>
//           </div>
//       </div>
     
      
//       </>
//   );
// };

// export default Chat;
