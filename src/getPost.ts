import { useEffect, useState } from "react";
export type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
}


export default function usePost(url: string) {
    type PostsStates = [Post[], (prev: Post[]) => void]

    let postsStates: PostsStates = useState<Post[]>([])

    let posts = postsStates[0];
    const setPosts = postsStates[1];

   

    let reqError: string = "Success ! no Error !"

    useEffect(() => {
        try {
            fetch(url).then(result => result.json()).then(result => {
                setPosts(result)
            })
        } catch (error) {
            reqError = error as string;

        }
    }, [url])
    return [posts, setPosts , reqError]
}
