

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home';
import Document from './Pages/Document';
import LoginSignup from './Pages/LoginSignup';
import SignupLogin from './Pages/SignupLogin';


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

  </Routes>
  <Footer/>
</BrowserRouter>

      
    </div>
  );
}

export default App;
