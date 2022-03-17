import { useState } from "react";

export default function AddPost(){
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    const handlePost = async (e) => {
        e.preventDefault()

        setError('')
        setMessage('')

        if(!title || !content) return setError('All fields are required')
    
        let post = {
            title,
            content,
            published: false,
            createdAt : new Date().toISOString()
        }

        let response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify(post)
        })

        let data = await response.json()

        if(data.success){
            setTitle('')
            setContent('')

            return setMessage(data.message)
        }else{
            return setError(data.message)
        }
    }

    return (
        <div>
            <form onSubmit={handlePost}>
                {error ? (
                    <div>
                        {error}
                    </div>
                ): null}

                {message ? (
                    <div>
                        {message}
                    </div>
                ) : null}

                <div>
                    <input
                        type="text"
                        name="title"
                        onChange={(e)=> setTitle(e.target.value)}
                        value={title}
                        placeholder="title"
                    />
                </div>

                <div>
                    <textarea
                        name="content"
                        onChange={(e) => setContent(e.target.value)}
                        value={content}
                        placeholder="Post content"
                    />
                </div>
                <div>
                    <button type="submit">
                        Add Post
                    </button>
                </div>
            </form>
        </div>
    )
}