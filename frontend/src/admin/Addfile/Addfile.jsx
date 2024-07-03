import './Addfile.css';
import upload_icon from '../../admin/Assets/icons8-upload-94.png';
import video_icon from '../../admin/Assets/icons8-video-94.png'
import audio_icon from '../../admin/Assets/icons8-audio-100.png'
import document_icon from '../../admin/Assets/icons8-document-94.png'
import { useState, useEffect } from 'react';

const Addfile = () => {
    const [file, setFile] = useState(null);
    const [fileDetails, setFileDetails] = useState({
        title: "",
        category: "",
        description: "",
    });

    const [thumbnail, setThumbnail] = useState(upload_icon);

    const fileHandler = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        if (selectedFile) {
            const fileType = selectedFile.type;

            if (fileType.startsWith('image/')) {
                setThumbnail(URL.createObjectURL(selectedFile));
            } else if (fileType.startsWith('video/')) {
                setThumbnail(video_icon); // Use a placeholder for the video thumbnail
            } else if (fileType.startsWith('audio/')) {
                setThumbnail(audio_icon); // Use a placeholder for audio files
            } else {
                setThumbnail(document_icon); // Use a placeholder for documents
            }
        } else {
            setThumbnail(upload_icon);
        }
    };

    useEffect(() => {
        return () => {
            if (file && file.type.startsWith('image/') && thumbnail !== upload_icon) {
                URL.revokeObjectURL(thumbnail);
            }
        };
    }, [file, thumbnail]);

    const changeHandler = (e) => {
        setFileDetails({ ...fileDetails, [e.target.name]: e.target.value });
    }

    const Add_File = async () => {
        console.log(fileDetails)

        try {
            let formData = new FormData();
            formData.append('file', file);
            formData.append('title', fileDetails.title);
            formData.append('category', fileDetails.category);
            formData.append('description', fileDetails.description);


    
            const uploadResponse = await fetch('http://localhost:5000/api/admin/upload', {
                method: 'POST',
                body: formData,
            });
    
            if (!uploadResponse.ok) {
                throw new Error('Failed to upload file');
            }
    
            const uploadData = await uploadResponse.json();
            console.log('Upload response:', uploadData);
    
            if (uploadData.success) {
                fileDetails.file_download_url = uploadData.file_download_url;
    
                const addFileResponse = await fetch("http://localhost:5000/api/admin/addfile", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body:JSON.stringify({
                        title: fileDetails.title,
                        category: fileDetails.category,
                        description: fileDetails.description,
                        file_download_url: fileDetails.file_download_url,
                        file_path: uploadData.file_path // Make sure uploadData contains file_path
                    }),
                });
    
                if (!addFileResponse.ok) {
                    throw new Error('Failed to add file');
                }
    
                const addFileData = await addFileResponse.json();
                console.log('Add file response:', addFileData);
    
                if (addFileData.success) {
                    alert("File Added");
                } else {
                    alert("Failed to add file");
                }
            }
        } catch (error) {
            console.error('Error:', error);
            alert("An error occurred");
        }
    };
    
    return (
        <div className="add-file">
            <div className="add-file-itemfield">
                <p>File title</p>
                <input value={fileDetails.title} onChange={changeHandler} type="text" className='add-file-itemfield-input' name='title' placeholder='Type here' />
            </div>
            <div className="category">
                <p>File Category</p>
                <select value={fileDetails.category} onChange={changeHandler} name="category" className='add-file-selecter'>
                    <option value="">Select Category</option>
                    <option value="Text">Text</option>
                    <option value="Document">Document</option>
                    <option value="Image">Image</option>
                    <option value="Video">Video</option>
                    <option value="Audio">Audio</option>
                    <option value="Miscellaneous">Miscellaneous</option>
                </select>
            </div>
            <div className="add-file-itemfield">
                <p>Description</p>
                <input
                    value={fileDetails.description}
                    onChange={changeHandler}
                    type="text"
                    className="add-file-itemfield-input"
                    name="description"
                    placeholder="Add a description"
                />
            </div>
            <div className="add-file-itemfield1">
                <label htmlFor="file-input" className='label'>
                    <img src={thumbnail} className='addfile-thumbnail-img' alt="File Thumbnail" />
                </label>
                <input onChange={fileHandler} type="file" name="file" id="file-input" accept=".txt,.pdf,.doc,.docx,.mp3,.mp4,.wav,.avi,.mov,.jpg,.png,.jpeg" hidden />
            </div>
            <button onClick={Add_File} className='addfile-button'>Upload</button>
        </div>
    );
}

export default Addfile;