import './index.scss'
import { useState } from 'react';
import { Routes, Route, useParams } from "react-router-dom";
import Dataanime from "../../assets/anime.json"
const SingleStudioPage=()=>{
    let params = useParams();
    const allStudio=Dataanime.map((item)=>item.studios)
    console.log([... new Set(allStudio)])
    //const singleAnime=Dataanime.filter((item)=>{if(item.id==params.id) return item})
}
export default SingleStudioPage;