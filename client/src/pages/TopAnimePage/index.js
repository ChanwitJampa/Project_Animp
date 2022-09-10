import './index.scss'
import FilterTopAnime from '../../component/FilterTopAnime';
import TableTopAnime from '../../component/TableTopAnime';
import Dataanime from '../../assets/anime.json'
import { useEffect, useState } from 'react';
const TopAnimePage=()=>{
    const [anime,setAnime]=useState([])
    const [studio,setStudio]=useState("")
    const [season,setSeason]=useState("")
    const [year,setYear]=useState("")
    const onInputChange=(name,value)=>{
        //setStateFilter({...stateFilter,[name]:value})
        if(name=="studio"){
            setStudio(value)
        }else if(name=="season"){   
            setSeason(value)
        }else if(name=="year"){
            setYear(value)
        }
        console.log(name+"=="+value)
    }
    const isClearChange=(value)=>{
        setStudio("")
        setSeason("")
        setYear("")
    }
    const filterAnime=(item)=>{
        if(studio=="" && season=="" && year==""){
            return item
        }else if(studio==item.studios && season=="" && year==""){
            return item
        }else if(studio=="" && season==item.seasonal && year==""){
            return item
        }else if(studio=="" && season=="" && year==item.year){
            return item
        }else if(studio==item.studios && season==item.seasonal && year==""){
            return item
        }else if(studio=="" && season==item.seasonal && year==item.year){
            return item
        }else if(studio==item.studios && season=="" && year==item.year){
            return item
        }else if(studio==item.studios && season==item.seasonal && year==item.year){
            return item
        }
    }
    const displayAnime=Dataanime.filter(filterAnime).sort((firstItem, secondItem) => secondItem.score - firstItem.score);
    return(
        <div className='container'>
            <h1 className='header'>Top Anime</h1>
            <FilterTopAnime 
                studio={onInputChange}
                season={onInputChange}
                year={onInputChange}
                isClear={isClearChange}/>
            <TableTopAnime
                anime={displayAnime}/>
        </div>
    )
}
export default TopAnimePage;