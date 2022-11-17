import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux'
import { setConfirmUserCode } from '../authSlice'


export default function ConfirmForm() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#8624DB'
      },
    },
  });
  const [code, setCode] = React.useState({ token: '' })
  const dispatch = useDispatch()
  const handleChange = (event) => {
    setCode({ token: event.target.value })
    // if (code.token.length > 10) {
    //   dispatch(setConfirmUserCode({ code: code.token, isValid: true }))
    // } else {
    //   dispatch(setConfirmUserCode({ code: code.token, isValid: false }))
    // }
  }

  React.useEffect(() => {
    if (code.token.length > 10) {
      dispatch(setConfirmUserCode({ code: code.token, isValid: true }))
    } else {
      dispatch(setConfirmUserCode({ code: code.token, isValid: false }))
    }
  }, [code])

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Typography variant="h6" gutterBottom>
          Confirm Account
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <TextField
              required
              id="token"
              onChange={handleChange}
              value={code.token}
              name="token"
              label="Verification code sent to your email"
              fullWidth
              autoComplete="family-name"
              variant="standard"
            />
          </Grid>
        </Grid>
      </ThemeProvider>
    </React.Fragment>
  );
}