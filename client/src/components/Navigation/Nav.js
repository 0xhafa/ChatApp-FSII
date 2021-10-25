import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {

    return (  
        <div className="mongo-links">
            <Link to='/history'>Chat History</Link>
            <Link to='/log'>Log History</Link>
            <Link to='/chat'>Chat Room</Link>
        </div>
    );
}

export default Navigation;