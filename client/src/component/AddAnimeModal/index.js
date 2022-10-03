import { useState, useEffect } from "react";
import "./index.scss";
import Modal from "@mui/material/Modal";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { addToList} from "../../actions/myAnimeListAction"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const AddAnimeModal = (props) => {
  const { open, onClose, anime } = props;
  const [modalAnime, setModalAnime] = useState([]);
  const [score, setScore] = useState();
  const [year, setYear] = useState();

  const onChangItem = name => event => {
    if (name == "score") {
        setScore(event.value)
    }
    else if (name == "year") {
        setYear(event)
    }
    

}
  const navigate = useNavigate();
  let dropzoneModalStyle = {
    width: `100%`,
    height: `420px`,
    backgroundImage: `url(${modalAnime.animes_wallpaper})`,
    backgroundRepeat: `no-repeat`,
    backgroundPosition: `center center`,
    backgroundSize: `cover`,
    borderTopLeftRadius: `15px`,
    borderTopRightRadius: `15px`,
  };
  useEffect(() => {
    if (anime && open) {
      setModalAnime(anime);
      setScore("");
      setYear("");
    }
  }, [anime, open]);
  const MySwal = withReactContent(Swal)
  const myAnimeList = useSelector(state => state.myAnimeList)
  const dispatch = useDispatch()
  const addAnimeToList=()=>{
    onClose()
    MySwal.fire({
      title: <p>Loading</p>,
      didOpen: () => {
        // `MySwal` is a subclass of `Swal` with all the same instance & static methods
        
        MySwal.showLoading()
        dispatch(addToList({ ...modalAnime, quantity: 1 }))
        MySwal.fire({
          title: <strong>Good job!</strong>,
          html: <i>Successfully added to list</i>,
          icon: 'success'
        })
      },
    }).then(() => {
      return MySwal.fire(<p>Shorthand works too</p>)
    })
  }
  
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="modalStyles">
        <div style={dropzoneModalStyle}></div>
        <div className="modal-header">
          <div className="modal-header-detail">
            <h1>{modalAnime.animes_name}</h1>
              <p>Score: {modalAnime.score}  ({modalAnime.animes_score})</p>
          </div>
          
          <button onClick={() => navigate(`/anime/${modalAnime.animes_id}`)}>Detail</button>
        </div>

        <div className="modal-buttom">
          <div>
            <h2>Status</h2>
            <h1>Watched</h1>
          </div>
          <div>
            <h2>My score</h2>
            <FormControl className="modal-select" fullWidth>
              <Select
                id="demo-simple-select-helper"
                value={score}
                name="score"
                hiddenLabel
                onChange={onChangItem("score")}
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
            <FormControl className="modal-select" fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  views={["year"]}
                  value={year}
                  hiddenLabel
                  name="year"
                  minDate={dayjs("1950")}
                  maxDate={dayjs()}
                  onChange={onChangItem("year")}
                  renderInput={(params) => (
                    <TextField {...params} helperText={null} />
                  )}
                />
              </LocalizationProvider>
            </FormControl>
          </div>
          <div>
            <button className="modal-button-addtolist" onClick={addAnimeToList}>Add to List</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default AddAnimeModal;
