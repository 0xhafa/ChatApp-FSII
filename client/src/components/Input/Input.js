import React from 'react';


const Input = ({ setMessage, sendMessage, message }) => (
  <div className="chat-form-container">
    <form id="chat-form" className="form">
      <input
        className="input"
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
      />
      <button className="btn" onClick={e => sendMessage(e)}><i className="fas fa-paper-plane"></i>Send</button>
    </form>
  </div>
)
  

export default Input;