import React, { useRef, useState,useEffect } from "react";
import ReactDOM from 'react-dom';
import './index.scss'
import Modal from '@mui/material/Modal';
const style = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const AddAnimeModal=(props)=>{
    const {open,onClose,anime}=props
    const [modalAnime,setModalAnime]=useState([])
    useEffect(()=>{
      if(anime&&open){
        console.log(anime)
        setModalAnime(anime)
      }
    },[anime,open])
    
    return(
      <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="modalStyles">
        <img src={modalAnime.wallpaper}></img>
        <h1>{modalAnime.name}</h1>
        <button>Add to List</button>
      </div>
    </Modal>);
}
export default AddAnimeModal;