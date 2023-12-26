
import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/userConrext';
//import Card from 'react-bootstrap/Card';
import { Button , Card} from 'react-bootstrap';


export default function SingleProject( {project} ) {

    const participantsCount = project.usersRef.length;
  //  const { users } = useContext(UserContext);

//מקבל פרוייקט מסויים מקומפוננטת האב וכן את רשימת היוזרים מהקונטקסט ומציג בCARD את פרטי הפרוייקט

  return (
    <Button>
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

