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

    }
    //const displayAnime=Dataanime.filter(filterAnime)
    return(
        <div className='container'>
            <h1 className='header'>Top Anime</h1>
            <FilterTopAnime 
                studio={onInputChange}
                season={onInputChange}
                year={onInputChange}/>
            <TableTopAnime/>
        </div>
    )
}
export default TopAnimePage;