
import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/userContext';
//import Card from 'react-bootstrap/Card';
import { Button , Card} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';


export default function SingleProject( {project} ) {

    const participantsCount = project.users.length;
  //  const { users } = useContext(UserContext);
  const navigate=useNavigate();
const handleClick=()=>{
navigate(`/project/${project.id}`)
}
  return (
    <Button onClick={handleClick}>
    <Card style={{ backgroundColor: project.color }}>
    <Card.Body>
      <Card.Title>{project.name}</Card.Title>
      <Card.Text>
        Participants: {participantsCount}
      </Card.Text>
      <Delete/>  <Edit/>
    </Card.Body>
  </Card>
  </Button>
  )
}

