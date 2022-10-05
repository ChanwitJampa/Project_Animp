import { SET_ANIME_DETAIL_LIST } from "../actions/animeDetailListAction"
import { ADD_ANIME_DETAIL_LIST } from "../actions/animeDetailListAction"

const initialState=[]
export function animeDetailListReducer(state=initialState,action){
    switch(action.type){
        case SET_ANIME_DETAIL_LIST:
            return action.payload
        default:
            return state
    }
    
}