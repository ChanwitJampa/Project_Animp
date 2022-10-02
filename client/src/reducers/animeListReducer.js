import { SET_LIST} from "../actions/animeListAction"
//      {
//         id:'',
//         name:'',
//         year:'',
//         image:''
//     }
const initialState=[]
export function animeListReducer(state=initialState,action){
    switch(action.type){
        case SET_LIST:
            return action.payload
        default:
            return state
    }
    
}