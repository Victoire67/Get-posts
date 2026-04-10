import usePost from "../getPost.ts";
import { useState } from "react";
import { type Post } from "../getPost.ts";

import PostElement, { type PostProps } from "./Post.tsx";

export default function Fetcher() {
  let [pageSection, setPageSection] = useState(10);
  let [url, setUrl] = useState("");
  let [postData, setPost, error] = usePost(url);

  function handlePrev() {
    setPageSection((previous: number): number => {
      return previous <= 10 ? 90 : previous - 10;
    });
  }

  function handleNext() {
    setPageSection((previous: number): number => {
      return previous >= 90 ? 10 : previous + 10;
    });
  }
  function handleSubmit(data: any) {
    setUrl(data.get("url"));
  }

  let postElements: any[] =
    typeof postData === "object"
      ? (postData.map(
          (
            post: {
              title: string;
              userId: number;
              id: number;
              body: string;
            },
            i: number,
          ) => {
            if (i === 0) {
              if (i + 1 <= pageSection) {
                return (
                  <PostElement
                    postHeader={post.title}
                    userId={post.userId}
                    postId={post.id}
                    key={post.id}
                    description={post.body}
                  />
                );
              } else {
                return;
              }
            } else {
              if (i + 1 <= pageSection && i + 10 >= pageSection - 10) {
                return (
                  <PostElement
                    postHeader={post.title}
                    userId={post.userId}
                    postId={post.id}
                    key={post.id}
                    description={post.body}
                  />
                );
              } else return;
            }
          },
        ) as any)
      : [<span></span>];
  postElements = postElements.filter((el) => el !== undefined);
  if (postElements.length > 10) postElements = postElements.slice(10, Infinity);
  return (
    <>
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
      {postElements.length > 1 && (
        <div className="flex place-content-between items-center my-4">
          <h1 className="text-2xl font-bol">Posts({postData.length})</h1>
          <div className="flex items-center gap-2">
            <button
              className="p-4 rounded-sm bg-gray-200 font-semibold"
              onClick={handlePrev}
            >
              {" "}
              {"< Previous"}{" "}
            </button>
            <p>Page {pageSection / 10} of 10 </p>
            <button
              className="p-4 rounded-sm bg-gray-200 font-semibold"
              onClick={handleNext}
            >
              {"Next >"}
            </button>
          </div>
        </div>
      )}
      <div>{...postElements}</div>
    </>
  );
}
