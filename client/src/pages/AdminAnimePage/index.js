import { useState,useEffect } from 'react';
import AdminTableAnime from "../../component/AdminTableAnime"
import './index.scss'
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AdminAddAnimeModal from '../../component/AdminAddAnimeModal';

const AdminAnimePage = () => {
    const [age, setAge] = useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };

    const [modalAnime,setModalAnime]=useState()
    const [modalMode,setModalMode]=useState('')
    const [open, setOpen] = useState(false);
    const handleOpen = (item,mode) => {
        setModalMode(mode);
        if(mode=="edit"){
            setModalAnime(item)
        }
        setOpen(true);
    }
    const handleClose = () =>setOpen(false);
    return (
        <div>
            <div className="adminAnime-header">
                <h1>Anime</h1>
                <button onClick={()=>handleOpen([],"create")}>Add Anime</button>
            </div>
            <Paper
                elevation={3}
                sx={{
                    mb: 3,
                    p: 2
                }}>
                <div className="adminAnime-container-paper">
                    <div className='adminAnime-container-paper-item'>
                        <FormControl sx={{ m: 1, width: 220 }}>
                            <InputLabel id="demo-simple-select-label">Studio</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Studio"
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className='adminAnime-container-paper-item'>
                        <FormControl sx={{ m: 1, width: 220 }}>
                            <InputLabel id="demo-simple-select-label">Season</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Season"
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className='adminAnime-container-paper-item'>
                        <FormControl sx={{ m: 1, width: 220 }}>
                            <InputLabel id="demo-simple-select-label">Year</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Year"
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className='adminAnime-container-paper-item'>
                    <button>Clear</button>
                    </div>
                </div>

            </Paper>
            <AdminTableAnime/>
            <AdminAddAnimeModal open={open} onClose={handleClose} anime={modalAnime} mode={modalMode}/>
        </div>
    )
}
export default AdminAnimePage