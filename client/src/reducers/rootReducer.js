import {combineReducers} from 'redux'

import { animeListReducer } from './animeListReducer'
import { authReducer } from './authReducer'
import { statusReducer } from './statusReducer'
import { myAnimeListReducer } from './myAnimeListReducer'
import { tagListReducer } from './tagListReducer' 
import { studioListReducer } from './studioListReducer'
import { animeDetailListReducer} from './animeDetailListReducer'
import { tagAnimeListReducer} from './tagAnimeListReducer'
export const rootReducer=combineReducers({
    animeList: animeListReducer,
    auth: authReducer,
    status: statusReducer,
    myAnimeList :myAnimeListReducer,
    tagList :tagListReducer,
    stduioList: studioListReducer,
    accountAnimeList:animeDetailListReducer,
    tagAnimeList:tagAnimeListReducer
})
//{animeList:[],auth:{user:null},status:{loading: false,error:''}}