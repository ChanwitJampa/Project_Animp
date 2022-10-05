import { SET_TAGANIME_LIST } from "../actions/tagAnimeListAction"

const initialState=[]
export function tagAnimeListReducer(state=initialState,action){
    switch(action.type){
        case SET_TAGANIME_LIST:
            return action.payload
        default:
            return state
    }
    
}