import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../context/userContext';
import { ProjectContext } from '../../context/projectContext';
import { TaskContext } from '../../context/taskContext';
//import { usersList } from '../../context/userContext'
import SingleProject from './singleProject';
import { Button } from 'react-bootstrap';
import ManagmentNewProject from '../createNewProject/managmentNewProject';
import NewProject from './newProject';
import "./adminPage.css"



export default function ShowAllProjcts() {


    const { getAllUsersFromServer, currentId } = useContext(UserContext);
    const { users } = useContext(UserContext);
    const { numOfProjects } = useContext(ProjectContext);
    const { numOfTasks } = useContext(TaskContext);
    const [listUsers, setListUsers] = useState([]);

    const fetchData = async () => {
        console.log(currentId);
        await getAllUsersFromServer();

    }
    useEffect(() => {
        console.log("users:", users);
    }, [listUsers]);

    const showUsers = () => {
        if (listUsers.length > 0) {
            setListUsers([])
        }
        else
            setListUsers(users?.map((user) => user))
        console.log("listUsers:", listUsers);
    }

    return (
        <div class="admin">
            <h1>hello Moshe</h1>
            <h4>there are {users.length} users registered to the site</h4>
            <button onClick={showUsers}>show all users</button>
            {listUsers?.map((user) => <p>{user.name} {user.email}</p>)}
            <h4>there are {numOfProjects} projects opened in the site</h4>
            <h4>there are {numOfTasks} tasks opened in all projects</h4>
        </div>
    )
}
