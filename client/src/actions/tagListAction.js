import {startFetch,endFetch,errorFetch} from './statusAction'
export const SET_TAG_LIST = 'SET_TAG_LIST'

export function setList(list){
    return{
        type:SET_TAG_LIST,
        payload:list
    }
}
export function fetchTagAsync(){
    return async function(dispatch){
        try{
            dispatch(startFetch())
            await fetch(`http://localhost:5000/getAllTags`).
            then((response) => response.json())
            .then((taglist) => {
                dispatch(setList(taglist))
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