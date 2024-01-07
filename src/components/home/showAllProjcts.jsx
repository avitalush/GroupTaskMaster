import React, { useEffect, useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { ProjectContext } from '../../context/projectCOntext';
import SingleProject from './singleProject';
import { Button } from 'react-bootstrap';
import ManagmentNewProject from '../createNewProject/managmentNewProject';
import NewProject from './newProject';




export default function ShowAllProjcts() {


    const { getAllUsersFromServer,currentId } = useContext(UserContext);
    const { projects ,getAllTasksByIdUser} = useContext(ProjectContext);
const fetchData=async()=>{
    console.log(currentId);
    await getAllUsersFromServer();
   
}
    useEffect(() => {
      fetchData();
      }, []); 
    

    return (
        <div>

            {projects?.map((project) => (
                <SingleProject key={project.id} project={project} />
            ))}
        <NewProject/>

        </div>
    )
}
