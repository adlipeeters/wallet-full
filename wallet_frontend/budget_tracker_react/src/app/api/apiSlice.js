import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

export const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3500',
    // baseUrl: 'http://185.125.109.34:3000',
    // baseUrl: 'https://wallet-demo-app.herokuapp.com',
    mode: 'cors',
    // credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result?.error?.status === 401) {
        console.log(result)
        api.dispatch(logOut())
    }
    // if (result?.error?.originalStatus === 403) {
    //     console.log('sending refresh token')
    //     // send refresh token to get new access token 
    //     const refreshResult = await baseQuery('/refresh', api, extraOptions)
    //     console.log(refreshResult)
    //     if (refreshResult?.data) {
    //         const user = api.getState().auth.user
    //         // store the new token 
    //         api.dispatch(setCredentials({ ...refreshResult.data, user }))
    //         // retry the original query with new access token 
    //         result = await baseQuery(args, api, extraOptions)
    //     } else {
    //         api.dispatch(logOut())
    //     }
    // }

    return result
}

export const apiSlice = createApi({
    // baseQuery: baseQuery,
    baseQuery: baseQueryWithReauth,
    // tagTypes: ['transactions', 'categories', 'accounts'],
    endpoints: builder => ({})
})