import React, { useState } from 'react';
import './Navbar.css'; // Import CSS file for styling
import { Link } from 'react-router-dom';
import SearchBar from '../SearchFiles/SearchFiles';

const Navbar = () => {
    const [menu, setMenu] = useState("home"); 

    return (  
        <div className='Navbar'>
            <div className='brand'>
                <p>PaperTrail</p>
            </div>
            <ul className='nav-menu'>
                <li onClick={() => setMenu("home")}>
                    <Link to='/' style={{textDecoration:'none'}}>Home</Link>
                    {menu === "home" && <hr />}
                </li>
                <li onClick={() => setMenu("document")}>
                    <Link to='/document' style={{textDecoration:'none'}}>Document</Link>
                    {menu === "document" && <hr />}
                </li>
            </ul>
                <SearchBar />
            <div className='login-button'>
                {localStorage.getItem('token') ?
                    <button onClick={() => { localStorage.removeItem('token'); window.location.replace("/"); }}>Logout</button>
                    :
                    <Link to='/login'><button>Login</button></Link>
                }
            </div>
        </div>
    );
}

export default Navbar;
