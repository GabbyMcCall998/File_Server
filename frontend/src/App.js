import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home';
import Document from './Pages/Document';
import LoginSignup from './Pages/LoginSignup';
import SignupLogin from './Pages/SignupLogin';
import VerifyEmailPage from './Components/VerifyEmailPage/VerifyEmailPage';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import SendFileViaEmail from './Pages/SendFileViaEmail';
import SearchResults from './Components/SearchResults/SearchResults';
import Addfile from './admin/Addfile/Addfile';
import Listfile from './admin/Listfile/Listfile';
import AdminSignup from './admin/AdminSignup/AdminSignup';
import Sidebar from './admin/Sidebar/Sidebar';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path=':documentId' element={<Document />} />
          <Route path='/login' element={<LoginSignup />} />
          <Route path='/signup' element={<SignupLogin />} />
          <Route path='/verify-email/:id/verify/:Vtoken' element={<VerifyEmailPage />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password/:id/:token' element={<ResetPassword />} />
          <Route path='/sendfileform/:fileId' element={<SendFileViaEmail />} />
          <Route path='/search' element={<ProtectedRoute><SearchResults/></ProtectedRoute>} />
          <Route path='/document' element={<ProtectedRoute><Document /></ProtectedRoute>} />
          <Route path='/addfile' element={<Addfile />} />
          <Route path='/listfile' element={<Listfile />} />
          <Route path='/admin/signup' element={<AdminSignup />} />
          <Route path='/admin/*' element={<Sidebar/>} /> 
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}


export default App;
