import axios from "axios";
import { createContext, useReducer, useState } from "react";

import ProjectsReducer from './reducers/projectReducer'
export const ProjectContext = createContext({})
export default function ProviderProjec({ children }) {
    const BASE_URL = "http://localhost:1200/api/v1/projects";
    const [projects, dispach] = useReducer(ProjectsReducer, []);


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
    console.log(joinedIds);
    try {
        let resp = await axios({
            method:"post",
            url: `${BASE_URL}/addUsers?projectId=${projectId}&userId=${joinedIds}`,
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
const deleteById=async(id)=>{
    try {
        let resp = await axios({
            method:"delete",
            url: `${BASE_URL}/deleteProject/${id}`,
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
const deleteTaskById=async(idProject,idTask)=>{
    try {
        let resp = await axios({
            method:"delete",
            url: `${BASE_URL}/removeTask?projectId=${idProject}&userId=${idTask}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`

            }
        })
console.log(resp);
      return resp;
    } catch (err) {
        throw err;
    }
}
const editProject = async (data) => {
  
    try {
        let resp = await axios({
            method: "patch",
            url: `${BASE_URL}/editProject/${data.id}`,
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
        console.log(resp);
        return resp;
    } catch (err) {
        throw err;
    }
}
    const shared = {projects,setProjectsList,getTasksByIdProject,getProjectById,deleteById,addUsers,deleteTaskById,editProject}

    return (
        <ProjectContext.Provider value={shared}>
            {children}
        </ProjectContext.Provider>
    )
}