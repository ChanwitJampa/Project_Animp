import Modal from '@mui/material/Modal';
import { useNavigate } from "react-router-dom";
import './index.scss'
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box';

const AdminAddAnimeModal = (props) => {
    const { open, onClose, anime, mode } = props
    const navigate = useNavigate()

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
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
                            placeholder="e-mail"
                        />
                    </FormControl>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <h3>Video (link)</h3>
                            <TextField
                                hiddenLabel
                                required
                                id="outlined-adornment"
                                placeholder="e-mail"
                            />
                            <h3>Video (link)</h3>
                            <TextField
                                hiddenLabel
                                required
                                id="outlined-adornment"
                                placeholder="e-mail"
                            />
                        </div>
                    </Box>
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
                            placeholder="e-mail"
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
                            placeholder="e-mail"
                        />
                    </FormControl>
                </div>
            </div>
        </Modal>
    )
}
export default AdminAddAnimeModal