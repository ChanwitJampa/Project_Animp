import "./index.scss";
import { useState,useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from '@mui/material/Box';
import {fetchAnimeAsync} from '../../actions/animeListAction'
import {useDispatch,useSelector} from 'react-redux'

const SearchBarAnime = () => {
  const dispatch=useDispatch()
  const dataHistory = [
    "Paris",
    "London",
    "New York",
    "Tokyo",
    "Berlin",
    "Buenos Aires",
    "Cairo",
    "Canberra",
    "Rio de Janeiro",
    "Dublin",
  ];
  const DataAnime =useSelector(state=>state.animeList)
  const [keySearch,setKeySearch]=useState("")
  const [listKeySearch,setListKeySearch]=useState([])
  const onChangeSearch=(key)=>{
    
  }
  const filterKey=(item)=>{
    if(item.name==keySearch){
      console.log(item)
      return item
    }else{
      console.log(item)
      return item
    } 
  }
  
  useEffect(()=>{
    dispatch(fetchAnimeAsync())
  })
  useEffect(()=>{
    setListKeySearch(DataAnime.slice(1,10).filter(filterKey))
  },[keySearch])
  return (
    <div className="searchBar">
      <Autocomplete
        disablePortal
        id="free-solo-demo"
        freeSolo
        options={listKeySearch}
        sx={{
          width: 240,
        }}
        renderOption={(props, option) => (
          <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
            <img
              loading="lazy"
              width="20"
              alt=""
            />
            {option.name} ({option.studios}) +{option.year}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            hiddenLabel
            placeholder="Search"
            className="searchBar-input"
            onChange={(event)=>{setKeySearch(event.target.value)}}
          />
        )}
      />
      <IconButton aria-label="toggle password visibility" className="searchBar-button">
        <SearchIcon />
      </IconButton>
    </div>
  );
};
export default SearchBarAnime;
