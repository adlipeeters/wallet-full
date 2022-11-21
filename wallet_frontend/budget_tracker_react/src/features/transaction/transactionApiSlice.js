import { apiSlice } from "../../app/api/apiSlice";
import { parseISO, formatDistanceToNow, formatDistanceToNowStrict, toISOString } from 'date-fns';


// const apiWithTag = apiSlice.enhanceEndpoints({ addTagTypes: ['transactions'] })

export const transactionApiSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({
        getTransactions: builder.query({
            query: () => `/transactions`,
            // transformResponse: response => {
            //     // let newResponse

            //     response.forEach((item) => {
            //         let date = new Date(item.createdAt).toLocaleDateString("en-US")
            //     })

            //     // console.log(response)
            //     return response
            // },
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