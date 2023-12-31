import axios from "axios";
import { createContext, useReducer, useState } from "react";

import ProjectsReducer from './reducers/projectReducer'
export const ProjectContext = createContext({})
export default function ProviderProjec({ children }) {
    const BASE_URL = "http://localhost:1200/api/v1/projects";
    const [projects, dispach] = useReducer(ProjectsReducer, []);

    const projectsDetails=[{
        id:'111',
        name:'aaa',
        color:'#e088b2',
        usersRef:['555','222','333'],
        adminRef:'555'

    },
    {
        id:'222',
        name:'bbb',
        color:'#29375c',
        usersRef:['444','111'],
        adminRef:'222'


    },
    {
        id:'333',
        name:'ccc',
        color:'#42562d',
        usersRef:['333','111','555'],
        adminRef:'222'


    }]
const setProjectsList=async(data)=>{
    dispach({ type: "UPDATE_PROJECTS", payload: data })
}

const getProjectById=(id)=>{
    console.log(projects[0]);
    return projects.filter(item => item.id == id )

}

const getTasksByIdProject=async(id)=>{
    try {
        let resp = await axios({
            method:"get",
            url: `${BASE_URL}/findProjectByIdReturnTasks/${id}`,
           
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`

            }
        })
      return resp;
    } catch (err) {
        throw err;
    }
}
const addUsers=async(users,projectId)=>{
    const joinedIds = users.join(',');
    try {
        let resp = await axios({
            method:"get",
            url: `${BASE_URL}/addUsers?projectId=${projectId}&userId=/userId=${joinedIds}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`

            }
        })
      return resp;
    } catch (err) {
        throw err;
    }
}
    const shared = {projectsDetails,projects,setProjectsList,getTasksByIdProject,getProjectById}

    return (
        <ProjectContext.Provider value={shared}>
            {children}
        </ProjectContext.Provider>
    )
}