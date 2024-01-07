import React, { useState, useEffect,useContext } from 'react'
import { useNavigate, useParams } from "react-router";
import TextField from '@mui/material/TextField';
import { Button, OutlinedInput } from "@mui/material";
//import {  TOKEN_NAME, doApiMethodSignUpLogin, doApiTokenGet } from '../../store/services/service';
import swal from 'sweetalert';
import "../users/login/login.css";
import { useForm } from "react-hook-form";
import { TaskContext } from '../../context/taskContext';


const NewTask = ({idProject,isDashbord}) => {
    const { addTaskToProject ,addTaskToList} = useContext(TaskContext);
const {idproject}=useParams();
    const navigate = useNavigate();
    const defaultIdProject = idProject || idproject;
const [formData,setFormData]=useState({
    title:"",
    description:"",
    date_created:new Date(),
    projectId:defaultIdProject

})
    const {  handleSubmit, formState: { errors }, getValues } = useForm({
        
    });

    const onSubmit = () => {
        console.log(isDashbord);
        if(isDashbord===undefined){
                    doApi();

        }
        else{
            addTaskToList(formData);
        }
    };

    const doApi = async () => {
        try {
            
            const { data } = await addTaskToProject("/createTask", "POST", formData);
            console.log(data);
            if(data.status!=="success"){
                swal({
                    title: "המשימה לא הוכנס כראוי-נסה שוב",
                    icon: "warning",
                    button: "אישור",
                });
            }
            else{
                navigate(`/project/${defaultIdProject}`)
            }
        }
        catch (err) {
            console.log(err)
            console.log(err.response?.data?.msg);
            swal({
                title: "המשימה לא הוכנס כראוי-נסה שוב",
                icon: "warning",
                button: "אישור",
            });
        }
    }
   
    const handleChangeValue=(event)=>{
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
      }
    return (
        <div className='container center '>
<form onSubmit={handleSubmit(onSubmit)} className="form mx-auto pt-5">
                    <h2 className='mb-4'> הוסף משימה</h2>
                <TextField id="standard-basic"
                    label="title"
                    name="title"
                    className='w-75'
                    variant="outlined" 
                    onChange={handleChangeValue}
                    style={{ backgroundColor: "#ebedf0" }} />
 <TextField id="standard-basic"
                    label="description"
                    name="description"
                    className='w-75'
                    variant="outlined" 
                    onChange={handleChangeValue}
                    style={{ backgroundColor: "#ebedf0" }} />

                

                <div>
                    <Button variant="contained"
                        style={{ background: "red" }}
                        size="medium" type="submit"
                        onClick={handleSubmit}
                    >  צור  </Button>

                   
                </div>
            </form>
        </div>
    )
}

export default NewTask;