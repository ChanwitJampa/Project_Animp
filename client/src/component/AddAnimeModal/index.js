import React, { useRef, useState,useEffect } from "react";
import ReactDOM from 'react-dom';
import './index.scss'
import Modal from '@mui/material/Modal';

const AddAnimeModal=(props)=>{
    const {open}=props
    const [isOpen, setOpen] = useState();
    const handleClose = () =>{
      setOpen(false);
    }
    useEffect(()=>{
      setOpen(open)
    },[])
    return(
    <Modal 
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
        <div className="modalStyles"><h1>Hello</h1>
        </div>
    </Modal>);
}
export default AddAnimeModal;