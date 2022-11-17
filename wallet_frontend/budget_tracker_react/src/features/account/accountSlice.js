import { createSlice } from "@reduxjs/toolkit"


const accountSlice = createSlice({
    name: 'account',
    initialState: {
        accounts: []
    },
    reducers: {
        setCategories: (state, action) => {
            console.log(action.payload)
            state.accounts = action.payload
        }
    }
})


export const { setCategories } = accountSlice.actions
export default accountSlice.reducer

export const getCategories = (state) => state.account.accounts