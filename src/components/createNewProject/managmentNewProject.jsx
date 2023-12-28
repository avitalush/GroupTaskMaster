// import React, { useState } from 'react';
// //import { Tabs, Tab } from 'react-bootstrap';
// import Tab from 'react-bootstrap/Tab';
// import Tabs from 'react-bootstrap/Tabs';
// import { useNavigate } from 'react-router-dom';
// import FormNeaProject from './form';
// import UserAssociation from './userAssociation';


// export default function ManagmentNewProject() {
// const navigate=useNavigate();
// const handleClick=()=>{
//     navigate('/project/50')
// }
//     const [key, setKey] = useState('createNewProject');
//     return (

// <>
//         <Tabs
//             id="controlled-tab-example"
//             activeKey={key}
//             onSelect={(k) => setKey(k)}
//             className="mb-3"
//         >
//             <Tab eventKey="createNewProject" title="Create New Project">
//                 <FormNeaProject></FormNeaProject>
//             </Tab>
//             <Tab eventKey="addUsers" title="Add Users">
//                 <UserAssociation></UserAssociation>
//             </Tab>
//             <Tab eventKey="addTasks" title="Add Tasks">
// כאן תבוא קומפוננטה של הוספת משימה חדשה
//             </Tab>
//         </Tabs>
//         <button onClick={handleClick}>end</button>
// </>
//     )
// }

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import FormNeaProject from './form';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import CreateCategory from './createCategory';
import { Alert, AlertTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const steps = ['אימות פרטים', 'הכנסת פרטים אישיים', 'סיום'];

export default function ManagmentNewProject() {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [email, setEmail] = useState("");
    const [buildId, setBuildId] = useState("");
    const [building, setBuilding] = React.useState(null);
    const [user, setUser] = useState(null);

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            navigate("/login");
        }
        let newSkipped = skipped;
        if (activeStep == 0) {
            identityUser();
        }
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const identityUser = async () => {
        try {
            const url = "localhost/users/identityUser/" + email + "/" + buildId;
            // const { data } = await doApiMethod(url, "GET");
            data={};
            if (data.length == 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'אופס..',
                    text: 'הפרטים שהזנת שגויים.',
                    footer: '<a href="">למה יש לי בעיה?</a>'
                })
            } else {
                setUser(data[0]);
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
            console.log(data)
        }
        catch (err) {
            console.log(err);
        }
    }

    const onSubmit = (data) => {
        console.log(data,building)
        if (building.paymentType==false) {
            data.price = building.paymentFees * data.area;
        } else {
            data.price = building.paymentFees;
        }
        data.fullName = { "firstName": data.firstName, "lastName": data.lastName };
        data.active = true;
        data.numApartment = user.numApartment;
        delete data.firstName;
        delete data.lastName;
        console.log(data);
        editUser(data);
    }

    const editUser = async (obj) => {
        try {
            const url = API_URL + "/users/" + user._id
            const { data } = await doApiMethod(url, "PUT", obj);
            console.log(data);
            setActiveStep((prevActiveStep) => prevActiveStep + 1);

        }
        catch (err) {
            console.log(err);
        }
    }

    const handleReset = () => {
        setActiveStep(0);
    };

    const getStepContent = () => {
        switch (activeStep) {
            case 0:
                return <FormNeaProject setBuildId={setBuildId} setEmail={setEmail} />;
            case 1:
                return <CreateCategory user={user} buildId={buildId} onSubmit={onSubmit} building={building} setBuilding={setBuilding} />;
            default:
                return;
        }
    }

    return (<React.Fragment>
        <Box sx={{ width: '70%', padding: "24px", margin: "auto", backgroundColor: "white", marginTop: "24px" }}>
            <h3 className="text-center mb-5">רישום דייר</h3>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>
                                <h5 className='me-2 mt-1'>{label}</h5>
                            </StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length - 1 ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1, p:"24px" }}>
                        <Alert severity="success" style={{ fontSize: "x-large" }}>
                            <AlertTitle style={{ fontSize: "large" }}>  הרשמתך בוצעה <strong>בהצלחה.</strong> </AlertTitle>                           
                        </Alert>
                    </Typography>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <div>{getStepContent()}</div>

                </React.Fragment>
            )}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                    style={{ backgroundColor: "#94db9f" , color:"white" }}
                    color="inherit"
                    disabled={activeStep === 0 || activeStep === steps.length - 1}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                >
                    חזרה
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                {activeStep != 1 && <Button
                    style={{ backgroundColor: "#94db9f" , color:"white"}}
                    onClick={handleNext} type="submit">
                    {activeStep === steps.length - 1 ? 'סיום' : 'הבא'}
                </Button>}
            </Box>
        </Box>
    </React.Fragment>
    );
}
