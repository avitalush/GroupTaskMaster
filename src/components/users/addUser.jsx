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
import UpImage from './uploadImage';
import '../../style/generalStyle.css'


const AddUser = () => {
   
    const navigate = useNavigate();
    const { type } = useParams();
    const [open, setOpen] = React.useState(false);
    const [mail, setMail] = React.useState("");
    const [formData, setFormData] = React.useState({
        name:"",
        email:"",
        password:"",
        pic:''
    
    })

    const { register, handleSubmit, formState: { errors }, getValues } = useForm({
        
    });
const {addUser}=useContext(UserContext)
    const onSubmit = (data) => {
       doApi(data)
      
    };
    const handleImage = (imageUr) => {
console.log(imageUr);
    setFormData((prevState) => ({ ...prevState, pic: imageUr }));
    };

    const doApi = async (_data) => {
        try {
            
        const resp = await addUser( formData);
        console.log(resp.status);
if(resp.status===201){

    navigate('/login')
}

        }
        catch (err) {
            console.log(err);
            swal({
                title: "ההרשמה נכשלה-נסה שוב!",
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
        <div className='container center p-2 text-burgundy '>
            <form onSubmit={handleSubmit(onSubmit)} className="form mx-auto pt-5">
                <h2 className='mb-4'>Sign up</h2>
                <TextField id="standard-basic"
                    label="name"
                    name="name"
                    className='w-75 mb-3 text-burgundy'
                    variant="outlined" 
                    onChange={handleChangeValue}
                    style={{ backgroundColor: "#ebedf0" }}
                     />
                    
   <TextField id="standard-basic"
                    label="email"
                    name="email"
                    onChange={handleChangeValue}
                    className='w-75 mb-3 text-burgundy kalam-light'
                    variant="outlined" 
                    style={{ backgroundColor: "#ebedf0" }}
                    />
                       <TextField id="standard-basic kalam-light"
                    label="password"
                    name="password"
                    onChange={handleChangeValue}
                    className='w-75 mb-3  kalam-light'
                    variant="outlined" 
                    style={{ backgroundColor: "#ebedf0" }}
                     />


                       <UpImage handleImage={handleImage}  className='w-75 mb-5 text-burgundy' />

                <div>
                    <Button variant="contained" className='text-burgundy mt-2'
                        size="medium" type="submit"
                        style={{ background: "#d1bbac" }}

                    >  Sign up  </Button>

                </div>
            </form>
        </div>
    )
}

export default AddUser;