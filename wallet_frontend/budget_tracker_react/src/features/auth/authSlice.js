import { createSlice } from "@reduxjs/toolkit"


let data = sessionStorage.getItem('user') ? sessionStorage.getItem('user') : '';
let registerId = sessionStorage.getItem('registerId') ? sessionStorage.getItem('registerId') : null;
let activeStep = sessionStorage.getItem('activeStep') ? sessionStorage.getItem('activeStep') : null;

if (data) {
    data = JSON.parse(data)
}

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: data.user ? data.user : null,
        token: data.access_token ? data.access_token : null,
        loginNotification: false,
        steps: {
            register: {
                isValid: false,
                credentials: null,
                isComplete: false,
                userId: registerId
            },
            confirm: {
                isValid: false,
                isComplete: false,
                code: null
            },
            checkout: {
                isValid: false,
                isComplete: false
            },
            activeStep: activeStep ? activeStep : 'register'
        }
    },
    reducers: {
        setCredentials: (state, action) => {
            const { user, access_token } = action.payload
            // console.log(action.payload)
            let sessionData = { user, access_token }
            sessionData = JSON.stringify(sessionData);
            sessionStorage.setItem('user', sessionData);
            state.user = user
            state.token = access_token
        },
        updateProfileImage: (state, action) => {
            state.user.profileImage = action.payload
        },
        logOut: (state, action) => {
            state.user = null
            state.token = null
            sessionStorage.clear();
        },
        handleNotification: (state, action) => {
            state.loginNotification = action.payload
        },
        handleRegisterValidation: (state, action) => {
            state.steps[action.payload.type].isValid = action.payload.isValid
            state.steps[action.payload.type].credentials = action.payload.credentials
        },
        setRegisteredUserId: (state, action) => {
            state.steps['register'].userId = action.payload
            state.steps['activeStep'] = 'confirm'
            let registerUserId = action.payload
            registerUserId = JSON.stringify(registerUserId);
            sessionStorage.setItem('registerId', registerUserId);
            sessionStorage.setItem('activeStep', 'confirm');
        },
        setConfirmUserCode: (state, action) => {
            state.steps['confirm'].code = action.payload.code
            state.steps['confirm'].isValid = action.payload.isValid
        },
        handleActiveSteps: (state, action) => {
            state.steps.activeStep = action.payload
            sessionStorage.setItem('activeStep', action.payload);
        },
        resetRegistrationSteps: (state, action) => {
            sessionStorage.removeItem("activeStep");
            sessionStorage.removeItem("registerId");
            state.activeStep = 'register'
            // state.steps = 

        }
    },
})

export const { setCredentials, updateProfileImage, logOut, handleNotification, handleRegisterValidation, handleActiveSteps, setRegisteredUserId, setConfirmUserCode, resetRegistrationSteps } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token
export const loginNotification = (state) => state.auth.loginNotification
export const registerSteps = (state) => state.auth.steps