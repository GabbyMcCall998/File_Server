import React, { useState, useEffect } from 'react';
import './Navbar.css'; // Import CSS file for styling
import { Link } from 'react-router-dom';
import SearchBar from '../SearchFiles/SearchFiles';

const Navbar = () => {
    const [menu, setMenu] = useState("home");
    const [isAdmin, setIsAdmin] = useState(false); // State to track admin status

    useEffect(() => {
        // Check if user is admin based on role in localStorage
        const role = localStorage.getItem('role');
        if (role === 'admin') {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, []);

    return (
        <div className='Navbar'>
            <div className='brand'>
                <p className='trail'>PaperTrail</p>
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
            {isAdmin && localStorage.getItem('token') &&  <Link to='/admin' ><button >Dashboard</button></Link>}
        </div>
    );
}

export default Navbar;
