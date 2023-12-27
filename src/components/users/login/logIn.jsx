import React, { useState, useEffect } from 'react'
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


const Login = () => {
   
    const navigate = useNavigate();
    const { type } = useParams();
    const [open, setOpen] = React.useState(false);
    const [mail, setMail] = React.useState("");
    const [showPassword, setshowPassword] = React.useState(false)

    const { register, handleSubmit, formState: { errors }, getValues } = useForm({
        
    });

    const onSubmit = (data) => {
        doApi(data)
    };

    const doApi = async (_data) => {
        try {
            const url = 'localhost/users/login';
            ///const { data } = await doApiMethodSignUpLogin(url, "POST", _data);
const data=0;
            if (data.token) {
                console.log(data)
                //localStorage.setItem(TOKEN_NAME, data.token);
                navigate("/buildingHomePage")
            }

        }
        catch (err) {
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

    return (
        <div className='container center p-5'>
            <form onSubmit={onSubmit} className="form mx-auto pt-5">
                <h2 className='mb-4'>היי, טוב לראות אותך</h2>
                <TextField id="standard-basic"
                    label="אימייל"
                    name="email"
                    className='w-75'
                    variant="outlined" 
                    style={{ backgroundColor: "#ebedf0" }} />

                <p className='text-danger'>{errors.email?.message}</p>

                <FormControl sx={{ m: 1 }} variant="standard" className='w-75'>
                    <InputLabel htmlFor="outlined-adornment-password">סיסמא</InputLabel>
                    <OutlinedInput
                        {...register("password")}
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        style={{ backgroundColor: "#ebedf0" }}
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
                        style={{ background: "#94db9f" }}
                        size="medium" type="submit"
                    >  התחבר  </Button>

                    <Divider className='w-30 text-dark my-3' />
                    <p className="move" onClick={openReset}>שכחתי סיסמא</p>

                    {open ? <ForgetPassword email={mail} setOpen={setOpen} /> : null}
                    <p className="move"> לא רשום? עבור <span className="link" onClick={() => { navigate("/register"); }}> להרשמה </span></p>
                </div>
            </form>
        </div>
    )
}

export default Login;