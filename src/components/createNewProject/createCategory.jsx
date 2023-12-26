import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';

export default function CreateCategory() {
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

    return (
        /* 
        יחזיר שני כפתורים כפתור סוג פרוייקט וכפתור סוג קטגוריה,
    לפי סוג הפרוייקט יכנס לקטגוריה הסוג שלה */
        <div>
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


/*
 const [typeProject, setTypeProject] = useState([]);


    useEffect(() => {
        setTypeProject({
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
            })
        setCategory({
            id: '111',
            name: "aaa",
            idTypeProject: '111'
        },
            {
                id: '222',
                name: "bbb",
                idTypeProject: '111'

            },
            {
                id: '333',
                name: "ccc",
                idTypeProject: '111'

            },
            {
                id: '444',
                name: "ddd",
                idTypeProject: '222'
            },
            {
                id: '555',
                name: "eee",
                idTypeProject: '222'

            },
            {
                id: '666',
                name: "fff",
                idTypeProject: '222'

            },
            {
                id: '777',
                name: "ggg",
                idTypeProject: '333'
            },
            {
                id: '888',
                name: "hhh",
                idTypeProject: '333'

            },
            {
                id: '999',
                name: "iii",
                idTypeProject: '333'

            }) 
    }, [typeProject]);
*/
