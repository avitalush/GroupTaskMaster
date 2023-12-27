
import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/userConrext';
//import Card from 'react-bootstrap/Card';
import { Button , Card} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


export default function SingleProject( {project} ) {

    const participantsCount = project.usersRef.length;
  //  const { users } = useContext(UserContext);
  const navigate=useNavigate();
const handleClick=()=>{
navigate('/project/33')
}
  return (
    <Button onClick={handleClick}>
    <Card style={{ backgroundColor: project.color }}>
    <Card.Body>
      <Card.Title>{project.name}</Card.Title>
      <Card.Text>
        Participants: {participantsCount}
      </Card.Text>
    </Card.Body>
  </Card>
  </Button>
  )
}

