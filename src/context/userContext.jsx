import { createContext, useState, useContext ,useReducer} from "react";
import UserReduces from "./reducers/userReducer"
import axios from 'axios';

export const UserContext = createContext({})
export default function ProviderUser({ children }) {
    const currentUser='111';
    const BASE_URL = 'http://localhost:1200/api/v1/users';
const [users, dispach] = useReducer(UserReduces, []);

    const signIn =async(_url, _method, _body = {})=>{
        try {
            let resp = await axios({
                method: _method,
                url: `${BASE_URL}${_url}`,
                data: JSON.stringify(_body),
                headers: {
                    'Content-Type': 'application/json',
                    
                }
            })
            console.log(resp.url);
          return resp;
        } catch (err) {
            throw err;
        }
    };
    const getAllUsersFromServer =async()=>{

        try {
            let resp = await axios({
                method: "get",
                url: `${BASE_URL}/getAllUsers`,
                headers: {
                    'Content-Type': 'application/json',
                    
                }
            })
            dispach({ type: "UPDATE_PROJECTS", payload: resp.data.users })
            console.log(resp.data.users);
return resp
        } catch (err) {
            throw err;
        }
    };
    const shared = { users, currentUser,signIn,getAllUsersFromServer}

    return (
        <UserContext.Provider value={shared}>
            {children}
        </UserContext.Provider>
    )
}