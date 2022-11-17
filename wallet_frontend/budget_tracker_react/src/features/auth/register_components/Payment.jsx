import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Button } from "@mui/material"
import { usePaymentIntentMutation } from '../authApiSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { resetRegistrationSteps } from '../authSlice'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Notification from '../../../components/notification/Notification'

export default function Payment() {
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userId = useSelector(state => state.auth.steps.register.userId)
  const [open, setOpen] = React.useState(false);
  const [paymentSuccess, setPaymentSuccess] = React.useState(false);

  // console.log(userId)

  const [payment, { isLoading: paymentIntentIsLoading }] = usePaymentIntentMutation()

  const handleSubmit = (event) => {
    event.preventDefault();
    setOpen(true)
    const cardElement = elements.getElement(CardElement)
    // console.log(cardElement)
    payment({ amount: 20, currency: "usd", id: userId, subscription: 2 }).then(res => {
      // console.log(res)
      return new Promise((resolve, reject) => {
        stripe.createPaymentMethod({
          type: 'card',
          card: cardElement
        }).then(paymentMethod => {
          // console.log(paymentMethod)
          const data = {
            clientSecret: res.data.client_secret,
            paymentMethodId: paymentMethod.paymentMethod.id
          }
          resolve(data)
        }).catch(err => reject(err))
      })
    })
      .then(res => {
        // console.log(res)
        return stripe.confirmCardPayment(res.clientSecret, {
          payment_method: res.paymentMethodId
        })
      }).then(res => {
        setOpen(false)
        setPaymentSuccess(true)
        navigate('../login')
        dispatch(resetRegistrationSteps())
        // console.log(res)
        // handleClose()
        // setSnackSuccessOpen(true)

      })
      .catch(err => {
        console.log(err)
        // setSnackFailedOpen(true)
      })
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      {/* <div style={{
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        padding: "10px",
        backgroundColor: 'gray'
      }}>
      </div> */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          {/* <Card sx={{ padding: '10px', border: 'none' }}> */}
          <Box sx={{ padding: '10px', borderBottom: '1.5px solid #8624DB' }}>
            <CardElement options={{
              style: {
                base: {
                  color: "black",
                  "::placeholder": {
                    color: 'black'
                  },
                },
              }
            }}

            />
          </Box>
          <Button type="submit"
            onClick={handleSubmit}
            variant='outlined'
            sx={{
              width: '100%',
              mt: 3, border: '1px solid #8624DB', color: '#8624DB', borderRadius: '5px', '&:hover': {
                background: "#8624db0c", borderColor: '#8624DB'
              }
            }}
            disabled={!stripe || !elements}>Pay</Button>
          {/* </Card> */}
        </Grid>
      </Grid>
      {paymentSuccess ? <Notification isOpen={true} title="Congratulations, your account has been created!" /> : ''}

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  )
}