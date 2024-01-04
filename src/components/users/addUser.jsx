import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from "react-router";
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, OutlinedInput } from "@mui/material";
import { Divider } from "@mui/material";
//import {  TOKEN_NAME, doApiMethodSignUpLogin, doApiTokenGet } from '../../store/services/service';
import swal from 'sweetalert';
import "./login/login.css";
import { useForm } from "react-hook-form";
import { UserContext } from '../../context/userContext';


const AddUser = () => {
   
    const navigate = useNavigate();
    const { type } = useParams();
    const [open, setOpen] = React.useState(false);
    const [mail, setMail] = React.useState("");
    const [formData, setFormData] = React.useState({
        name:"",
        email:"",
        password:"",
    
    })

    const { register, handleSubmit, formState: { errors }, getValues } = useForm({
        
    });
const {addUser}=useContext(UserContext)
    const onSubmit = (data) => {
       doApi(data)
      
    };

    const doApi = async (_data) => {
        try {
            
        const resp = await addUser( formData);
if(resp.status==="201"){

    navigate('/login')
}

        }
        catch (err) {
            console.log(err);
            swal({
                title: "כתובת המייל או הסיסמא שגויים!",
                icon: "warning",
                button: "אישור",
            });
        }
    }
    const openReset = () => {
        setMail(getValues('email'))
        setOpen(true)
    }
    const handleChangeValue=(event)=>{
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
      }
    return (
        <div className='container center p-2'>
            <form onSubmit={handleSubmit(onSubmit)} className="form mx-auto pt-5">
                <h2 className='mb-4'>הרשמה</h2>
                <TextField id="standard-basic"
                    label="שם"
                    name="name"
                    className='w-75 mb-3'
                    variant="outlined" 
                    onChange={handleChangeValue}
                    style={{ backgroundColor: "red" }} />
                    
   <TextField id="standard-basic"
                    label="אמייל"
                    name="email"
                    onChange={handleChangeValue}
                    className='w-75 mb-3'
                    variant="outlined" 
                    style={{ backgroundColor: "red" }} />
                       <TextField id="standard-basic"
                    label="ססימא"
                    name="password"
                    onChange={handleChangeValue}
                    className='w-75 mb-3'
                    variant="outlined" 
                    style={{ backgroundColor: "red" }} />

<TextField id="standard-basic"
                    label="תמונה"
                    name="pic"
                    
                    className='w-75 mb-5'
                    variant="outlined" 
                    style={{ backgroundColor: "red" }} />

                <div>
                    <Button variant="contained"
                        style={{ background: "red" }}
                        size="medium" type="submit"
                    >  התחבר  </Button>

                </div>
            </form>
        </div>
    )
}

export default AddUser;