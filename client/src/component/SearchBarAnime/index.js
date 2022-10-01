import "./index.scss";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from '@mui/material/Box';
import {fetchAnimeAsync} from '../../actions/animeListAction'
import {useDispatch,useSelector} from 'react-redux'
import { useEffect } from "react";
const SearchBarAnime = () => {
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
  // const anime =useSelector(state=>state.animeList)
  // const dispatch=useDispatch()
  // useEffect(()=>{
  //   dispatch(fetchAnimeAsync())
  // })
  // console.log("Anime=",anime)
  return (
    <div className="searchBar">
      <Autocomplete
        disablePortal
        id="free-solo-demo"
        freeSolo
        options={dataHistory}
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
            {option.label} ({option.code}) +{option.phone}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            hiddenLabel
            placeholder="Search"
            className="searchBar-input"
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
