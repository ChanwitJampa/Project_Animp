import { SET_STUDIO_LIST} from "../actions/studioAction"

const initialState=[]
export function studioListReducer(state=initialState,action){
    switch(action.type){
        case SET_STUDIO_LIST:
            return action.payload
        default:
            return state
    }
    
}