import {startFetch,endFetch,errorFetch} from './statusAction'
export const SET_STUDIO_LIST = 'SET_STUDIO_LIST'

export function setList(list){
    return{
        type:SET_STUDIO_LIST,
        payload:list
    }
}
export function fetchStduioAsync(){
    return async function(dispatch){
        try{
            dispatch(startFetch())
            await fetch(`http://localhost:5000/studioes`).
            then((response) => response.json())
            .then((studiolist) => {
                dispatch(setList(studiolist))
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