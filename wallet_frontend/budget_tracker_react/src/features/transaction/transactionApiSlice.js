import { apiSlice } from "../../app/api/apiSlice";


// const apiWithTag = apiSlice.enhanceEndpoints({ addTagTypes: ['transactions'] })

export const transactionApiSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({
        getTransactions: builder.query({
            query: () => `/transactions`,
            providesTags: ['transactions']
        }),
        addTransaction: builder.mutation({
            query: data => ({
                url: '/transactions',
                method: 'POST',
                body: {
                    amount: data.amount,
                    type: data.type,
                    category: data.category,
                    account: data.account,
                }
            }),
            invalidatesTags: (result, error, arg) => ['transactions', 'accounts'],
        }),
        editTransaction: builder.mutation({
            query: data => ({
                url: '/transactions/' + data.id,
                method: 'PUT',
                body: {
                    amount: data.amount,
                    type: data.type,
                    category: data.category,
                    // account: data.account,
                }
            }),
            invalidatesTags: ['transactions', 'accounts']
        }),
        deleteTransaction: builder.mutation({
            query: id => ({
                url: '/transactions/' + id,
                method: 'DELETE',
                body: {
                }
            }),
            invalidatesTags: ['transactions', 'accounts']
        }),
    }),
})

export const {
    useGetTransactionsQuery,
    useAddTransactionMutation,
    useEditTransactionMutation,
    useDeleteTransactionMutation,
} = transactionApiSlice