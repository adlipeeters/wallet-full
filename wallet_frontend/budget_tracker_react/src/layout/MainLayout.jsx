import React, { useEffect } from 'react'
import './main-layout.scss'
import { Outlet, useLocation, Navigate, } from 'react-router-dom'
import Sidebar from '../components/sidebar/Sidebar'
import TopNav from '../components/topnav/TopNav'
import { useSelector } from "react-redux"
import { useDispatch } from 'react-redux'
import { selectCurrentToken, loginNotification } from "../features/auth/authSlice.js"
import { handleNotification, selectCurrentUser } from '../features/auth/authSlice'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';


function TransitionRight(props) {
    return <Slide {...props} direction="down" />;
}
const MainLayout = () => {
    const token = useSelector(selectCurrentToken)
    const user = useSelector(selectCurrentUser)
    const notificationState = useSelector(loginNotification)
    const location = useLocation()
    const dispatch = useDispatch()
    const [state, setState] = React.useState({
        open: notificationState,
        vertical: 'top',
        horizontal: 'center',
    });

    const { vertical, horizontal, open } = state;

    const handleClick = (newState) => () => {
        setState({ open: true, ...newState });
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    useEffect(() => {
        setTimeout(() => {
            dispatch(handleNotification(false))
        }, 2500);
    })
    return (
        token ? (
            <>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    onClose={handleClose}
                    message=""
                    key={vertical + horizontal}
                    TransitionComponent={TransitionRight}
                    autoHideDuration={3500}
                    ContentProps={{
                        sx: {
                            background: "green"
                        }
                    }}
                >
                    <Alert
                        sx={{
                            background: "white",
                            borderRadius: "30px",
                            boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                            color: '#4E4D4F'
                        }}
                    >
                        <b>Hi {user.name}</b><br />
                        You have successfully logged in!
                    </Alert>
                </Snackbar>
                <Sidebar />
                <div className="main">
                    <div className="main__content">
                        <TopNav />
                        <Outlet />
                    </div>
                </div>
            </>
        ) :
            <Navigate to="/welcome" state={{ from: location }} replace />
    )
}

export default MainLayout
