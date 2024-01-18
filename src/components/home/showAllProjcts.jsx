import React, { useEffect, useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { ProjectContext } from '../../context/projectCOntext';
import SingleProject from './singleProject';
import { Button } from 'react-bootstrap';
import ManagmentNewProject from '../createNewProject/managmentNewProject';
import NewProject from './newProject';
import MyProject from './myProject';
import { Height } from '@mui/icons-material';

import '../../style/project.css'



export default function ShowAllProjcts() {


    const { getAllUsersFromServer,currentId } = useContext(UserContext);
    const { projects } = useContext(ProjectContext);
const fetchData=async()=>{
    console.log(currentId);
    await getAllUsersFromServer();
   
}
    useEffect(() => {
      fetchData();
      }, []); 
    

    return (
        <div id="main" className="d-flex flex-wrap background-color kalam-light center">

            {projects?.map((project) => (
                <SingleProject key={project.id} project={project} />
            ))}
        <NewProject/>
<MyProject/>
        </div>
    )
}
