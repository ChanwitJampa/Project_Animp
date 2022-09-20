import './index.scss'
import React, { useState,useEffect } from "react";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { pink } from '@mui/material/colors';
import { Link, withRouter, Navigate } from "react-router-dom";

const RegisterPage = () => {
    const [values, setValues] = useState({
        username: '',
        password: '',
        repassword: '',
        firstname: '',
        showPassword: false,
        showRePassword: false,
    });
    const [checked,setChecked] = useState(false)

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowRePassword = () => {
        setValues({
            ...values,
            showRePassword: !values.showRePassword,
        });
    };
    const handleMouseDownRePassword = (event) => {
        event.preventDefault();
    };

    const submitForm=()=>{
        console.log(values.firstname)
        console.log(values.username)
        console.log(values.password)
        console.log(values.repassword)
    }
    return (
        <div>
            <div className='login-bar'>
                <div className='login-logo'>
                    <h1><a href='/'>AniMap</a></h1>
                </div>

            </div>
            <div className='login-container'>
                <div className='login-card'>
                    <h1>Sign Up</h1>
                    <FormControl
                        fullWidth
                        sx={{
                            color: 'white',
                            mb: 3
                        }}
                        variant="standard"
                    >
                        <h3>Your name</h3>
                        <OutlinedInput
                            className='textField'
                            hiddenLabel
                            required
                            value={values.firstname}
                            onChange={handleChange('firstname')}
                            id="outlined-adornment"
                            placeholder="firstname"
                        />
                    </FormControl>
                    <FormControl
                        fullWidth
                        sx={{
                            color: 'white',
                            mb: 3
                        }}
                        variant="standard"
                    >
                        <h3>Email</h3>
                        <OutlinedInput
                            className='textField'
                            hiddenLabel
                            required
                            value={values.username}
                            onChange={handleChange('username')}
                            id="outlined-adornment"
                            placeholder="e-mail"
                        />
                    </FormControl>
                    <FormControl
                        fullWidth
                        sx={{
                            color: 'white',
                            mb: 3
                        }}
                        variant="standard"
                    >
                        <h3>Password</h3>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            className='textField'
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            hiddenLabel
                            required
                            placeholder="password"
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl
                        fullWidth
                        sx={{
                            color: 'white',
                            mb: 3
                        }}
                        variant="standard"
                    >
                        <h3>Re-enter password</h3>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            className='textField'
                            type={values.showRePassword ? 'text' : 'password'}
                            value={values.repassword}
                            hiddenLabel
                            required
                            placeholder="re-enter password"
                            onChange={handleChange('repassword')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowRePassword}
                                        onMouseDown={handleMouseDownRePassword}
                                        edge="end"
                                    >
                                        {values.showRePassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <button className='login-button' onClick={submitForm}>Create Account</button>
                    <div className='login-card-bottom'><p>Already have an account?</p><Link to="/login">Log In</Link></div>
                </div>
            </div>
        </div>);
}
export default RegisterPage