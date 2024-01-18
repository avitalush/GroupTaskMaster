import React, { useState,useEffect, useContext } from 'react';
import { Card, Form, Button, ListGroup, Badge } from 'react-bootstrap';
import { UserContext } from '../../../context/userContext';
import {  Avatar } from "antd";
import { TaskContext } from '../../../context/taskContext';
import { Select, Space } from 'antd';
import './style.css'
const { Option } = Select;
const TaskDetails = ({ task ,project,isAdmin,updateFormData,formData }) => {
    const [note, setnote] = useState('');
  const [notes, setnotes] = useState([]);
  const { findUserById,usersList,currentId} = useContext(UserContext);
  const { addNote,editTask} = useContext(TaskContext);
const [users,setUsers]=useState([isAdmin?project.users:currentId.id])  

const handlenotesubmit = (e) => {
  e.preventDefault();
  if (note.trim() !== '') {
    if(!isAdmin){
      addNote(note,task.id);
    } 
    const newNote = { note: note, own: isAdmin ? "admin" : "user" };
    setnotes((prevNotes) => [...prevNotes, newNote]);

    updateFormData((prevFormData) => ({
      ...prevFormData,
      notes: [...prevFormData.notes, newNote],
    }));

    setnote('');
  }
};

  const getUserById=(id)=>{
   let res= findUserById(id);
 
   return res?.email

  }
  useEffect(() => {
    console.log(isAdmin);
    let c=findUserById(task.id);
    console.log({task});

  }, []); 

  return (
    <Card>
      <Card.Header>
        <h4>{task?.title}</h4>
      </Card.Header>
      <Card.Body>
        <Form.Group className="mb-3"  type="text"
 >
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3}     readOnly={!isAdmin}   placeholder="Description"
  value={formData.description}
  onChange={(e) => updateFormData({ ...formData, description: e.target.value })}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Due Date</Form.Label>
          <Form.Control type="text" value={formData?.date_created}    readOnly={!isAdmin}
onChange={(e) => updateFormData({ ...formData, date_created: e.target.value })}/>

        </Form.Group>

{/*   
        <Form.Group className="mb-3">
  <Form.Label>Assignees</Form.Label>
  <div style={{ position: "relative" }}>
    {project.permissiontoAssociateTasks?(

   
    <Select
      disabled={!isAdmin}
      style={{ width: '100%' }}
      placeholder="Select Assignees"
      value={formData.user}
      onChange={(value) => updateFormData({ ...formData, user: value })}
    >
      {project?.users?.map((user, index) => (
        <Option key={index} value={user}>
          {user.email}
        </Option>
      ))}
    </Select>
     ):(
<Select
  style={{ width: '100%' }}
  placeholder="Select Assignees"
  value={formData.user}
  onChange={(value) => updateFormData({ ...formData, user: value })}
>
  {(project?.users || []).map((user, index) => (
    <Option key={index} value={user}>
      {user.email}
    </Option>
  ))}
</Select>

     )}
  </div>
</Form.Group> */}

  
        <Form.Group className="mb-3">
  <Form.Label>Assignees</Form.Label>
  <div style={{ position: "relative" }}>
    {project.permissiontoAssociateTasks?(

   
    <select
      disabled={!isAdmin}
      class="form-select" aria-label="Default select example"
      placeholder="Select Assignees"
      value={formData.user}
      onChange={(value) => updateFormData({ ...formData, user: value.target.value })}
    >
      {project?.users?.map((user, index) => (
          <option value={user}>{getUserById(user)}</option>
      ))}
    </select>
     ):(
<select
       class="form-select" aria-label="Default select example"

  placeholder="Select Assignees"
  value={formData.user}
  onChange={(value) => updateFormData({ ...formData, user: value.target.value })}
>
  {(project?.users || []).map((user, index) => (
    <option key={index} value={user}>
      {getUserById(user)}-{user}
    </option>
  ))}
</select>

     )}
  </div>
</Form.Group>

<select class="form-select" aria-label="Default select example">

  <option selected>select category</option>
  {project?.categories?.map((user, index) => (
     <option value={index}>{user}</option>
    
  ))}
 
</select>
        <Form.Group className="mb-3">
          <Form.Label>notes</Form.Label>
          <ListGroup>
  {formData.notes.map((note, index) => (
    <ListGroup.Item key={index}>
      {note.own}: {note.note}
    </ListGroup.Item>
  ))}
</ListGroup>


          <Form.Control
            type="text"
            placeholder="Add a note..."
            value={note}
            onChange={(e) => setnote(e.target.value)}
          />
          <Button variant="primary" onClick={handlenotesubmit}>
            Add note
          </Button>
        </Form.Group>
      </Card.Body>
    
    </Card>
  );
};

export default TaskDetails;