import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { setCredentials, handleRegisterValidation } from '../authSlice'
import { useRegisterMutation } from '../authApiSlice'
import { validateRegisterForm } from '../../helpers/Validator'

export default function AddressForm() {

    const theme = createTheme({
        palette: {
            primary: {
                main: '#8624DB'
            },
        },
    });

    const [credentials, setCredentials] = React.useState({
        email: '',
        password: '',
        username: '',
        name: '',
    })

    const handleChange = (event) => {
        setCredentials({
            ...credentials, [event.target.name]: event.target.value
        })
    }

    const dispatch = useDispatch()

    React.useEffect(() => {
        const isFormValid = validateRegisterForm(credentials)
        if (isFormValid) {
            dispatch(handleRegisterValidation({ type: 'register', isValid: true, credentials: credentials }))
        } else {
            dispatch(handleRegisterValidation({ type: 'register', isValid: false }))
        }

    }, [credentials])


    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <Typography variant="h6" gutterBottom>
                    Create Account
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="email"
                            onChange={handleChange}
                            value={credentials.email}
                            name="email"
                            label="Email"
                            fullWidth
                            autoComplete="given-name"
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
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="username"
                            onChange={handleChange}
                            value={credentials.username}
                            name="username"
                            label="Username"
                            fullWidth
                            autoComplete="family-name"
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="name"
                            onChange={handleChange}
                            value={credentials.name}
                            name="name"
                            label="Name"
                            fullWidth
                            autoComplete="shipping address-line1"
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            onChange={handleChange}
                            value={credentials.password}
                            label="Password"
                            fullWidth
                            autoComplete="shipping address-line2"
                            variant="standard"
                        />
                    </Grid>
                </Grid>
            </ThemeProvider>
        </React.Fragment>
    );
}