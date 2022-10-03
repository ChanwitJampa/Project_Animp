import {startFetch,endFetch,errorFetch} from './statusAction'
import { getAllAnime } from '../api/anime'
import axios from 'axios';
export const SET_LIST = 'SET_LIST'

export function setList(list){
    return{
        type:SET_LIST,
        payload:list
    }
}
export function fetchAnimeAsync(){
    return async function(dispatch){
        return await axios('localhost:5000/animes').then((data)=>{
            dispatch(startFetch())
            dispatch(setList(data.json()))
            dispatch(errorFetch(''))
            dispatch(endFetch())
        }).catch(error=>{
            dispatch(setList(null))
            dispatch(errorFetch(error))
            dispatch(endFetch())
        })
    }
}