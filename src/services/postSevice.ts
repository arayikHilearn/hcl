import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPost } from '../models/post';


const postAPI = createApi( {
    reducerPath: 'postAPI',
    baseQuery: fetchBaseQuery( { baseUrl: process.env.REACT_APP_API_URL } ),
    tagTypes: [ 'Post' ],
    endpoints: ( build ) => ( {
        fetchAllPosts: build.query<IPost[], void | number>( {
            query: ( _limit ) => ( {
                url: '/posts',
                params: { _limit }
            } ),
            providesTags: result => [ 'Post' ]
        } ),
        createPost: build.mutation<IPost, IPost>( {
            query: ( post ) => ( {
                url: '/posts',
                method: 'POST',
                body: post
            } ),
            invalidatesTags: [ 'Post' ]
        } ),
        updatePost: build.mutation<IPost, IPost>( {
            query: ( post ) => ( {
                url: `/posts/${post.id}`,
                method: 'PUT',
                body: post
            } ),
            invalidatesTags: [ 'Post' ]
        } ),
        deletePost: build.mutation<IPost, number>( {
            query: ( id ) => ( {
                url: `/posts/${id}`,
                method: 'DELETE'
            } ),
            invalidatesTags: [ 'Post' ]
        } )
    } )
} ); 

export default postAPI;
export const { useFetchAllPostsQuery, useCreatePostMutation, useUpdatePostMutation, useDeletePostMutation } = postAPI;
