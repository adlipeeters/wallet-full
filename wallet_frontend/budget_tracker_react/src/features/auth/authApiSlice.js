import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/users/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        register: builder.mutation({
            query: credentials => ({
                url: '/users/register',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        confirmAccount: builder.mutation({
            query: data => ({
                url: '/users/confirm-profile/' + data.id,
                method: 'PUT',
                body: {
                    confirmToken: data.code.toString()
                },

            })
        }),
        paymentIntent: builder.mutation({
            query: data => ({
                url: '/payments',
                method: 'POST',
                body: {
                    amount: data.amount,
                    currency: data.currency,
                    userId: data.id,
                    subscription: data.subscription
                },
            })
        }),
        updatePassword: builder.mutation({
            query: credentials => ({
                url: '/users/reset-password/' + credentials.id,
                method: 'PUT',
                body: {
                    oldPassword: credentials.oldPassword,
                    newPassword: credentials.newPassword
                }
            })
        }),
        changeProfileImage: builder.mutation({
            query: data => ({
                url: '/users/upload',
                method: 'POST',
                body: data,

            })
        }),
        getImage: builder.query({
            query: (image_name) => `/users/profile-image/${image_name}`,
            // headers: new Headers({
            //     'Content-Type': 'application/x-www-form-urlencoded'
            // }),
        })
    })
})

export const {
    useLoginMutation,
    useRegisterMutation,
    usePaymentIntentMutation,
    useUpdatePasswordMutation,
    useConfirmAccountMutation,
    useChangeProfileImageMutation,
    useGetImageQuery,
} = authApiSlice