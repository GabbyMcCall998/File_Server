import { Link } from "react-router-dom";
import './SignupLogin.css'





const SignupLogin = () => {
        const handleSubmit = (event) => {
            event.preventDefault();
            // Add logic for handling form submission
          };
  
  
      return ( 
        <div className="leggo">
          <form  onSubmit={handleSubmit}>
          <h3>SignUp Here</h3>
  
          <input type="text" placeholder="Username"   required />
  
          <input type="email" placeholder="Email"   required />
  
          <input type="password" placeholder="Password" required />
  
        <p>Already have an account?<br/>
        <Link to="/login" style={{ textDecoration: 'none' }}>Log In</Link>
        </p>
          
          
          <button type="submit" className="sign">
            Sign Up
          </button>
  
          
          </form>
        </div>
      );
  }

 
export default SignupLogin;