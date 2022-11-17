import { apiSlice } from "../../app/api/apiSlice";

export const accountApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAccounts: builder.query({
            query: () => `/accounts`,
            providesTags: ['accounts']
        }),
        addAccount: builder.mutation({
            query: data => ({
                url: '/accounts',
                method: 'POST',
                body: {
                    name: data.name,
                    amount: data.amount
                }
            }),
            invalidatesTags: ['accounts']
        }),
        editAccount: builder.mutation({
            query: data => ({
                url: '/accounts/' + data.id,
                method: 'PUT',
                body: {
                    name: data.name,
                    amount: data.amount
                }
            }),
            invalidatesTags: ['accounts']
        }),
        deleteAccount: builder.mutation({
            query: id => ({
                url: '/accounts/' + id,
                method: 'DELETE',
                body: {
                }
            }),
            invalidatesTags: ['accounts']
        }),
    }),
})


export const {
    useGetAccountsQuery,
    useAddAccountMutation,
    useEditAccountMutation,
    useDeleteAccountMutation,
} = accountApiSlice