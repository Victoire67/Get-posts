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
        try {
            setIsloading(true)
            fetch(url).then(result => result.json()).then(result => {
                setPosts(result)
                setIsloading(false)
            }).catch(err => {
                console.log("An error happend up !")
                setIsloading(false)
                throw new Error(err)
            })
        } catch (error) {
            reqError = error as string;
            setIsloading(false)
            console.log("An error happended")
            throw new Error(reqError)
        }
    }, [url])
    return [posts, setPosts, reqError, isLoading]
}
