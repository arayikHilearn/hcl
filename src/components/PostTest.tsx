// import { FC, useEffect, useState } from 'react';
// import { useFetchAllPostsQuery, useCreatePostMutation, useUpdatePostMutation, useDeletePostMutation } from '../services/postSevice';
// import { IPost } from '../models/post';
//
// const PostTest: FC = () => {
//     const [ limit, setLimit ] = useState( 10 );
//     const { data: posts, error, isLoading, refetch } = useFetchAllPostsQuery( /*limit*//*, {
//         pollingInterval: 2000
//     }*/ );
//     const [ createPost, { error: createError, isLoading: createIsLoading } ] = useCreatePostMutation();
//     const [ updatePost ] = useUpdatePostMutation();
//     const [ deletePost ] = useDeletePostMutation();
//
//     // useEffect( () => {
//     //     setTimeout(() => {
//     //         setLimit(100)
//     //     }, 3000)
//     // }, [])
//
//     async function handleCreate() {
//         const title = prompt();
//         await createPost( { title, body: `body - ${title}` } as IPost );
//     }
//     async function handleUpdate( id: number ) {
//         const title = prompt();
//         await updatePost( { id, title, body: `body - ${title}` } as IPost );
//     }
//
//     return (
//         <div>
//             <button onClick={ () => refetch() }>REFETCH</button>
//             { isLoading && <div>ZAGRUZKA</div> }
//             { error && <div>{ JSON.stringify( error ) } OSHIBKA</div> }
//             <button onClick={ handleCreate }>Create</button>
//             { createIsLoading && <div>ZAGRUZKA</div> }
//             { createError && <div>{ JSON.stringify( createError ) } OSHIBKA</div> }
//             { posts && posts.map( ( { id, title, body } ) => (
//                 <div key={ id }>
//                     <div>{ id }</div>
//                     <span>{ title }</span>
//                     <div>{ body }</div>
//                     <button onClick={ () => deletePost( id ) }>Delete</button>
//                     <button onClick={ () => handleUpdate( id ) }>Update</button>
//                 </div>
//             ) ) }
//         </div>
//     );
// };
//
// export default PostTest;
