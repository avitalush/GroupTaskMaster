import { createContext, useState, useContext } from "react";

export const ProjectContext = createContext({})
export default function ProviderProjec({ children }) {
/*     const users=[{
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
    }] */

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

    const shared = {  projectsDetails}

    return (
        <ProjectContext.Provider value={shared}>
            {children}
        </ProjectContext.Provider>
    )
}