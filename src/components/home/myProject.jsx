import React from 'react'
import { Button , Card} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Delete, Edit,Task } from '@mui/icons-material';
import { ProjectContext } from '../../context/projectCOntext';

export default function MyProject() {
    const navigate=useNavigate();
    const handleClick=(e)=>{
        navigate(`/project/000`)
     
    }
  return (
    <Card
    onClick={handleClick}
   style={{
     boxShadow: `3px -5px 3px 3px #d1bbac`,
     position: 'relative',
     cursor:"pointer"
   }}
   id="cardcss"
 >
   <Card.Body style={{ textAlign: 'center' }} className='kalam-light'>
     <Card.Title >
       MY PROJECT
     </Card.Title>
   </Card.Body>
 </Card>
  )
}

