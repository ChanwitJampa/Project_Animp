import Modal from '@mui/material/Modal';
import { useNavigate } from "react-router-dom";
import './index.scss'
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField'
import { useState, useEffect } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const seasonOptions = [
    { value: 'Winter', label: 'Winter' },
    { value: 'Spring', label: 'Spring' },
    { value: 'Summer', label: 'Summer' },
    { value: 'Fall', label: 'Fall' }
]

const AdminAddAnimeModal = (props) => {
    const { open, onClose, anime, mode } = props
    const navigate = useNavigate()

    const [studio, setStudio] = useState("")
    const [season, setSeason] = useState("")
    const [year, setYear] = useState("")
    const onChangItem = name => event => {
        if (name == "studio") {
            setStudio(event)
            props.studio(name, event.value)
        } else if (name == "season") {
            setSeason(event)
            props.season(name, event.value)
        } else if (name == "year") {
            setYear(event)
            props.year(name, event.value)
        }
    }
    const clearValue = () => {
        setStudio("")
        setSeason("")
        setYear("")
        props.isClear(true)
    }
    return (
        <div className='modal-body'>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='modal-body'
            >
                <div className="modal-addanime-modalStyles">
                    {mode == "create" ? <h1>Add New Anime</h1> : <h1>Edit Anime</h1>}
                    <div className="modal-addanime-container">
                        <FormControl
                            fullWidth
                            sx={{
                                mb: 3
                            }}
                            variant="standard"
                        >
                            <h3>Anime name</h3>
                            <TextField
                                hiddenLabel
                                required
                                id="outlined-adornment"
                                placeholder="Anime name"
                            />
                        </FormControl>
                        <div className='modal-addanime-form'>
                            <FormControl
                                variant="standard"
                                sx={{
                                    width: 240,
                                    mb: 3
                                }}
                            >
                                <h3>Score</h3>
                                <TextField
                                    hiddenLabel
                                    required
                                    id="outlined-adornment"
                                    placeholder="Score"
                                />
                            </FormControl>
                            <FormControl
                                variant="standard"
                                sx={{
                                    width: 240,
                                    mb: 3
                                }}
                            >
                                <h3>Studio</h3>
                                <TextField
                                    hiddenLabel
                                    required
                                    id="outlined-adornment"
                                    placeholder="Studio"
                                />
                            </FormControl>
                        </div>
                        <div className='modal-addanime-form'>
                            <FormControl
                                variant="standard"
                                sx={{
                                    width: 240,
                                    mb: 3
                                }}
                            >
                                <h3>Season</h3>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={season}
                                    name="season"
                                    label="Season"
                                    onChange={onChangItem("season")}
                                >{seasonOptions.map((item) => (
                                    <MenuItem value={item.value}>{item.label}</MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                            <FormControl
                                variant="standard"
                                sx={{
                                    width: 240,
                                    mb: 3
                                }}
                            >
                                <h3>Year</h3>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        views={['year']}
                                        value={year}
                                        name="year"
                                        onChange={onChangItem("year")}
                                        renderInput={(params) => <TextField {...params} helperText={null} />}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </div>
                        <div className='modal-addanime-form'>
                            <FormControl
                                variant="standard"
                                sx={{
                                    width: 240,
                                    mb: 3
                                }}
                            >
                                <h3>Episodes</h3>
                                <TextField
                                    hiddenLabel
                                    required
                                    id="outlined-adornment"
                                    placeholder="Ex 25, 1, 13"
                                />
                            </FormControl>
                            <FormControl
                                variant="standard"
                                sx={{
                                    width: 240,
                                    mb: 3
                                }}
                            >
                                <h3>Duration</h3>
                                <TextField
                                    hiddenLabel
                                    required
                                    id="outlined-adornment"
                                    placeholder="Ex 25 min. per ep."
                                />
                            </FormControl>
                        </div>
                        <FormControl
                            fullWidth
                            sx={{
                                mb: 3
                            }}
                            variant="standard"
                        >
                            <h3>Image (link)</h3>
                            <TextField
                                hiddenLabel
                                required
                                id="outlined-adornment"
                                placeholder="Ex. https://images5.alphacoders.com/587/thumbbig-587597.webp"
                            />

                        </FormControl>
                        <FormControl
                            fullWidth
                            sx={{
                                mb: 3
                            }}
                            variant="standard"
                        >
                            <h3>Video (link)</h3>
                            <TextField
                                hiddenLabel
                                required
                                id="outlined-adornment"
                                placeholder="Ex. https://www.youtube.com/embed/eKoD2CRr_KA"
                            />
                        </FormControl>
                        <FormControl
                            fullWidth
                            sx={{
                                mb: 3
                            }}
                            variant="standard"
                        >
                            <h3>Wallpaper (link)</h3>
                            <TextField
                                hiddenLabel
                                required
                                id="outlined-adornment"
                                placeholder="Ex. https://images5.alphacoders.com/587/thumbbig-587597.webp"
                            />
                        </FormControl>
                        <FormControl
                            fullWidth
                            sx={{
                                mb: 3
                            }}
                            variant="standard"
                        >
                            <h3>Descript</h3>
                            <TextField
                                hiddenLabel
                                id="outlined-multiline-static"
                                multiline
                                rows={4}
                            />
                        </FormControl>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
export default AdminAddAnimeModal