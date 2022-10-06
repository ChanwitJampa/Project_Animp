import { SET_ANIMEBYTAG_LIST } from "../actions/animeByTagList"

const initialState=[]
export function animeByTagListReducer(state=initialState,action){
    switch(action.type){
        case SET_ANIMEBYTAG_LIST:
            return action.payload
        default:
            return state
    }
    
}
