import { SET_TAG_LIST} from "../actions/tagListAction"

const initialState=[]
export function tagListReducer(state=initialState,action){
    switch(action.type){
        case SET_TAG_LIST:
            return action.payload
        default:
            return state
    }
    
}