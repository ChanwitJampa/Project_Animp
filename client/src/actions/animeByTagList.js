import {startFetch,endFetch,errorFetch} from './statusAction'
export const SET_ANIMEBYTAG_LIST = 'SET_ANIMEBYTAG_LIST'
export function setAnimeList(list){
    return{
        type:SET_ANIMEBYTAG_LIST,
        payload:list
    }
}
export function fetchAnimeByTagIdAsync(id){
    return async function(dispatch){
        try{
            dispatch(startFetch())
            await fetch(`http://localhost:5000/tagDetails/tag/${id}`).
            then((response) => response.json())
            .then((animelist) => {
                console.log(animelist)
                dispatch(setAnimeList(animelist))
                dispatch(errorFetch(''))
                dispatch(endFetch())
            });
        }catch(error){
            console.log("Error")
            dispatch(setAnimeList(null))
            dispatch(errorFetch(error))
            dispatch(endFetch())
        }
    }
}