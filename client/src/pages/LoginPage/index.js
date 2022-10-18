import './index.scss'
import React, { useState,useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux'
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
import { authenticate } from "../../servies/authorize";
import { useNavigate } from "react-router-dom";
import {fetchAuthAsync} from '../../actions/authAction'
import {fetchAnimeByAccountAsync} from '../../actions/animeDetailListAction'
import Swal from 'sweetalert2'
import axios from "axios";
import withReactContent from 'sweetalert2-react-content'

const LoginPage = () => {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal)
    const [values, setValues] = useState({
        username: '',
        password: '',
        showPassword: false,
    });
    const {loading,error} =useSelector(state=>state.status)
    const [checked,setChecked] = useState(false)
    const handleChangeChecked=(event)=>{
        setChecked(event.target.checked)
    }
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
    const submitForm=()=>{

        // dispatch(fetchAuthAsync(values.username,values.password)).then(
        //     res=>{
        //         
        //     }
        // )
        axios.post(`http://localhost:5000/login`,{
            username:values.username,
            password:values.password})
            .then((response) => response.data)
            .then((res) => {authenticate(res,()=>navigate('/'))})
        .catch(err=>{
            MySwal.fire(
                'เข้าสู่ระบบไม่สำเร็จ',
                'Email or Password is wrong',
                'error',
                err,
               )
        })
    }

    const dispatch=useDispatch()
    return (
        <div>
            <div className='login-bar'>
                <div className='login-logo'>
                    <h1><a href='/'>AniMap</a></h1>
                </div>

            </div>
            <div className='login-container'>
                <div className='login-card'>
                    <h1>Sign In</h1>
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
                    <button className='login-button' onClick={submitForm}>Sign In {loading ? "Loading": ""}</button>
                    {error && <p style={{color:'red',fontSize:'12'}}>{error}</p>}
                    {/* <FormControlLabel
                        label="Remember Me"
                        sx={{
                            '.MuiFormControlLabel-label': {
                                color: 'white',
                            },
                        }}
                        control={<Checkbox
                            checked={checked}
                            onChange={handleChangeChecked}
                            sx={{
                                color: pink[800],
                                '&.Mui-checked': {
                                    color: pink[600],
                                },

                            }}
                        />} /> */}
                    <div className='login-card-bottom'><p>New to animap?</p><Link to="/register">Sign Up now</Link></div>
                </div>
            </div>
        </div>);
}
export default LoginPage