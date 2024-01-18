
import React,{useContext,useEffect} from 'react';
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
import { useNavigate, useParams } from 'react-router-dom';
import UserAssociation from './userAssociation';
import axios from 'axios';
import CreateTasksList from './createTasksList';
import { TaskContext } from '../../context/taskContext';
import { ProjectContext } from '../../context/projectCOntext';
import usePlaceholder from 'react-bootstrap/esm/usePlaceholder';

const steps = [' יצירת פרויקט חדש', 'הכנסת משימות  ', 'הוספת משויכים לפרויקט  ', 'סיום'];

export default function ManagmentNewProject() {
    const navigate = useNavigate();
    const {idproject}=useParams();
    const [activeStep, setActiveStep] = useState(0);
    const [idProject, setIdProject] = useState(0);
    const { tasks ,addTasksListToProject} = useContext(TaskContext);
    const { addUsers,projects,editProject,apiProject} = useContext(ProjectContext);
const [users,setUsers]=useState([]);
    const [skipped, setSkipped] = useState(new Set());
    const [isEditProject, setIsEditProject] = useState(false);

    const [formData,setFormData]=useState({
        permissiontoAssociateTasks:false,
        name:"",
        description:"",
        color:'#cc8686',
        categories:[]
    })
    useEffect(() => {
        if(idproject!==undefined){
            console.log(idproject);
let editProject=projects.find((p)=>p.id===idproject);
setFormData(editProject);
setIsEditProject(true);
setIdProject(editProject.id)
        }
    }, []);
    const handleNext = () => {
        console.log("hi");
        if (activeStep === steps.length - 1) {
            navigate("/login");
        }
        let newSkipped = skipped;
        if (activeStep == 0) {
            if(isEditProject){
                handleEditProject();
            }
            else{
                 createProject();
            }
           
        }
        if (activeStep == 1) {
            createTasks();
        }
        if (activeStep == 2) {
            createUsers();
        }
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
const createTasks=()=>{
    addTasksListToProject();
    
setActiveStep((prevActiveStep) => prevActiveStep + 1);

}
const createUsers=()=>{
    if(users.length>0){
         let idUsers=users.map((u)=>u.id);
    addUsers(idUsers,idProject)
    }
   
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

}

    const createProject = async () => {
        try {
            const url = "http://localhost:1200/api/v1/projects/createProject";
             const { data } = await apiProject(url, "POST",formData);
            setIdProject(data.project.id);
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
          

        }
        catch (err) {
            console.log(err);
        }

    }
    const handleEditProject = async () => {
        console.log({formData});
        try {
           
             const { satus } = await editProject(formData);
            
                             setActiveStep((prevActiveStep) => prevActiveStep + 2);

             
         

        }
        catch (err) {
            console.log(err.response.data.error);               
            swal({
                title: err.response.data.error,
                icon: "warning",
                button: "אישור",
            });
        }

    }
    


    const editUser = async (obj) => {
       
    }

    const handleReset = () => {
        setActiveStep(0);
    };

    const getStepContent = () => {
        switch (activeStep) {
            case 0:
                return <FormNeaProject formData={formData} setFormData={setFormData} />;
            case 1:
                return <CreateTasksList idProject={idProject}  tasks={tasks}/>;
                case 2:
                    return <UserAssociation setUsers={setUsers}/>;
            default:
                return;
        }
    }

    return (<React.Fragment>
        <Box sx={{ width: '70%', padding: "24px", margin: "auto", backgroundColor: "white", marginTop: "24px",direction:"rtl" }}>
            <h3 className="text-center mb-5">יצירת פרויקט</h3>
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
                            <AlertTitle style={{ fontSize: "large" }}>  הפרויקט נוצר <strong>בהצלחה.</strong> </AlertTitle>                           
                        </Alert>
                    </Typography>
                    <button     onClick={() => { navigate("/home"); }}>למעבר לפרויקט</button>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <div>{getStepContent()}</div>

                </React.Fragment>
            )}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                {/* <Button
                    style={{ backgroundColor: "#94db9f" , color:"white" }}
                    color="inherit"
                    disabled={activeStep === 0 || activeStep === steps.length - 1}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                >
                    חזרה
                </Button> */}
                <Box sx={{ flex: '1 1 auto' }} />
                {activeStep != 3 && <Button
                    style={{ backgroundColor: "#94db9f" , color:"white"}}
                    onClick={handleNext} type="submit">
                    {activeStep === steps.length - 1 ? 'סיום' : 'הבא'}
                </Button>}
            </Box>
        </Box>
    </React.Fragment>
    );
}
