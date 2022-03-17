import { useRouter } from "next/router";
import { useState } from "react";

export default function PostCard({ post }){
    const [publishing, setPublishing] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const router = useRouter()

    const publishPost = async(postId) => {
        setPublishing(true)

        try{
           await fetch('/api/posts', {
               method: 'PUT',
               body: postId
           }) 

           setPublishing(false)
        }catch (error){
            return setPublishing(false)
        }
    }

    const deletePost = async (postId) => {
        setDeleting(true)

        try{
            await fetch('/api/posts', {
                method: 'DELETE',
                body: postId,
            })
        }catch(error){
            return setDeleting(false)
        }
    }

    return (
        <>
            <li>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <small>{new Date(post.createdAt).toLocaleDateString()}</small>
                <br />
                {!post.published ? (
                    <button type="button" onClick={()=>publishPost(post._id)}>
                        {publishing ? 'Publishing' : 'Publish'}
                    </button>
                ) : null}
                <button type="button" onClick={()=>deletePost(post['_id'])}>
                    {deleting ? 'Deleting' : 'Delete'}
                </button>
            </li>
        </>
    )
}