import React, { useState, useEffect,useContext } from 'react'
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
import ForgetPassword from './forgetPassword';
//import {  TOKEN_NAME, doApiMethodSignUpLogin, doApiTokenGet } from '../../store/services/service';
import swal from 'sweetalert';
import "./login.css";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { UserContext } from '../../../context/userContext';
import { ProjectContext } from '../../../context/projectCOntext';


const Login = () => {
    const { signIn } = useContext(UserContext);
    const { setProjectsList } = useContext(ProjectContext);

    const navigate = useNavigate();
    const { type } = useParams();
    const [open, setOpen] = React.useState(false);
    const [mail, setMail] = React.useState("");
    const [showPassword, setshowPassword] = React.useState(false)
const [formData,setFormData]=useState({
    password:"",
    email:""
})
    const { register, handleSubmit, formState: { errors }, getValues } = useForm({
        
    });

    const onSubmit = () => {
        doApi()
    };
const apiLogIn=async(_url, _method, _body = {})=>{
    try {
        let resp = await axios({
            method: _method,
            url: _url,
            data: JSON.stringify(_body),
            headers: {
                'Content-Type': 'application/json',
                // "x-api-key":localStorage[TOKEN_NAME]
            }
        })
      return resp;
    } catch (err) {
        throw err;
    }
}
    const doApi = async () => {
        try {
            
            const { data } = await signIn("/login", "POST", formData);
                console.log(data)
                localStorage.setItem("token", data.token);
                setProjectsList(data.allProjectsFromUser)
                 navigate("/home")
            

        }
        catch (err) {
            console.log(err)
            console.log(err.response?.data?.msg);
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
        <div className='container center '>
<form onSubmit={handleSubmit(onSubmit)} className="form mx-auto pt-5">
                    <h2 className='mb-4'>היי, טוב לראות אותך</h2>
                <TextField id="standard-basic"
                    label="אימייל"
                    name="email"
                    className='w-75'
                    variant="outlined" 
                    onChange={handleChangeValue}
                    style={{ backgroundColor: "#ebedf0" }} />

                <p className='text-danger'>{errors.email?.message}</p>

                <FormControl sx={{ m: 1 }} variant="standard" className='w-75'>
                    <InputLabel htmlFor="outlined-adornment-password">סיסמא</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        style={{ backgroundColor: "#ebedf0" }}
                        name="password"
                        onChange={handleChangeValue}
                        endAdornment={
                            <InputAdornment position="start">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setshowPassword(!showPassword)}                            >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <p className='text-danger'>{errors.password?.message}</p>
                </FormControl>

                <div>
                    <Button variant="contained"
                        style={{ background: "red" }}
                        size="medium" type="submit"
                        onClick={handleSubmit}
                    >  התחבר  </Button>

                    <Divider className='w-30 text-dark my-3' />
                    {/* <p className="move" onClick={openReset}>שכחתי סיסמא</p> */}

                    {open ? <ForgetPassword email={mail} setOpen={setOpen} /> : null}
                    <p className="move link" onClick={() => { navigate("/register"); }} style={{cursor:"pointer"}}> לא רשום? עבור להרשמה </p>
                </div>
            </form>
        </div>
    )
}

export default Login;