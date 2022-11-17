import { apiSlice } from "../../app/api/apiSlice";


export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCategories: builder.query({
            query: () => `/categories`,
            providesTags: ['categories']
        }),
        addCategory: builder.mutation({
            query: data => ({
                url: '/categories',
                method: 'POST',
                body: {
                    name: data.name,
                }
            }),
            invalidatesTags: ['categories']
        }),
        editCategory: builder.mutation({
            query: data => ({
                url: '/categories/' + data.id,
                method: 'PUT',
                body: {
                    name: data.name,
                }
            }),
            invalidatesTags: ['categories']
        }),
        deleteCategory: builder.mutation({
            query: id => ({
                url: '/categories/' + id,
                method: 'DELETE',
                body: {
                }
            }),
            invalidatesTags: ['categories']
        }),
    })
})


export const {
    useGetCategoriesQuery,
    useAddCategoryMutation,
    useEditCategoryMutation,
    useDeleteCategoryMutation,
} = categoryApiSlice