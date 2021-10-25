import React from 'react';

const Message = ({ message: { text, user, time }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
          <div className= 'my-message'>
              <p className= 'meta'><span>{time}</span></p><p className='text'><strong>{trimmedName}: </strong>{text}</p>
          </div>
        ) :
        (
          <div className= 'message'>
              <p className= 'meta'><span>{time}</span></p><p className='text'><strong>{user}: </strong>{text}</p>
          </div>
        )
  ) 
}

export default Message;