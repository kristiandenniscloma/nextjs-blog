import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";
import PostCard from "../components/PostCard";

export default function Home({ posts }){
    return(
        <div>
            {posts.length === 0 ? (
                <h2>No added posts</h2>
            ) : (
                <ul>
                    {posts.map((post, i) => (
                        <PostCard post={post} key={i} />
                    ))}
                </ul>
            )}
        </div>
    )
}

export async function getServerSideProps(ctx) {
    //try{
        // get the current environment
        let dev = process.env.NODE_ENV !== 'production';
        let { DEV_URL, PROD_URL } = process.env;

        // request posts from api
        let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/posts`);
        // extract the data
        let data = await response.json();

        return {
            props: {
                posts: data['message'],
            },
        };
    /*}catch(error){
        return {
            props: {
                posts: 'aerror happens'
            }
            
        }
    }*/
}