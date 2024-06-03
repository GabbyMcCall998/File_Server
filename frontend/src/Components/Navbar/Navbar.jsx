
import React, { useState } from 'react';
import './Navbar.css'; // Import CSS file for styling
import { Link } from 'react-router-dom';

const Navbar = () => {

    const [menu,setMenu] = useState("Home"); 



    return (  
        <div className='Navbar'>
            <div className='brand'>
                <p>PaperTrail</p>
            </div>
            <ul className='nav-menu'>
                <li onClick={()=>{setMenu("home")}}><Link to='/' style={{textDecoration:'none'}} >Home</Link>{menu==="home"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("document")}}><Link to='/document' style={{textDecoration:'none'}} >Document</Link>{menu==="document"?<hr/>:<></>}</li>
                <div className='search-container'>
                <form  className='search' action="/search" method="get">
                    <div className="search-wrapper">
                    <input  type="text" placeholder="Search..." name="search" />
                    <button type="submit">Search</button>
                    </div>
                </form>
            </div>
            </ul>
            <div className='login-button'>
                <Link to='/login' ><button>Login</button></Link>
            </div>
        </div>
    );
}
export default Navbar;