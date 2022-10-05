import {startFetch,endFetch,errorFetch} from './statusAction'
export const SET_LIST = 'SET_LIST'

export function setList(list){
    return{
        type:SET_LIST,
        payload:list
    }
}
export function fetchAnimeAsync(){
    return async function(dispatch){
        try{
            dispatch(startFetch())
            await fetch(`http://localhost:5000/animes`).
            then((response) => response.json())
            .then((animelist) => {
                dispatch(setList(animelist))
                dispatch(errorFetch(''))
                dispatch(endFetch())
            });
        }catch(error){
            console.log("Error")
            dispatch(setList(null))
            dispatch(errorFetch(error))
            dispatch(endFetch())
        }
    }
}