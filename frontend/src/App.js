

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home';
import Document from './Pages/Document';
import LoginSignup from './Pages/LoginSignup';
import SignupLogin from './Pages/SignupLogin';
import VerifyEmailPage from './Components/VerifyEmailPage/VerifyEmailPage';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';


function App() {
  return (
    <div>
   <BrowserRouter>
  <Navbar/>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/document' element={<Document/>}/>
      <Route path=':documentId' element={<Document/>}/>
    <Route path='/login' element={<LoginSignup/>}/>
    <Route path='/signup' element={<SignupLogin />} />  
    <Route path='/verify-email/:id/verify/:Vtoken' element={<VerifyEmailPage />} />
    <Route path='/forgot-password' element={<ForgotPassword/>}/>
    <Route path='/reset-password/:id/:token' element={<ResetPassword/>}/>

    </Routes>
  <Footer/>
</BrowserRouter>

      
    </div>
  );
}

export default App;
