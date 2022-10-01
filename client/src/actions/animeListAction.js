import {startFetch,endFetch,errorFetch} from './statusAction'
import { searchAnime,getAllAnime } from '../api/anime'

export const ADD_TO_LIST = 'ADD_TO_LIST'
export const DELETE_LIST = 'DELETE_LIST'
export const SET_LIST = 'SET_LIST'
export const REDUCE_LIST = 'REDUCE_LIST'
export const SEARCH_LIST = 'SEARCH_LIST'

// const action={
//     type:'',
//     payload:{
//         id:'',
//         name:'',S
//         year:'',
//         image:''
//     }
// }
//Action creators
export function addToList(addedAnime){
    return{
        type:ADD_TO_LIST,
        payload:addedAnime
    }
}
export function delteList(id){
    return{
        type:DELETE_LIST,
        payload:id
    }
}
export function setList(list){
    return{
        type:SET_LIST,
        payload:list
    }
}
export function reduceList(reduceAnime){
    return{
        type:REDUCE_LIST,
        payload:reduceAnime
    }
}
export function fetchAnimeAsync(){
    return async function(dispatch){
        try{
            dispatch(startFetch())

            const anime = await getAllAnime()

            if(anime){
                dispatch(setList(anime))
                dispatch(errorFetch(''))
                dispatch(endFetch())
            }
        }catch(error){
            dispatch(setList(null))
            dispatch(errorFetch(error))
            dispatch(endFetch())
        }
    }
}