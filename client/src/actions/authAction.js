import {startFetch,endFetch,errorFetch} from './statusAction'
import axios from 'axios';


export const SET_AUTH='SET_AUTH'

export function setAuth(user){
    return{
        type:SET_AUTH,
        payload:user
    }
}
export function fetchAuthAsync(email,password){
    return async function(dispatch){
        try{
            dispatch(startFetch())
            await axios
        .post(`http://localhost:5000/login`, {
            accounts_user:email,
            accounts_pwd:password,
        }).
            then((response) => response.data)
            .then((user) => {
                console.log(user)
                dispatch(setAuth(user))
                dispatch(errorFetch(''))
                dispatch(endFetch())
            });
        }catch(error){
            console.log("Error")
            dispatch(setAuth(null))
            dispatch(errorFetch(error))
            dispatch(endFetch())
        }
    }
}