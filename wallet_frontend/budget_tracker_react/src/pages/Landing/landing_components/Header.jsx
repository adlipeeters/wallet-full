import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { images } from '../../../constants'
import styles from './Header.module.scss'
import { BrowserRouter, Routes, Route, useLocation, Navigate, useNavigate, Link } from 'react-router-dom'
import { selectCurrentToken } from "../../../features/auth/authSlice"
import { useDispatch, useSelector } from 'react-redux'


const pages = ['Get Started'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const navigate = useNavigate()
    const location = useLocation()

    const token = useSelector(selectCurrentToken)

    return (
        <AppBar position="static" className={location.pathname === '/welcome' ? styles.appBar : styles.appBar__withoutBackground} >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Link to='/welcome' state={{ from: location }} replace>
                        <img className={styles.landing__logo} src={images.logo} alt="logo" />
                    </Link>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        // href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'Roboto, sans-serif',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Wallet
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <Link to='/welcome' state={{ from: location }} replace>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <img className={styles.landing__logo_mobile} src={images.logo} alt="logo" />
                            </IconButton>
                        </Link>
                        {/* <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                           
                        </Menu> */}
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        // href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            // fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Wallet
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {/* {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))} */}
                    </Box>
                    {/* {
                        token ? '' :
                            <Link to='pricing'>
                                <Typography textAlign="center" sx={{ fontFamily: 'Roboto, sans-serif', marginRight: '20px' }}>Get Started</Typography>
                            </Link>
                    } */}
                    {
                        token ?
                            <Link to="/">
                                <Button color="inherit" sx={{ border: '1px solid #fff', borderRadius: '10px', transition: '0.35s', '&:hover': { transform: 'scale(1.05)' } }}>Profile</Button>
                            </Link>
                            :
                            <Link to="login">
                                <button className={styles.loginBtn}>
                                    {/* <Typography
                                        variant="p"
                                        noWrap
                                        component="a"
                                        // href="/"
                                        sx={{
                                            fontFamily: 'Roboto, sans-serif',
                                            fontWeight: 500,
                                            letterSpacing: '.2rem',
                                            color: 'inherit',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        Login
                                    </Typography> */}
                                    Login
                                </button>
                                {/* <Button color="inherit" sx={{ border: '1px solid #fff', borderRadius: '10px', transition: '0.35s', '&:hover': { transform: 'scale(1.05)' } }}>Login</Button> */}
                            </Link>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;