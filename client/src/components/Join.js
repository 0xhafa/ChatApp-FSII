import React, { useState } from 'react';
import { Link } from "react-router-dom";

export default function SignIn() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div>
    <div className="join-container">
			<header className="join-header">
				<h1><i className="fab fa-bitcoin"></i> CryptoChat</h1>
			</header>
			<main className="join-main">
				<form action="chat.html">
					<div className="form-control">
						<label htmlFor="username">Username</label>
						<input
							type="text"
							name="username"
							id="username"
							placeholder="Enter username..."
              onChange={(event) => setName(event.target.value)}
							required
						/>
					</div>
        <div className="form-control">
						<label htmlFor="room">Room</label>
						<div className="select-index">
							<select name="room" id="room" defaultValue="" onChange={(event) => setRoom(event.target.value)}>
                <option value="" disabled>Select room</option>
                <option value="Bitcoin" >Bitcoin</option>
                <option value="Ethereum">Ethereum</option>
                <option value="DeFi">DeFi</option>
                <option value="Hyperledger">Hyperledger</option>
						  </select>
					    </div>	
					</div>
        <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
          <button type="submit" className="btn">Join Chat</button>
        </Link>
        </form>
			</main>
		</div>
    </div>
  );
}
