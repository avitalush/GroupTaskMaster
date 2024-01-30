import { createContext, useState, useContext, useReducer } from "react";
import UserReduces from "./reducers/userReducer"
import axios from 'axios';
import { ProjectContext } from "./projectCOntext";

export const UserContext = createContext({})
export default function ProviderUser({ children }) {
    const BASE_URL = 'http://localhost:1200/api/v1/users';
    const [usersList, dispach] = useReducer(UserReduces, []);
const [currentId,setCurrentId]=useState(0);
    const signIn = async (_url, _method, _body = {}) => {
        try {
            let resp = await axios({
                method: _method,
                url: `${BASE_URL}${_url}`,
                data: JSON.stringify(_body),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            setCurrentId(_body.email);
            let ccc= _body.email;
            if(ccc!==undefined){
                            localStorage.setItem("emailUser",ccc);

            }

             return resp;
        } catch (err) {
            throw err;
        }
    };

    const getAllUsersFromServer = async () => {
       
        try {
            let resp = await axios({
                method: "get",
                url: `${BASE_URL}/getAllUsers`,
                headers: {
                    'Content-Type': 'application/json',

                }
            }) 
            console.log(localStorage.getItem("emailUser"),"---")
            let c=resp.data.users.find((u)=>u.email===localStorage.getItem("emailUser"));
          
            localStorage.setItem("idUser", c.id);
            localStorage.setItem("nameUser", c.name);
            localStorage.setItem("passwordUser", c.password);
            ///localStorage.setItem("emailUser", c.e);
         updateUserId(resp.data.users);
          
            dispach({ type: "UPDATE_USERS", payload: resp.data.users })
          
            
            return resp;
        } catch (err) {
            throw err;
        }
    };

    const findUserById=(id)=>{
        return usersList.find((u)=>u.id===id);
    }
    const findUserByEmail=(email)=>{
        console.log(email);
      let c=usersList.find((u)=>u.email===email);
      console.log(c);
      return c;
    }
    const updateUserId=(data)=>{
        console.log(localStorage.getItem("emailUser"),"---")

      let c=data.find((u)=>u.email===localStorage.getItem("emailUser"));
      
      localStorage.setItem("idUser", c.id);
      localStorage.setItem("nameUser", c.name);
      localStorage.setItem("passwordUser", c.password);
      //localStorage.setItem("emailUser", c.e);
      setCurrentId(c)
    }
    const getAllTasksByIdUser=async()=>{
        try {
            let resp = await axios({
                method:"get",
                url: `${BASE_URL}/getAllTasks?userId=${currentId.id}`,
                headers: {
                    'Content-Type': 'application/json',
    
                }
            })
          console.log({resp}); 
          return resp;
        } catch (err) {
            throw err;
        }
        // dispach({ type: "UPDATE_PROJECTS", payload: data })
    
    }
    const handleforgetPassword = async (data) => {
        console.log(data);
        try {
            let resp = await axios({
                method:"post",
                url: `${BASE_URL}/forgetPassword`,
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',

                }
            })
             return resp;
        } catch (err) {
            throw err;
        }
    };
    const addUser = async (data) => {
        console.log(data);
        try {
            let resp = await axios({
                method:"post",
                url: `${BASE_URL}/register`,
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',

                }
            })
             return resp;
        } catch (err) {
            throw err;
        }
    };
    const handleResetPassword = async (token,data) => {
        console.log(data);
        try {
            let resp = await axios({
                method:"post",
                url: `${BASE_URL}/resetPassword/${token}`,
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',

                }
            })
             return resp;
        } catch (err) {
            throw err;
        }
    };
    const handleUpload = async (file) => {
        if (!file) {
          console.error('No file selected');
          return;
        }
    
        const formData = new FormData();
        formData.append('image', file);
    
        try {
          const response = await fetch('http://localhost:1200/api/v1/images/upload', {
            method: 'POST',
            body: formData,
          });
    
          if (response.ok) {
              console.log("koko");
            const result = await response.json();
           console.log(result);
            return  result.data.secure_url;
          } else {
            console.error('Image upload failed');
          }
        } catch (error) {
          console.error('Error uploading image:', error);
        }
    }
    const shared = { usersList, signIn, getAllUsersFromServer,findUserById,findUserByEmail,currentId,handleforgetPassword,addUser,handleResetPassword,handleUpload,getAllTasksByIdUser}
            

    return (
        <UserContext.Provider value={shared}>
            {children}
        </UserContext.Provider>
    )
}