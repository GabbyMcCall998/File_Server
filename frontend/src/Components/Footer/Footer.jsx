import './Footer.css'
import whatsapp from '../images/icons8-whatsapp-144.png'
import instagram from '../images/icons8-instagram-144.png'
import facebook from '../images/icons8-facebook-144.png'


const footer = () => {
    return ( 
        <div className="footer">
            <div className="footer-logo">
            <p>PaperTrail</p>
            </div>
            <ul className='footer-links'>
                <li>Company</li>
                <li>Services</li>
                <li>Offices</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            <div className="footer-social-icon">

                <div className="footer-icon-container">
                <img className="icon" src={whatsapp} alt="whatsapp logo" />
                </div>

                <div className="footer-icon-container">
                <img className="icon" src={instagram} alt="instagram logo" />
                </div>

                <div className="footer-icon-container">
                <img className="icon" src={facebook} alt="facebook logo" />
                </div>

            </div>
            <div className="footer-copyright">
                <hr />
                <p>Copyright @ 2024 - All Right Reserved </p>
            </div>
        </div>
     );
}
 
export default footer;