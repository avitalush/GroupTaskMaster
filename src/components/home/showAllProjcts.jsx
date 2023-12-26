import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/userConrext';
import { ProjectContext } from '../../context/projectCOntext';
import SingleProject from './singleProject';
import { Button } from 'react-bootstrap';
import ManagmentNewProject from '../createNewProject/managmentNewProject';




export default function ShowAllProjcts() {


    const { currentUser } = useContext(UserContext);
    const { projectsDetails } = useContext(ProjectContext);
    console.log(projectsDetails);


/*     const isUserAllowed = (project) => {
        const isManager = project.adminRef === currentUser;
        const isUserInProject = project.users.includes(currentUser);
        return isManager || isUserInProject;
    }; */
    //const filteredProjects = (projectsDetails || []).filter((project) => isUserAllowed(project));

   // console.log(filteredProjects);

    return (
        <div>

            {projectsDetails.map((project) => (
                <SingleProject key={project.id} project={project} />
            ))}
{/*             כאן צריך להיות ניווט ליצירת פרוייקט חדש
 */}            <Button>
               +
            </Button>

        </div>
    )
}
