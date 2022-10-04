import {combineReducers} from 'redux'

import { animeListReducer } from './animeListReducer'
import { authReducer } from './authReducer'
import { statusReducer } from './statusReducer'
import { myAnimeListReducer } from './myAnimeListReducer'
import { tagListReducer } from './tagListReducer' 

export const rootReducer=combineReducers({
    animeList: animeListReducer,
    auth: authReducer,
    status: statusReducer,
    myAnimeList :myAnimeListReducer,
    tagList :tagListReducer
})
//{animeList:[],auth:{user:null},status:{loading: false,error:''}}