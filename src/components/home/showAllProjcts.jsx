import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/userConrext';
import { ProjectContext } from '../../context/projectCOntext';
import SingleProject from './singleProject';
import { Button } from 'react-bootstrap';
import ManagmentNewProject from '../createNewProject/managmentNewProject';
import NewProject from './newProject';




export default function ShowAllProjcts() {


    const { currentUser } = useContext(UserContext);
    const { projectsDetails } = useContext(ProjectContext);


    return (
        <div>

            {projectsDetails.map((project) => (
                <SingleProject key={project.id} project={project} />
            ))}
        <NewProject/>

        </div>
    )
}
