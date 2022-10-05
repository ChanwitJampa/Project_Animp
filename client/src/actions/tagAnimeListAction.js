import {startFetch,endFetch,errorFetch} from './statusAction'
export const SET_TAGANIME_LIST = 'SET_TAGANIME_LIST'

export function setList(list){
    return{
        type:SET_TAGANIME_LIST,
        payload:list
    }
}
export function fetchTagByAnimeIdAsync(id){
    return async function(dispatch){
        try{
            dispatch(startFetch())
            await fetch(`http://localhost:5000/tagDetails/anime/${id}`).
            then((response) => response.json())
            .then((taglist) => {
                console.log(taglist)
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