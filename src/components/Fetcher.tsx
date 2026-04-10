import usePost from "../getPost.ts";
import { useState } from "react";
import { type Post } from "../getPost.ts";

export default function Fetcher() {

  let [url, setUrl] = useState("");
  let [postData, setPost , error] = usePost(url);

  console.log(postData)
  // We want to call getPost but it's inside a non component function and react forbids this .
  // We need a trigger that changes that and trigger it .
  console.log(url);

  function handleSubmit(data: any) {
    // this shoudl make a request based on the value of this
    setUrl(data.get("url"));
  }

  return (
    <form
      action={handleSubmit}
      className="shadow-[0_0_15px_5px_rgba(0,0,0,0.1)] p-8 rounded-md"
    >
      <h1 className="text-xl font-bold">Fetch posts</h1>
      <p className="text-gray-600">
        Enter the Api endpoint to fetch posts from{" "}
      </p>
      <div className="flex gap-4">
        {" "}
        <input
          type="text"
          placeholder="url here"
          name="url"
          className="border-2 border-gray-100 rounded-sm outline-0 px-2 w-lg text-slate-600"
        />
        <input
          type="submit"
          value={"Fetch"}
          className=" bg-slate-900  p-1 rounded-sm text-white font-semibold cursor-pointer"
        />
      </div>
    </form>
  );
}
