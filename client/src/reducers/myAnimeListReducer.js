import { ADD_TO_MY_LIST } from "../actions/myAnimeListAction"
import { DELETE_MY_LIST } from "../actions/myAnimeListAction"
import { SET_MY_LIST} from "../actions/myAnimeListAction"
const initialState=[]
export function myAnimeListReducer(state=initialState,action){
    const foundItem = state.find(item=>item.animes_id===action.payload.animes_id)
    let updatedList
    switch(action.type){
        case ADD_TO_MY_LIST:
            if(!foundItem){
                updatedList=[...state,action.payload]
            }else{
                updatedList=state.map(item=>({
                    ...item,
                    quantity:item.animes_id=== foundItem.animes_id ? item.quantity+1 :item.quantity
                }))
            }
            return updatedList
        case DELETE_MY_LIST:
            return  state.filter(item=>item.animes_id!==action.payload)
        case SET_MY_LIST:
            return action.payload
        default:
            return state
    }
    
}
