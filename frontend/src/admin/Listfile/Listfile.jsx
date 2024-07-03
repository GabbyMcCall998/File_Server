import { useEffect, useState } from 'react';
import './Listfile.css';
import remove_icon from '../../admin/Assets/icons8-remove-94.png';

const Listfile = () => {
    const [allFiles, setAllFiles] = useState([]);

    const fetchInfo = async () => {
        const res = await fetch('http://localhost:5000/api/admin/allfiles');
        const data = await res.json();
        setAllFiles(data);
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    const remove_file = async(id)=>{
        await fetch('http://localhost:5000/api/admin/fileremove',{
            method:'POST',
            headers:{
                Accept:'Application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({id:id})
        })
         await fetchInfo()
    }
    return (
        <div className="list-file">
            <h1>All Files List</h1>
            <div className="listfiles-format-main">
                <p>Title</p>
                <p>Category</p>
                <p>Description</p>
                <p>Downloads</p>
                <p>Emails Sent</p>
                <p>Remove</p>
            </div>
            <div className="listfile-allfiles">
                <hr />
                {allFiles.map((doc, index) => {
                    return (
                        <div key={index} className="listfile-format-main-listfile-format">
                            <p>{doc.title}</p>
                            <p>{doc.category}</p>
                            <p>{doc.description}</p>
                            <p>{doc.downloads}</p>
                            <p>{doc.emails_sent}</p>
                            <img onClick={()=>{remove_file(doc.id)}}src={remove_icon} className='listfile-remove-icon' alt="remove" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Listfile;