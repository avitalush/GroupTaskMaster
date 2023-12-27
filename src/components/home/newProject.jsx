
import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/userConrext';
//import Card from 'react-bootstrap/Card';
import { Button , Card} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


export default function NewProject(  ) {

  const navigate=useNavigate();
const handleClick=()=>{
navigate('/newproject')
}
  return (
    <Button onClick={handleClick}>
    <Card style={{ backgroundColor: "white" }}>
    <Card.Body>
      <Card.Title>create new project</Card.Title>
      <Card.Text>
        Participants: 0
      </Card.Text>
    </Card.Body>
  </Card>
  </Button>
  )
}

