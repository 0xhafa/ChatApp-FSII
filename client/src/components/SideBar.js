import React from 'react';

const SideBar = ({ users, room }) => (
  <div className="chat-sidebar">
    <h2 id="room-name">{room}</h2>
    <h3><i className="fas fa-users"></i> Users</h3>
    <ul id="users">
      {users.map(({name}) => (<li key={name}>{name}</li>))}
    </ul>
  </div>
);

export default SideBar;