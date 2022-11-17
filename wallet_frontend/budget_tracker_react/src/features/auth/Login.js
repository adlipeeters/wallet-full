import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials, handleNotification } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import { selectCurrentToken } from "./authSlice.js"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Button from '../../components/button/Button'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import styles from '../../scss/Custom.module.scss'
import Notification from '../../components/notification/Notification'
import { validateLoginForm } from '../helpers/Validator'
import Tooltip from '@mui/material/Tooltip';


const theme = createTheme({
    palette: {
        primary: {
            main: '#2575fc'
        },
    },
});

const Wrapper = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
})

const Label = styled('p')({
    color: "#4E4D4F",
    textTransform: 'uppercase',
    fontWeight: '600',
    fontSize: '16px',
})
const Login = () => {
    const navigate = useNavigate()
    const [credentials, setLoginCredentials] = useState({
        email: '',
        password: '',
        showPassword: false,
    })

    const [isValid, setIsValid] = useState(false)

    useEffect(() => {
        const isFormValid = validateLoginForm({ mail: credentials.email, password: credentials.password })
        if (isFormValid) {
            setIsValid(true)
        } else {
            setIsValid(false)
        }

    }, [credentials])
    const [open, setOpen] = useState(true);

    const [error, setError] = useState({ show: false, message: '' })



    const handleChange = (event) => {
        setLoginCredentials({
            ...credentials, [event.target.name]: event.target.value
        })
    }
    const handleClickShowPassword = () => {
        setLoginCredentials({
            ...credentials,
            showPassword: !credentials.showPassword,
        });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const [login, { isLoading, isSuccess, isError }] = useLoginMutation()

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError({ show: false, message: '' })

        try {
            let data = { email: credentials.email, password: credentials.password }
            let userData = await login(data).unwrap()

            dispatch(setCredentials({ ...userData }))
            dispatch(handleNotification(true))
            navigate('/')
            // if (userData) {
            // }
        } catch (err) {
            // console.log(err)
            setError({ show: true, message: err?.data?.message })

        }
    }

    const token = useSelector(selectCurrentToken)

    return (
        <div style={{}}>
            <ThemeProvider theme={theme}>
                {/* <CssBaseline /> */}
                <Container component="main" maxWidth="sm" sx={{ mb: 4, marginTop: '250px', }} className={styles.fadeAnimation}>
                    <Paper variant="" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 5 }, borderRadius: '30px', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}>
                        <Typography component="h1" variant="h4" align="center">
                            Log In to Wallet
                        </Typography>
                        <Typography component="p" variant="p" sx={{ marginTop: '5px', fontSize: '14px' }} align="center">
                            Don't have a Wallet account?&nbsp;
                            <Link to="../pricing"><span style={{ color: '#2575fc' }}>Register</span></Link>
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                            <form onSubmit={handleSubmit}>
                                <FormControl variant="standard" sx={{ minWidth: '100%', width: '100%' }}>
                                    <TextField
                                        autoFocus
                                        autoComplete="on"
                                        margin="dense"
                                        label="Email"
                                        type="email"
                                        name="email"
                                        value={credentials.email}
                                        onChange={handleChange}
                                        fullWidth
                                        color="primary"
                                        variant="standard"
                                        InputProps={{
                                            sx: {
                                                "& input": {
                                                    color: '#4E4D4F',
                                                    borderColor: '#8624DB'
                                                }
                                            }
                                        }}
                                    />
                                </FormControl>
                                <FormControl variant="standard" sx={{ minWidth: '100%', width: '100%' }}>
                                    <TextField
                                        // autoFocus
                                        autoComplete="off"
                                        margin="dense"
                                        label="Password"
                                        type={credentials.showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={credentials.password}
                                        onChange={handleChange}
                                        fullWidth
                                        color="primary"
                                        variant="standard"
                                        InputProps={{
                                            sx: {
                                                "& input": {
                                                    color: '#4E4D4F',
                                                    borderColor: '#8624DB'
                                                }
                                            },
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                    >
                                                        {credentials.showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}

                                    />
                                </FormControl>
                                <FormControl variant="standard" sx={{ minWidth: '100%', marginTop: '30px', width: '100%' }}>
                                    <Tooltip title={!isValid ? 'Enter correct e-mail address and password should contains between 6 and 15 characters' : 'Press to log in'}>
                                        <div style={{ minWidth: '100%' }}>
                                            <Button loginBtn={true} type="primary" title="Login" disabled={!isValid} />
                                        </div>
                                    </Tooltip>
                                </FormControl>
                            </form>
                        </Box>
                    </Paper>
                </Container>
            </ThemeProvider>
            {
                isLoading ? <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                // onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop> : ''
            }
            {
                error?.show ?
                    <Notification isOpen={true} title={error?.message} type="error" vertical="top" horizontal="center" />
                    : ''
            }
        </div>
    )
}
export default Login