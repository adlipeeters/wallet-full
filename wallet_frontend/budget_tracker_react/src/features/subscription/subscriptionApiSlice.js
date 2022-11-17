import { apiSlice } from "../../app/api/apiSlice";


export const subscriptionApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSubscriptions: builder.query({
            query: () => `/subscriptions`,
            providesTags: ['subscriptions']
        }),
        // addCategory: builder.mutation({
        //     query: data => ({
        //         url: '/categories',
        //         method: 'POST',
        //         body: {
        //             name: data.name,
        //         }
        //     }),
        //     invalidatesTags: ['categories']
        // }),
        // editCategory: builder.mutation({
        //     query: data => ({
        //         url: '/categories/' + data.id,
        //         method: 'PUT',
        //         body: {
        //             name: data.name,
        //         }
        //     }),
        //     invalidatesTags: ['categories']
        // }),
        // deleteCategory: builder.mutation({
        //     query: id => ({
        //         url: '/categories/' + id,
        //         method: 'DELETE',
        //         body: {
        //         }
        //     }),
        //     invalidatesTags: ['categories']
        // }),
    })
})


export const {
    useGetSubscriptionsQuery,
    // useAddCategoryMutation,
    // useEditCategoryMutation,
    // useDeleteCategoryMutation,
} = subscriptionApiSlice