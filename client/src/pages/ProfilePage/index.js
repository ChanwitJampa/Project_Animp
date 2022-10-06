import {useDispatch,useSelector} from 'react-redux'
import { useState, useEffect } from "react";
import SliderMyAnime from "../../component/SliderMyAnime"
import {fetchAnimeByAccountAsync} from '../../actions/animeDetailListAction'

import './index.scss'
const levelOfGame=[
    {level:1 , label: "Iron" ,numberOfAnime: 6 ,color :"#1EC602"},
    {level:2 , label: "Bronze" ,numberOfAnime: 12 ,color :"#1EB406"},
    {level:3 , label: "Master" ,numberOfAnime: 18 ,color :"#177708"},
    {level:4 , label: "Silver" ,numberOfAnime: 24 ,color :"#2ADCF4"},
    {level:5 , label: "Gold" ,numberOfAnime: 30 ,color :"#1CA0B1"},
    {level:6 , label: "Platinum" ,numberOfAnime: 36 ,color :"#1C7683"},
    {level:7 , label: "Diamond" ,numberOfAnime: 42 ,color :"#9228E5"},
    {level:8 , label: "Master" ,numberOfAnime: 48 ,color :"#6F20AC"},
    {level:9 , label: "Grandmaster" ,numberOfAnime: 54 ,color :"#47176C"} ,
    {level:10 , label: "Challenger" ,numberOfAnime: 60 ,color :"#19002D"}
  ]
const watchanimeYear=[
    {year:"2022"},

]
const ProfilePage=()=>{
    const dispatch=useDispatch()
    const totalAnime = useSelector(state => state.accountAnimeList)
    const {user} =useSelector((state)=>state.auth)
    //const totalAnime = useSelector(state => state.myAnimeList)
    const labelStyles = {
        paddingTop:10,
      color: 'white',
      fontWeight: 'bold',
    }
    const filterLevel=(item)=>{
      if(item.numberOfAnime>=totalAnime.length){
          return item
      }
    }
    
    const levelOfUser=levelOfGame.filter(filterLevel).map((item)=>item)
    useEffect(()=>{
        dispatch(fetchAnimeByAccountAsync(user.accounts_id))
    },[])
    return(
        <div>
            <div className="profilepage-header"><h1>Profile</h1></div>
            <div className="profilepage-container">
                <div className="profilepage-profile">
                    <div className="profilepage-profile-profile"></div>
                    <h1>Profile</h1>
                </div>
                <div className="profilepage-progress">
                    <h2>{totalAnime.length==0?"Beginer":levelOfUser[0].label}</h2>
                <div className="profilepage-progress-container">
                    <div style={{width:`${((totalAnime.length%6)/6)*100}%`,backgroundColor: `${levelOfUser[0].color}`}} className="profilepage-progress-style">
                        <div style={labelStyles} >{`${ parseInt(((totalAnime.length%6)/6)*100) }%`}</div>
                    </div> 
                </div>
                </div>
            </div>
            <div className="profilepage-header"><h1>My Anime List</h1>
                <div>
                {watchanimeYear.filter((item)=>{if(item)return item}).map((item)=>(
                    <SliderMyAnime year={item.year} myAnime={totalAnime}/>
                ))}
            </div>
            </div>
        </div>
    )
}
export default ProfilePage