import './Sidebar.css'
import {Link} from 'react-router-dom'
import addfile_icon from '../../admin/Assets/icons8-add-file-94.png'
import filelist_icon from '../../admin/Assets/icons8-file-folder-94.png'



const Sidebar = () => {
    return ( 
    <div className="sidebar">
        <Link to={'/addfile'} style={{textDecoration:'none'}}>
            <div className="sidebar-item">
                <img src={addfile_icon} alt=''/>
                <p>Add File</p>
            </div>
        </Link>
        <Link to={'/listfile'} style={{textDecoration:'none'}}>
        <div className="sidebar-item">
            <img src={filelist_icon} alt=''/>
            <p>File List</p>
        </div> 
        </Link>
    </div>
 
);
}
 
export default Sidebar;