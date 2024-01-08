import { useContext, useState } from 'react';
import { UserContext } from '../../context/userContext';



const UpImage = ({ handleImage }) => {
  const [imageUpload, setImageUpload] = useState(null);
  const [status, setStatus] = useState(false);
const {handleUpload}=useContext(UserContext)
  const uploadImage = async (e) => {
    setStatus(true)
    e.preventDefault();
    try {
      if (imageUpload === null) return;

      const res=await handleUpload(imageUpload);

        setStatus(false)
        
      

      handleImage(res);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImageUpload(selectedImage);
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} placeholder="upload" />
      {status &&
        <div class="spinner-border text-info fs-1" role="status">
        </div>
      }
      <button className="btn btn-secondary btn-lg btn-block text-info" onClick={uploadImage}>Upload Image</button>
    </div>
  );
};

export default UpImage;