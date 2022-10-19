import './index.scss'
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
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
import { fetchAuthAsync } from '../../actions/authAction'
import { fetchAnimeByAccountAsync } from '../../actions/animeDetailListAction'
import Swal from 'sweetalert2'
import axios from "axios";
import withReactContent from 'sweetalert2-react-content'
import isEmail from 'validator/lib/isEmail';
import { JSEncrypt } from "jsencrypt";



//import rsa from 'js-crypto-rsa';
const LoginPage = () => {
    var privateKey = `
-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6khyfD1Yt3YiCgQ
WMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76xFxdU6jE0NQ+Z+zEdhUTooNR
aY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4gwQco1KRMDSmXSMkDwIDAQAB
AoGAfY9LpnuWK5Bs50UVep5c93SJdUi82u7yMx4iHFMc/Z2hfenfYEzu+57fI4fv
xTQ//5DbzRR/XKb8ulNv6+CHyPF31xk7YOBfkGI8qjLoq06V+FyBfDSwL8KbLyeH
m7KUZnLNQbk8yGLzB3iYKkRHlmUanQGaNMIJziWOkN+N9dECQQD0ONYRNZeuM8zd
8XJTSdcIX4a3gy3GGCJxOzv16XHxD03GW6UNLmfPwenKu+cdrQeaqEixrCejXdAF
z/7+BSMpAkEA8EaSOeP5Xr3ZrbiKzi6TGMwHMvC7HdJxaBJbVRfApFrE0/mPwmP5
rN7QwjrMY+0+AbXcm8mRQyQ1+IGEembsdwJBAN6az8Rv7QnD/YBvi52POIlRSSIM
V7SwWvSK4WSMnGb1ZBbhgdg57DXaspcwHsFV7hByQ5BvMtIduHcT14ECfcECQATe
aTgjFnqE/lQ22Rk0eGaYO80cc643BXVGafNfd9fcvwBMnk0iGX0XRsOozVt5Azil
psLBYuApa66NcVHJpCECQQDTjI2AQhFc1yRnCU/YgDnSpJVm1nASoRUnU8Jfm3Oz
uku7JUXcVpt08DFSceCEX9unCuMcT72rAQlLpdZir876
-----END RSA PRIVATE KEY-----`

    const navigate = useNavigate();
    const MySwal = withReactContent(Swal)
    const [values, setValues] = useState({
        showPassword: false,
    });
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isValidEmail, setIsValidEmail] = useState(false)
    const [isValidPassword, setIsValidPassword] = useState(false)
    const [checked, setChecked] = useState(false)
    const handleChangeChecked = (event) => {
        setChecked(event.target.checked)
    }
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleChangeEmail = (event) => {
        const val = event.target.value;
        if (isEmail(val)) {
            setIsValidEmail(true);
        } else {
            setIsValidEmail(false);
        }
        setEmail(val)
    }
    const handleChangePassword = (event) => {
        const pass = event.target.value;
        setPassword(pass)
    }
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const decodeRSA = (string) => {
        var decrypt = new JSEncrypt();
        decrypt.setPrivateKey(privateKey);
        var start = 0
        var end = 0
        var realPlainText = ""
        var decryptMessage = ""
        var SubText = ""
        for (let i = 0; i <= parseInt(string.length / 344); i++) {
            if (i == parseInt(string.length / 344)) {
                start = end
                end = string.length
            } else {
                start = end
                end = ((i + 1) * 344)
            }
            SubText = string.substr(start, end)
            ///////// EN crypt ?///////
            var decrypt = new JSEncrypt();
            decrypt.setPrivateKey(privateKey);
            var decryptMessage = decrypt.decrypt(SubText);
            realPlainText += decryptMessage
            ////////////en crypt//////////
        }
        console.log(realPlainText)
    }

    decodeRSA(`VO5cYktmilDNBQzsLyHIGnyPBXcO4IzxAShvTfsGv8g/jngfDi+3NHHpCFsHW+JRF50MoLlFbdV+av/r8jFrdEv2mJmil1QVEgeDEny44WD6zh7ohi6nkZWHBAGudwtg7HQb1lPUHLwqZIF+60hHKKE1V1pGnlii+lV1D7mqQus=GIFnM5LRXgyAqCrgV3GKQiz734NOaIAxG8SQ6b36Fd1s/1FewGs4M1dnf5BK0zE8CkPte6VUx0OluqhARB9GNa8Jq1QRgTIPR5HpArlO3i445sVQKcunxZ1ndsT9EK2LwWUzQVmqV6WrxGgu08e74WjbCN8ryPoKtMWECRsnP0E=Dp6RzTDY3IqBn7AvQwAnSgCrIvrU3buUCiUXi7Q5lautIzI4AuAzHdYjbfNupAmh8/IpaKb48VooEIfuiV7vGuvX+0hUHGtHHNV7/z+jcPJ+262urbyeZucUMR5sgjrvf8L88Pik3Ufp8GabT0ut4XIu2YIA4TlbhEGOm4CroSY=udPF99Tp3JkIH2ye397wwocjTXsuJbsYQehmWVO5GBbiZCAp1JJ/UHLwlzTpEUzrOETtJ/hZZuPTFBywStxT5KnD7LYoJndojLGaGlj9OPxp4IuD3ouVZUXvJm2QZtpQm2DMu1Cdx2BlgJipbxarR1iaeLSpnf+enl0I6wAPsHs=oWy1zUFJgaXwTtrU596804IxzvA6UiXqUUxCL4ypeZ4GShZJ6mHmSB3VKAb0NvdirWsOo3asQ3M0NgCfbxcOsXRUxs80LFIsik40XoC0NPIznrwveSrMmbVM+bs62y8OeURdigSzKnEfCE6Cfw4TK95om9N+I1eZucH0/NojXtk=`)
    const submitForm = () => {
        axios.post(`http://localhost:5000/login`, {
            username: email,
            password: password
        })
            .then((response) =>response.data)
            .then((res) => { authenticate(res, () => navigate('/')) })
            .catch(err => {
                MySwal.fire(
                    'เข้าสู่ระบบไม่สำเร็จ',
                    'Email or Password is wrong',
                    'error',
                    err,
                )
            })
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
                            value={email}
                            onChange={handleChangeEmail}
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
                            value={password}
                            hiddenLabel
                            required
                            placeholder="password"
                            onChange={handleChangePassword}
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
                    <button className='login-button' onClick={submitForm}>Sign In</button>
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