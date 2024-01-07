// import React, { useEffect, useState } from 'react'

// export default function CreateCategory() {
//     // const [category, setCategory] = [];


//     const typeProject = [
//         {
//             id: '111',
//             name: "develope"
//         },
//         {
//             id: '222',
//             name: "math"
//         },
//         {
//             id: '333',
//             name: "architecture"
//         }
//     ];
//     const handleSelectChange = (e) => {
//         console.log(e.value)
//     };

//     return (
//         <div>
//             <Form.Control as="select" onChange={handleSelectChange}>
//                 <option value="">select type of Project</option>
//                 {typeProject.map((project, index) => (
//                     <option key={index} value={project.name}>
//                         {project.name}
//                     </option>
//                 ))}
//             </Form.Control>
//         </div>
//     )
// }

import React from 'react'
import { Form } from 'react-bootstrap';

    // const [category, setCategory] = [];


    const typeProject = [
        {
            id: '111',
            name: "develope"
        },
        {
            id: '222',
            name: "math"
        },
        {
            id: '333',
            name: "architecture"
        }
    ];
    const handleSelectChange = (e) => {
        console.log(e.value)
    };
const CreateCategory = ({user, buildId, onSubmit, building, setBuilding}) => {
  return (
    <div className='p-5'>
         <Form.Control as="select" onChange={handleSelectChange}>
                <option value="">select type of Project</option>
                 {typeProject.map((project, index) => (
                   <option key={index} value={project.name}>
                      {project.name}
                   </option>
                 ))}
             </Form.Control>
    </div>
  )
}

export default CreateCategory