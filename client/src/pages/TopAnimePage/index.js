import './index.scss'
import FilterTopAnime from '../../component/FilterTopAnime';
import TableTopAnime from '../../component/TableTopAnime';
import Dataanime from '../../assets/anime.json'
import { useEffect, useState } from 'react';
const TopAnimePage=()=>{
    const [anime,setAnime]=useState([])
    const [stateFilter,setStateFilter]=useState({
        studio:"",
        season:"",
        year:""
    })
    const onInputChange=(name,value)=>{
        setStateFilter({...stateFilter,[name]:value})
        console.log(name+"=="+value)
    }
    const filterAnime=(item)=>{
        if(stateFilter.studio=="" && stateFilter.season=="" && stateFilter.year==""){
            return item
        }else if(item.studios==stateFilter.studio && stateFilter.season=="" && stateFilter.year==""){
            return item
        }else if(item.studios==stateFilter.studio && item.seasonal==stateFilter.season && stateFilter.year==""){
            return item
        }else if(item.studios==stateFilter.studio && item.seasonal==stateFilter.season && item.year==stateFilter.year){
            return item
        }
    }
    const displayAnime=Dataanime.filter(filterAnime)
    return(
        <div className='container'>
            <h1 className='header'>Top Anime</h1>
            <FilterTopAnime 
                studio={onInputChange}
                season={onInputChange}
                year={onInputChange}/>
            <TableTopAnime
                anime={displayAnime}/>
        </div>
    )
}
export default TopAnimePage;