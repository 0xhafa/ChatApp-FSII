import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ room }) => (
  <header className="chat-header">
  <h1><i className="fas fa-comments"/>CryptoChat</h1>   
  <Link to='/'>
    <a id="leave-btn" className="btn">Leave Room</a>
  </Link>
</header>
);

export default Header;