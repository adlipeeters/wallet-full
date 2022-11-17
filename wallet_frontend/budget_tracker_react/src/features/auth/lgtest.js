import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { setCredentials, handleNotification } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import { selectCurrentToken } from "./authSlice.js"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system'
import TextField from '@mui/material/TextField';
// import Box from '../../components/box/Box'
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
import Input from '@mui/material/Input';
import Button from '../../components/button/Button'

const theme = createTheme({
    palette: {
        primary: {
            main: '#8624DB'
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
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        showPassword: false,
    })

    const handleChange = (event) => {
        setCredentials({
            ...credentials, [event.target.name]: event.target.value
        })
    }
    const handleClickShowPassword = () => {
        setCredentials({
            ...credentials,
            showPassword: !credentials.showPassword,
        });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const [login, { isLoading, isSuccess }] = useLoginMutation()

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(setCredentials({ ...credentials }))

        // console.log(credentials)
        // try {
        //     let data = { email: credentials.email, password: credentials.password }
        //     await login(data).unwrap().then(result => {
        //         dispatch(setCredentials('asdasd'))
        //     }
        //     )
        //     // console.log({ ...userData })
        //     // dispatch(setCredentials({ ...userData }))
        //     // dispatch(handleNotification(true))
        //     // navigate('/', { replace: true })
        //     // if (userData) {
        //     // }
        // } catch (err) {
        //     console.log(err)

        //     if (err.status === 403) {
        //     }
        // }
    }

    const token = useSelector(selectCurrentToken)

    // Or&nbsp;
    // <Link to="../pricing"><span className="font-medium text-purple-main hover:text-purple-hover">Sign Up</span></Link>


    return (
        <>
            <ThemeProvider theme={theme}>
                {/* <CssBaseline /> */}
                <Container component="main" maxWidth="sm" sx={{ mb: 4, marginTop: '250px' }}>
                    <Paper variant="" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, borderRadius: '30px', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}>
                        <Typography component="h1" variant="h4" align="center">
                            Login
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                            <form onSubmit={handleSubmit}>
                                <FormControl variant="standard" sx={{ minWidth: '100%', m: 1, width: '100%' }}>
                                    <TextField
                                        autoFocus
                                        autoComplete="off"
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
                                <FormControl variant="standard" sx={{ minWidth: '100%', m: 1, width: '100%' }}>
                                    <TextField
                                        autoFocus
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
                                            // endAdornment: (
                                            //     <InputAdornment position="end">
                                            //         <IconButton
                                            //             aria-label="toggle password visibility"
                                            //             onClick={handleClickShowPassword}
                                            //             onMouseDown={handleMouseDownPassword}
                                            //         >
                                            //             {credentials.showPassword ? <VisibilityOff /> : <Visibility />}
                                            //         </IconButton>
                                            //     </InputAdornment>
                                            // )
                                        }}

                                    />
                                </FormControl>
                                <FormControl variant="standard" sx={{ minWidth: '100%', m: 1, width: '100%' }}>
                                    {/* <Button onClick={handleSubmit} type="primary" title="Login" /> */}
                                    <button type="submit">Submit</button>
                                </FormControl>
                            </form>
                        </Box>
                    </Paper>
                </Container>
            </ThemeProvider>
        </>
    )
}
export default Login