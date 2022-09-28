import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TagIcon from '@mui/icons-material/Tag';
import MenuIcon from '@mui/icons-material/Menu';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import MovieIcon from '@mui/icons-material/Movie';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import CampaignIcon from '@mui/icons-material/Campaign';
import { pink } from '@mui/material/colors';
import { BrowserRouter, Redirect, Route ,Routes} from 'react-router-dom'
import AdminHomePage from '../../pages/AdminHomePage';
import AdminAnimePage from '../../pages/AdminAnimePage';
import AdminAnimeTagPage from '../../pages/AdminAnimeTagPage';
import { useNavigate } from "react-router-dom";
const drawerWidth = 240;

function SidebarAdmin(props) {
    const { window} = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const navigate =useNavigate()
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const SideList = [
        { id: '1', item: "Anime", icon: <LocalMoviesIcon/> ,link:"/adminanime"},
        { id: '2', item: "Anime Tag", icon:  <TagIcon/>,link:"/admintaganime"},
        { id: '3', item: "Studio", icon:  <MovieIcon/>,link:"/" },
        { id: '4', item: "User", icon:  <AssignmentIndIcon/>,link:"/"},
        { id: '5', item: "Wallpaper", icon:  <WallpaperIcon/>,link:"/" },
        { id: '6', item: "News", icon: <CampaignIcon/>,link:"/" }
    ]
    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {SideList.map((text, index) => (
                    <ListItem key={text.item} disablePadding onClick={()=>navigate(`${text.link}`)}>
                        <ListItemButton>
                            <ListItemIcon>
                                {text.icon}
                            </ListItemIcon>
                            <ListItemText primary={text.item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    backgroundColor: pink[400],
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Anime-Map&ToonView
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Routes>
                    <Route path="/" element={<AdminHomePage/>}/>
                    <Route path="/adminanime" element={<AdminAnimePage/>}/>
                    <Route path="/admintaganime" element={<AdminAnimeTagPage/>}/>
                </Routes>
            </Box>
        </Box>
    );
}

SidebarAdmin.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default SidebarAdmin;
