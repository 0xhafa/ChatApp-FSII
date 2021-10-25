import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import SideBar from '../SideBar/SideBar';
import Messages from '../Messages/Messages';
import Header from '../Header/Header';
import Input from '../Input/Input';


const ENDPOINT = 'localhost:5000';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);
  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
}, []);

useEffect(()=>{    
  return ()=>{
    socket.close();
  }
},[])

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
    <div className="chat-container">
      <Header />
      <main className="chat-main">
          <SideBar users={users} room={room}/>
          <Messages messages={messages} name={name} />
      </main>
      <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
    </div>
  );
}

export default Chat;
