import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { UserContext } from '../../context/userContext';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
  } from '@mui/material';


const Chat = ({ selectedUser , selectedProject, isOpen, handleClose}) => {//קבלת הפרוייקט הנוכחי והמשתמש איתו רוצים לפתוח צ'אט

const { users, currentId,updateUserId } = useContext(UserContext);//קבלת משתמש נוכחי
 const currentUser=currentId?.id
 const receiver= selectedUser.id;
 const nameCurrenUser=currentId?.name;
 const nameReceiver= selectedUser.name;
 //const nameReceiver = users.find(user => user.id === receiver)?.name || '';


    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [chatHistory, setChatHistory] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    
    const combinedString = currentUser + receiver + selectedProject;
    const idRoom = combinedString.split('').sort().join('');
        

    useEffect(() => {
        setMessages([]);
        console.log(currentId);
        
        const storedUserData = localStorage.getItem('token');
        if (storedUserData) {

         const newSocket = io('http://localhost:1200');
          
         newSocket.emit('openChat', { currentUser, receiver, selectedProject ,idRoom});//פתיחת צ'אט עם משתמש מסויים    
           
        newSocket.on('newMessage', ( data) => {//האזנה להודעות שנשלחו
                setMessages((prevMessages) => [...prevMessages, data]);

            });
            newSocket.on('chatHistory', ({ messages }) => {
                setChatHistory(messages);
              });

  

            

            setSocket(newSocket);  
             
            return () => newSocket.disconnect();
        }

    }, [idRoom]);


    

    const sendMessage = () => {
        if (socket && newMessage.trim() !== '') {
            // שליחת הודעה דרך ה-socket
            socket.emit('chat', {
                sender:  currentUser , //השולח
                receiver: receiver , // ממוען
                message: newMessage,//ההודעה
                idRoom: idRoom//החדר
            });

            // ניקוי שדה ההודעה
            setNewMessage('');
        }
    };

    return (

        <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>צ'אט עם {nameReceiver}</DialogTitle>
        <DialogContent>
          {chatHistory.map((msg, index) => (
            <div key={index} style={{ color: msg.sender === currentUser ? 'blue' : 'gray' }}>
              <strong>{msg.sender === currentUser ? 'you' : nameReceiver}:</strong> {msg.content}
            </div>
          ))}
          {messages.map((msg, index) => (
            <div key={index} style={{ color: msg.sender === currentUser ? 'blue' : 'gray' }}>
              <strong>{msg.sender === currentUser ? 'you' : nameReceiver}:</strong> {msg.message}
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <TextField
            label="new massege"
            variant="outlined"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button onClick={sendMessage} variant="contained" color="primary">
            send
          </Button>
          <Button onClick={handleClose} variant="contained" color="secondary">
            close
          </Button>
        </DialogActions>
      </Dialog>
    //     <div>
    //         <div>
    //             {chatHistory.map((msg, index) => (
    //                     <div key={index} style={{ color: msg.sender === currentUser ? 'blue' : 'gray' }}>
    //                     <strong>{msg.sender === currentUser ? 'you' : nameReceiver}:</strong> {msg.content}
    //                   </div>
    //             ))}
    //         </div>
    //         <div>
    //             {messages.map((msg, index) => (
    //                     <div key={index} style={{ color: msg.sender === currentUser ? 'blue' : 'gray' }}>
    //                     <strong>{msg.sender === currentUser ? 'you' : nameReceiver}:</strong> {msg.message}
    //                   </div>
    //             ))}
    //         </div>
    //         <div>
    //    {/*          <input
    //                 type="text"
    //                 value={newMessage}
    //                 onChange={(e) => setNewMessage(e.target.value)}
    //             /> */}
    //                     <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />

    //             <button onClick={sendMessage}>Send</button>
    //         </div>
            
    //     </div>

    );
};

export default Chat;





    /*   useEffect(() => {
        // יצירת החיבור ל-socket
        const newSocket = io('http://localhost:1200'); // אנא החלף לכתובת השרת שלך
    
        // הגדרת האזנה להודעות
        newSocket.on('private chat', (data) => {
          setMessages((prevMessages) => [...prevMessages, data]);
        }); */

    //  setSocket(newSocket);

    // הפעלה של useEffect על פי רכיב רק לפני השמדה
    /*     return () => newSocket.disconnect();
      }, []); */

    /* 
    useEffect(() => {
  // מבצעים פעולות רק פעם אחת כאשר הקומפוננטה נטענת
  const storedUserData = localStorage.getItem('User'); // משיכת המידע מה-Local Storage

  if (storedUserData) {
    // המרת המחרוזת לאובייקט
    const parsedUserData = JSON.parse(storedUserData);
    // הגעת ל-ID וקביעתו במשתנה state
    setUserId(parsedUserData.id);
  }
}, []);
  */
