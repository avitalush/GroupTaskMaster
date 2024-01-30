
import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/userContext';
//import Card from 'react-bootstrap/Card';
import { Button , Card} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../style/project.css'


export default function NewProject(  ) {

  const navigate=useNavigate();
const handleClick=()=>{
navigate('/newproject')
}
  return (
    <Card
    onClick={handleClick}
   style={{
     boxShadow: `3px -5px 5px 3px #d1bbac`,
     position: 'relative',
     cursor:"pointer"
   }}
   id="cardcss"
 >
   <Card.Body style={{ textAlign: 'center' }}>
     <Card.Title  className='kalam-light'>
       CREATE NEW PROJECT
     </Card.Title>
   </Card.Body>
 </Card>

  )
}

