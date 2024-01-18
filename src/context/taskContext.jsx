import { createContext, useState, useContext, useReducer } from "react";
import TaskReducer from "./reducers/taskReducer"
import axios from 'axios';

export const TaskContext = createContext({})
export default function ProviderTask({ children }) {
    const currentUser = '111';
    const BASE_URL = 'http://localhost:1200/api/v1/tasks';
    const [tasks, dispach] = useReducer(TaskReducer, []);


    const addTaskToProject = async (url, method, formData) => {
        try {
            let resp = await axios({
                method: "post",
                url: `${BASE_URL}/createTask?projectId=${formData.projectId}`,
                data: JSON.stringify(formData),
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
    const addTaskToList = async (data) => {
        dispach({ type: "ADD_TASK", payload: data })
        console.log(data);
    }
    const addTasksListToProject = async () => {
        

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
            dispach({ type: "UPDATE_TASKS", payload: [] })

            console.log(resp);
            return resp;
        } catch (err) {
            throw err;
        }
    }
    const deleteTaskById = async (id) => {

        try {
            let resp = await axios({
                method: "delete",
                url: `${BASE_URL}/deleteTask/${id}`,

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
    const changeStatus = async (id, status) => {

        try {
            let resp = await axios({
                method: "patch",
                url: `${BASE_URL}/changeStatus?taskId=${id}&status=${status}`,

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
    const addNote = async (note, id) => {
        try {
            let resp = await axios({
                method: "post",
                url: `${BASE_URL}/addNote?taskId=${id}`,
                data: { note: note },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
            console.log(resp);  // הוסף הדפסה כדי לראות את התגובה בקונסול
            return resp;
        } catch (err) {
            console.error(err);  // הוסף הדפסה של שגיאה בקונסול
            throw err;
        }
    }
    
    const editTask = async (data) => {
        console.log(data);
        try {
            let resp = await axios({
                method: "patch",
                url: `${BASE_URL}/editTask/${data.id}`,
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
    const shared = { addTaskToProject, addTaskToList, tasks, addTasksListToProject, deleteTaskById, changeStatus, editTask ,addNote}

    return (
        <TaskContext.Provider value={shared}>
            {children}
        </TaskContext.Provider>
    )
}