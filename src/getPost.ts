import { useEffect, useState } from "react";
export type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
}


export default function usePost(url: string) {
    type PostsStates = [Post[], (prev: Post[]) => void]
    let [isLoading, setIsloading] = useState(false)
    let postsStates: PostsStates = useState<Post[]>([])

    let posts = postsStates[0];
    const setPosts = postsStates[1];



    let reqError: string = "Success ! no Error !"

    useEffect(() => {
        async function getThisData() {
            try {
                setIsloading(true)
                let result = await fetch(url);
                result = await result.json();
                setPosts(result);

            }
            catch (error) {
                reqError = error as string;
                throw new Error(reqError)
            }
            finally {
                setIsloading(false);
            }
        }
        getThisData();

    }, [url])
    return [posts, setPosts, reqError, isLoading]
}
