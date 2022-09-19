import './index.scss'
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { pink } from '@mui/material/colors';
import { Link, withRouter, Navigate } from "react-router-dom";
const LoginPage = () => {
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
                        
                        >
                        <h3>Username</h3>
                        <TextField
                            className='textField'
                            hiddenLabel
                            required
                            id="outlined-basic"
                            placeholder="username or e-mail"
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
                        <TextField
                            className='textField'
                            hiddenLabel
                            required
                            id="outlined-basic"
                            placeholder="password"
                        />
                    </FormControl>
                    <button>Sign In</button>
                    <FormControlLabel
                        label="Remember Me"
                        sx={{
                            '.MuiFormControlLabel-label': {
                                color: 'white',
                            },
                        }}
                        control={<Checkbox
                            sx={{
                                color: pink[800],
                                '&.Mui-checked': {
                                    color: pink[600],
                                },

                            }}
                        />} />
                    <div className='login-card-bottom'><p>New to animap?</p><Link to="/register">Sign Up now</Link></div>
                </div>
            </div>
        </div>);
}
export default LoginPage