import { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import './index.scss'
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { pink } from '@mui/material/colors';
import { useNavigate } from "react-router-dom";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AddAnimeModal = (props) => {
  const { open, onClose, anime } = props
  const [modalAnime, setModalAnime] = useState([])

  const [score, setScore] = useState('');
  const [year,setYear] = useState('');

  const handleChange = (event) => {
    setScore(event.target.value);
  };
  const navigate =useNavigate()
  let dropzoneModalStyle = {
    width: `100%`,
    height: `460px`,
    backgroundImage: `url(${modalAnime.wallpaper})`,
    backgroundRepeat: `no-repeat`,
    backgroundPosition: `center center`,
    backgroundSize: `cover`,
    borderTopLeftRadius: `15px`,
    borderTopRightRadius: `15px`
  };
  useEffect(() => {
    if (anime && open) {
      console.log(anime)
      setModalAnime(anime)
      setScore('')
      setYear('')
    }
  }, [anime, open])

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="modalStyles">
        <div style={dropzoneModalStyle}>
        </div>
        <h1 className="modal-header" onClick={()=>navigate(`/anime/${modalAnime.id}`)}>{modalAnime.name}</h1>
        <div className="modal-buttom">
          <div>
            <h2>Status</h2>
            <h1>Watched</h1>
          </div>
          <div>
            <h2>My score</h2>
            <FormControl 
                className='modal-select'
                fullWidth>    
              <Select
                id="demo-simple-select-helper"
                value={score}
                hiddenLabel
                onChange={handleChange}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={1}>1</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <h2>Watch in</h2>
            <FormControl 
                className='modal-select'
                fullWidth>    
              <Select
                id="demo-simple-select-helper"
                value={year}
                hiddenLabel
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl></div>
          <div>
            <tr>
              <td>Score:</td><td>{modalAnime.score}</td>
            </tr>
            <tr>
              <td>Tag:</td><td>{modalAnime.seasonal}</td>
            </tr>
            <tr>
              <td>Year:</td><td>{modalAnime.year}</td>
            </tr>
          </div>
        </div>
      </div>
    </Modal>);
}
export default AddAnimeModal;