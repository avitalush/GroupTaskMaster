
import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/userContext';
//import Card from 'react-bootstrap/Card';
import { Button , Card} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Delete, Edit,Task } from '@mui/icons-material';
import { ProjectContext } from '../../context/projectCOntext';
import '../../style/project.css'

export default function SingleProject( {project} ) {
const {deleteById}=useContext(ProjectContext)
    const participantsCount = project.users.length;
  const navigate=useNavigate();
const handleClick=(e)=>{
    navigate(`/project/${project.id}`)
 
}
const handleDelete=async()=>{
  console.log("iiiiiiiii");
  const {data}=await deleteById(project.id);
  console.log(data);
  
}
const handleEdit=()=>{
  navigate(`/editproject/${project.id}`)

}

  return (
    <Card  
      style={{
        boxShadow: `3px -5px 3px 3px #d1bbac`,
        position: 'relative',
      }}
      id="cardcss" 
    >

      {/* ${project.color} */}
      <Card.Body style={{ textAlign: 'center' }} className='kalam-light '>
        <Card.Title style={{ fontSize: '1.5em', marginBottom: '10px' }}>
          {project.name}
        </Card.Title>
        <Card.Text style={{ fontSize: '1.2em', marginBottom: '20px' }}>
          Participants: {participantsCount}
          <p style={{ background:`${project.color}` }} className='kalam-bold'>color: ${project.color}</p>
        </Card.Text>
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '10px',
          }}
        >
          <Delete style={{ fontSize: '1.5em' }} onClick={handleDelete} />
          <Edit style={{ fontSize: '1.5em' }} onClick={handleEdit} />
          <Task style={{ fontSize: '1.5em' }} onClick={handleClick} />
        </div>
      </Card.Body>
    </Card>
  );
}

