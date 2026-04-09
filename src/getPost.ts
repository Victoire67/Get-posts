import { useEffect, useState } from "react";
type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
}
function getPost(url: string) {

    let postStates: [Post[], (prev: Post[]) => void] = useState([]);
    let posts = postStates[0];
    let setPosts = postStates[1];
    let reqError = "Success ! no Error !"
    function reFetch() {
        fetch(url).then(result => result.json()).then(result => {
            setPosts(result)
        })
    }

    useEffect(() => {
        try {
            reFetch()
        } catch (error) {
            reqError = error
        }
    }, [])

    return [posts, reFetch, reqError]
}