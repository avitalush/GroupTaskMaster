import { createContext, useState, useContext, useReducer } from "react";
import UserReduces from "./reducers/userReducer"
import axios from 'axios';
import { ProjectContext } from "./projectCOntext";

export const UserContext = createContext({})
export default function ProviderUser({ children }) {
    const BASE_URL = 'http://localhost:1200/api/v1/users';
    const [usersList, dispach] = useReducer(UserReduces, []);
    const [currentId, setCurrentId] = useState(0);
    const [users, setUsers] = useState([]);

    const { getAllTasksByIdUser } = useContext(ProjectContext)

    

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
            return resp;
        } catch (err) {
            throw err;
        }
    };

    const signInAsAdmin = async (_url, _method, _body = {}) => {
        try {
            let resp = await axios({
                method: _method,
                url: `${BASE_URL}${_url}`,
                data: JSON.stringify(_body),
                headers: {
                    'Content-Type': 'application/json',

                }
            })
            
            // setCurrentId(_body.email);
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
            updateUserId(resp.data.users);

            dispach({ type: "UPDATE_USERS", payload: resp.data.users })


            return resp;
        } catch (err) {
            throw err;
        }
    };
    const findUserById = (id) => {
        return usersList.find((u) => u.id === id);
    }
    const findUserByEmail = (email) => {
        console.log(email);
        let c = usersList.find((u) => u.email === email);
        console.log(c);
        return c;
    }
    const updateUserId = (data) => {
        let c = data.find((u) => u.email === currentId);
        console.log(c);
        const { ddd } = getAllTasksByIdUser(c.id);
        console.log(ddd);
        setCurrentId(c)
    }
    const handleforgetPassword = async (data) => {
        console.log(data);
        try {
            let resp = await axios({
                method: "post",
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
                method: "post",
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
    const handleResetPassword = async (token, data) => {
        console.log(data);
        try {
            let resp = await axios({
                method: "post",
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
    const shared = { usersList, signIn, getAllUsersFromServer, findUserById, findUserByEmail, currentId, handleforgetPassword, addUser, handleResetPassword, signInAsAdmin, setUsers, users }


    return (
        <UserContext.Provider value={shared}>
            {children}
        </UserContext.Provider>
    )
}