import React, { useState,useEffect, useContext } from 'react';
import { Card, Form, Button, ListGroup, Badge } from 'react-bootstrap';
import { UserContext } from '../../../context/userContext';
import {  Avatar } from "antd";
import { TaskContext } from '../../../context/taskContext';
import { Select } from 'antd';
const { Option } = Select;
const TaskDetails = ({ task ,project,isAdmin,updateFormData,formData }) => {
    const [note, setnote] = useState('');
  const [notes, setnotes] = useState([]);
  const { findUserById,usersList,currentId} = useContext(UserContext);
  const { addNote,editTask} = useContext(TaskContext);
const [users,setUsers]=useState([isAdmin?project.users:currentId.id])  
let idUser=0;
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

  
  useEffect(() => {
    console.log(isAdmin);
    let c=findUserById(task.id);
    console.log(project);

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
</Form.Group>


<Form.Group className="mb-3">
  <Form.Label>Categories</Form.Label>
  <div style={{ position: "relative" }}>
    <Select
       disabled={!isAdmin}
      mode="multiple"
      style={{ width: '100%' }}
      placeholder="Select Categories"
      value={formData.categories}  // Make sure formData.categories is an array
      onChange={(selectedCategories) => updateFormData({ ...formData, categories: selectedCategories })}
    >
      {project?.categories?.map((category, index) => (
        <Option key={index} value={category} readOnly={!isAdmin}>
          {category}
        </Option>
      ))}
    </Select>
  </div>
</Form.Group>

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
