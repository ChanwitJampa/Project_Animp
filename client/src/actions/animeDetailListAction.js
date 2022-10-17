import {startFetch,endFetch,errorFetch} from './statusAction'
export const SET_ANIME_DETAIL_LIST = 'SET_ANIME_DETAIL_LIST'
export const ADD_ANIME_DETAIL_LIST = 'ADD_ANIME_DETAIL_LIST'

export function setList(list){
    return{
        type:SET_ANIME_DETAIL_LIST,
        payload:list
    }
}
export function addToList(addedAnime){
    return{
        type:ADD_ANIME_DETAIL_LIST,
        payload:addedAnime
    }
}
export function fetchAnimeByAccountAsync(id){
    return async function(dispatch){
        try{
            dispatch(startFetch())
            await fetch(`http://localhost:5000/getAnimeByUser/${id}`).
            then((response) => response.json())
            .then((animelist) => {
                console.log(animelist)
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