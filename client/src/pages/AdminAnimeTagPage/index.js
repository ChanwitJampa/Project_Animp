import './index.scss'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AdminTableAnimeTag from '../../component/AdminTableAnimeTag';
const AdminAnimeTagPage = () => {
    return (<div>
        <div className='adminAnime-header'>
            <h1>Tag Anime</h1>
            <button>Add Tag</button>
        </div>
        <Paper
            elevation={3}
            sx={{
                mb: 3,
                p: 2
            }}>

        </Paper>
        <Grid sx={{ flexGrow: 1 }}>
            <Grid >
                <AdminTableAnimeTag />
            </Grid>
            <Grid>
                <AdminTableAnimeTag />
            </Grid>
        </Grid>

    </div>)
}
export default AdminAnimeTagPage