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
//import {  TOKEN_NAME, doApiMethodSignUpLogin, doApiTokenGet } from '../../store/services/service';
import swal from 'sweetalert';
import "./login/login.css";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { UserContext } from '../../context/userContext';
import { ProjectContext } from '../../context/projectCOntext';
import { TaskContext } from '../../context/taskCOntext';


const Login = () => {
    const { signInAsAdmin, setUsers } = useContext(UserContext);
    const { setNumOfProjects } = useContext(ProjectContext);
    const { setNumOTasks } = useContext(TaskContext);

    const navigate = useNavigate();
    const { type } = useParams();
    const [open, setOpen] = React.useState(false);
    const [mail, setMail] = React.useState("");
    const [showPassword, setshowPassword] = React.useState(false)
    const [formData, setFormData] = useState({
        password: "",
    })
    const { handleSubmit, formState: { errors }, getValues } = useForm({

    });

    const onSubmit = () => {
        doApi()
    };
    const apiLogIn = async (_url, _method, _body = {}) => {
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

            const { data } = await signInAsAdmin("/loginAsAdmin", "POST", formData);
            console.log("data: ", data)
            localStorage.setItem("token", data.token);
            //setProjectsList(data.allProjectsFromUser)
            setUsers(data.users);
            setNumOfProjects(data.projects)
            setNumOTasks(data.tasks)
            navigate("/adminPage")


        }
        catch (err) {
            console.log(err)
            console.log(err.response?.data?.msg);
            swal({
                title: "סיסמה שגויה!",
                icon: "warning",
                button: "אישור",
            });
        }
    }
    const openReset = () => {
        setMail(getValues('email'))
        setOpen(true)
    }
    const handleChangeValue = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
    return (
        <div className='container center '>
            <form onSubmit={handleSubmit(onSubmit)} className="form mx-auto pt-5">
                <h2 className='mb-4'>כניסת מנהל - הזן סיסמה</h2>

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
                </div>
            </form>
        </div>
    )
}

export default Login;