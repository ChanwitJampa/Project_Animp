export const ADD_TO_MY_LIST = 'ADD_TO_MY_LIST'
export const DELETE_MY_LIST = 'DELETE_MY_LIST'
export const SET_MY_LIST = 'SET_MY_LIST'


export function addToList(addedAnime){
    return{
        type:ADD_TO_MY_LIST,
        payload:addedAnime
    }
}
export function delteList(id){
    return{
        type:DELETE_MY_LIST,
        payload:id
    }
}
export function setList(list){
    return{
        type:SET_MY_LIST,
        payload:list
    }
}
