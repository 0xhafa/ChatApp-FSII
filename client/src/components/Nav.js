import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({name, room}) => {

    return (

        <div className="mongo-links">
            <Link to='/history'>Chat History</Link>
            <Link to='/log'>Log History</Link>
        </div>

    );
}

export default Navigation;