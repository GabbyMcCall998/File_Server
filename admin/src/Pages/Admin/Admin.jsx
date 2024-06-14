import Sidebar from '../../Component/Sidebar/Sidebar';
import './Admin.css'
import { Routes,Route } from 'react-router-dom';
import Listfile from '../../Component/Listfile/Listfile';
import Addfile from '../../Component/Addfile/Addfile';

const Admin = () => {
    return (
         <div className="admin">
            <Sidebar/>
            <Routes>
               <Route path='/addfile' element={<Addfile/>}/>
               <Route path='/listfile' element={<Listfile/>}/>
            </Routes>
        </div>
     );
}
 
export default Admin;