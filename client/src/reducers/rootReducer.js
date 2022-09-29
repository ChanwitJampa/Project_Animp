import {combineReducers} from 'redux'

import { animeListReducer } from './animeListReducer'
import { authReducer } from './authReducer'
import { statusReducer } from './statusReducer'

export const rootReducer=combineReducers({
    animeList: animeListReducer,
    auth: authReducer,
    status: statusReducer
})
//{animeList:[],auth:{user:null},status:{loading: false,error:''}}