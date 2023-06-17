import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
export const demoApi = createApi({
    reducerPath: 'demoApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3111/api/ai/' }),
    endpoints: (builder) => ({
        getDemoByName: builder.query<any, string>({
            query: (str) => {
                return {
                    url: 'demo',
                    params: { name: "xxxxx", method: "GET" }
                    , method: "GET"
                }
            }
        }),
        addNewDemo: builder.mutation({
            query: initialPost => ({
                url: 'demo',
                method: 'POST',
                // Include the entire post object as the body of the request
                body: initialPost
            })
        }),
        // postDemoByName: builder.query<any, string>({
        //     query: (str) => {
        //         return {
        //             url: 'demo',
        //             params: { name: "xxxxx", method: "GET" }
        //             , method: "POST"
        //         }
        //     }
        // }),
        getDemoByName2: builder.query<any, string>({
            query: (name) => ``,
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetDemoByNameQuery, useGetDemoByName2Query, useAddNewDemoMutation } = demoApi