import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RegisterForm from './register_components/RegisterForm';
import ConfirmForm from './register_components/ConfirmForm';
import Payment from './register_components/Payment';
import { useDispatch, useSelector } from 'react-redux';
import { registerSteps, setRegisteredUserId, handleActiveSteps } from './authSlice'
import { useRegisterMutation, useConfirmAccountMutation, usePaymentIntentMutation } from './authApiSlice'
import { useNavigate } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUB_KEY}`);

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const steps = ['Create Account', 'Confirm Account', 'Review'];

function getStepContent(step, props) {
    switch (step) {
        case 0:
            return <RegisterForm />;
        case 1:
            return <ConfirmForm />;
        case 2:
            return (
                <Elements stripe={stripePromise}>
                    <Payment />
                </Elements>
            )
        default:
            throw new Error('Unknown step');
    }
}

const theme = createTheme({
    palette: {
        background: {
            paper: '#fff',
            red: 'red'
        },
        text: {
            primary: '#173A5E',
            secondary: '#46505A',
        },
        action: {
            active: '#001E3C',
        },

    },
    stepper: {
        iconColor: 'green'
    }
});



export default function Checkout() {
    // console.log(`${process.env.REACT_APP_STRIPE_PUB_KEY}`)
    const getSteps = useSelector(state => state.auth.steps)
    const [activeStep, setActiveStep] = React.useState(0);
    const [disabled, setDisabled] = React.useState(true)

    const dispatch = useDispatch()
    const [register, { isLoading: registerIsLoading }] = useRegisterMutation()
    const [confirmAccount, { isLoading: confirmIsLoading }] = useConfirmAccountMutation()
    // const [payment, { isLoading: paymentIntentIsLoading }] = usePaymentIntentMutation()

    const navigate = useNavigate()
    const handleNext = async () => {

        if (getSteps.activeStep === 'register') {
            try {
                // console.log(user, pwd)
                let data = { ...getSteps.register.credentials }
                const userData = await register(data).unwrap()
                if (userData.id) {
                    dispatch(setRegisteredUserId(userData.id))
                    setActiveStep(activeStep + 1);
                }
            } catch (err) {
                console.log(err)
            }

        } else if (getSteps.activeStep === 'confirm') {
            try {
                let userId = getSteps.register.userId
                let data = { code: getSteps.confirm.code, id: userId }
                const result = await confirmAccount(data).unwrap()
                if (result) {
                    dispatch(handleActiveSteps('checkout'))
                    setActiveStep(activeStep + 1);
                }
            } catch (error) {
                console.log(error)
            }
        } else if (getSteps.activeStep === 'checkout') {
            try {
                let userId = getSteps.register.userId
                let data = { code: getSteps.confirm.code, id: userId }
                const result = await confirmAccount(data).unwrap()
                if (result) {
                    dispatch(handleActiveSteps('checkout'))
                    setActiveStep(activeStep + 1);
                }
            } catch (error) {
                console.log(error)
            }
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    // console.log(getSteps)

    // if (getSteps.activeStep === 'register') {
    //     console.log('asd')
    // }

    React.useEffect(() => {
        // console.log(getSteps)
        if (getSteps.activeStep === 'register') {
            setActiveStep(0);
            if (getSteps.register.userId) {
                setActiveStep(1);
            }
            if (!getSteps.register.isValid) {
                setDisabled(true)
            } else {
                setDisabled(false)
            }
        } else if (getSteps.activeStep === 'confirm') {
            setActiveStep(1);
            if (!getSteps.confirm.isValid) {
                setDisabled(true)
            } else {
                setDisabled(false)
            }
        } else if (getSteps.activeStep === 'checkout') {
            setActiveStep(2);
            if (!getSteps.checkout.isValid) {
                setDisabled(true)
            } else {
                setDisabled(false)
            }
        }
    }, [getSteps])


    return (
        <ThemeProvider theme={theme}>
            {/* <CssBaseline /> */}
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, borderRadius: '30px', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}>
                    <Typography component="h1" variant="h4" align="center">
                        Registration
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label} sx={{
                                '& .MuiStepLabel-root .Mui-completed': {
                                    color: '#8624DB', // circle color (COMPLETED)
                                },
                                '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
                                {
                                    color: '#fff', // Just text label (COMPLETED)
                                },
                                '& .MuiStepLabel-root .Mui-active': {
                                    color: '#8624DB', // circle color (ACTIVE)
                                },
                                '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
                                {
                                    color: 'common.white', // Just text label (ACTIVE)
                                },
                                '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                                    fill: '#fff', // circle's number (ACTIVE)
                                },
                            }}>
                                <StepLabel >{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography variant="h5" gutterBottom>
                                Thank you for your order.
                            </Typography>
                            <Typography variant="subtitle1">
                                Your order number is #2001539. We have emailed your order
                                confirmation, and will send you an update when your order has
                                shipped.
                            </Typography>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {getStepContent(activeStep)}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {/* {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                        Back
                                    </Button>
                                )} */}
                                {/* {getSteps.activeStep === 'checkout' && (
                                    <Button onClick={() => navigate('../login')} sx={{ mt: 3, ml: 1, color: '#8624DB' }}>
                                        Later, Sign In now
                                    </Button>
                                )} */}

                                <Button
                                    variant='outlined'
                                    disabled={disabled}
                                    onClick={handleNext}
                                    sx={{
                                        mt: 3, ml: 1, border: '1px solid #8624DB', color: '#8624DB', borderRadius: '10px', '&:hover': {
                                            background: "#8624db0c", borderColor: '#8624DB'
                                        }
                                    }
                                    }
                                >
                                    Next
                                </Button>
                            </Box>
                        </React.Fragment>
                    )}
                </Paper>
            </Container>
        </ThemeProvider>
    );
}