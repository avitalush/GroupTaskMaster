import React, { useState } from 'react';
//import { Tabs, Tab } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import FormNeaProject from './form';
import UserAssociation from './userAssociation';


export default function ManagmentNewProject() {


    const [key, setKey] = useState('createNewProject');
    return (


        <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
        >
            <Tab eventKey="createNewProject" title="Create New Project">
                <FormNeaProject></FormNeaProject>
            </Tab>
            <Tab eventKey="addUsers" title="Add Users">
                <UserAssociation></UserAssociation>
            </Tab>
            <Tab eventKey="addTasks" title="Add Tasks">
כאן תבוא קומפוננטה של הוספת משימה חדשה
            </Tab>
        </Tabs>

    )
}


