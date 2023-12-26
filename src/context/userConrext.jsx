import { createContext, useState, useContext } from "react";

export const UserContext = createContext({})
export default function ProviderUser({ children }) {
    const currentUser='111';

    const users=[{
        id:'111',
        name:'ttt'
    },
    {
        id:'222',
        name:'lll'
    },
    {
        id:'333',
        name:'ggg'
    },
    {
        id:'444',
        name:'fff'
    },
    {
        id:'555',
        name:'mmm'
    }]

/*     const projectsDetails=[{
        id:'111',
        name:'aaa',
        color:'',
        usersRef:['111','222','333'],
        adminRef:'555'

    },
    {
        id:'222',
        name:'bbb',
        color:'',
        usersRef:['444','111'],
        adminRef:'222'


    },
    {
        id:'333',
        name:'ccc',
        color:'',
        usersRef:['333','111','555'],
        adminRef:'222'


    }] */

    const shared = { users, currentUser}

    return (
        <UserContext.Provider value={shared}>
            {children}
        </UserContext.Provider>
    )
}