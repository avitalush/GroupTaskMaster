import { createContext, useState, useContext, useReducer } from "react";
import TaskReducer from "./reducers/taskReducer"
import axios from 'axios';

export const TaskContext = createContext({})
export default function ProviderTask({ children }) {
    const currentUser='111';
    const BASE_URL = 'http://localhost:1200/api/v1/tasks';
     const [tasks, dispach] = useReducer(TaskReducer, []);


    const addTaskToProject=async(data)=>{
        try {
            let resp = await axios({
                method: _method,
                url: `${BASE_URL}${_url}?projectId=${data.projectId}`,
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`,

                }
            })
          return resp;
        } catch (err) {
            throw err;
        }
    }
        const addTaskToList=async(data)=>{
            dispach({ type: "ADD_TASK", payload: data })
console.log(tasks);
          }
          const addTasksListToProject=async()=>{
            console.log(tasks[0]);

            try {
                let resp = await axios({
                    method: "post",
                    url: `${BASE_URL}/createTasks?projectId=${tasks[0].projectId}`,
                    data: JSON.stringify(tasks),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem("token")}`,

                    }
                })
                console.log(resp.url);
              return resp;
            } catch (err) {
                throw err;
            }}
  
    
    const shared = { addTaskToProject,addTaskToList,tasks,addTasksListToProject}

    return (
        <TaskContext.Provider value={shared}>
            {children}
        </TaskContext.Provider>
    )
}