
import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/userContext';
//import Card from 'react-bootstrap/Card';
import { Button , Card} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Delete, Edit,Task } from '@mui/icons-material';
import { ProjectContext } from '../../context/projectCOntext';


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
    <Button >
    <Card style={{ backgroundColor: project.color }}>
    <Card.Body>
      <Card.Title>{project.name}</Card.Title>
      <Card.Text>
        Participants: {participantsCount}
      </Card.Text>
      <Delete onClick={handleDelete}/>  <Edit  onClick={handleEdit}/><Task onClick={handleClick}/>
    </Card.Body>
  </Card>
  </Button>
  )
}

