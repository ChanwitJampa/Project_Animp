import { useEffect, useState } from 'react';
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
const ProgressBar = (props) => {
    const { completed } = props;
    var fillerStyles = {
      height: '100%',
      width: `${((completed%6)/6)*100}%`,
      backgroundColor: `${levelOfGame[0].color}`,
      borderRadius: 'inherit',
      textAlign: 'right',
    }
    const labelStyles = {
        paddingTop:10,
      color: 'white',
      fontWeight: 'bold',
    }
    const [levelOfUser,setLevelOfUser]=useState()
    useEffect(()=>{
      const filterLevel=(item)=>{
        if(item.numberOfAnime>=completed){
            return item
          }
      }
      setLevelOfUser(levelOfGame.filter(filterLevel).map((item)=>item.color))    
    },[completed])
     fillerStyles = {
        height: '100%',
        width: `${((completed%6)/6)*100}%`,
        //backgroundColor: `${levelOfUser[0]}`,
        backgroundColor: `${levelOfGame[0].color}`,
        borderRadius: 'inherit',
        textAlign: 'right',
      }
      console.log(levelOfUser)
    return (
      <div className="progress-container">
        <div style={fillerStyles}>
          <div style={labelStyles}>{`${((completed%6)/6)*100}%`}</div>
        </div>
      </div>
    );
  };
  
  export default ProgressBar;