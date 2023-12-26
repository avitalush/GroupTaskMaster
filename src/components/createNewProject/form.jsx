import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import UserAssociation from './userAssociation';
import CreateCategory from './createCategory';
import { ChromePicker } from 'react-color';





export default function FormNeaProject() {


    const [color, setColor] = useState('#ffffff'); // Initial color

    const handleChange = (newColor) => {
        setColor(newColor.hex);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form submitted:', formData);
    };


    return (



        <Form onSubmit={handleSubmit}>


            <Form.Group controlId="formFirstName">
                <Form.Label>Project Name: </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter name of your project "
                    name="projectName"
                // value={formData.firstName}
                //onChange={handleChange}
                />

                <div>
                    <h2>Color Picker</h2>
                    <ChromePicker color={color} onChange={handleChange} />
                    <p>Choose a color for your project: {color}</p>
                </div>

            </Form.Group>
            
          
            <CreateCategory></CreateCategory>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}



/*
<Form onSubmit={handleSubmit}>
      <Form.Group controlId="formFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your first name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your last name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter your email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
*/
