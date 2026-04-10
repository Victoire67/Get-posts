import usePost from "../getPost.ts";
import { useRef, useState } from "react";
import { type Post } from "../getPost.ts";

import PostElement, { type PostProps } from "./Post.tsx";

export default function Fetcher() {
  let [pageSection, setPageSection] = useState(10);
  let [url, setUrl] = useState("");
  let [isRequesting, setIsRequesting] = useState(false);
  let [postData, setPost, error, isLoading] = usePost(url);

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
    setIsRequesting(true);
    setUrl(data.get("url"));
  }

  function handleRetry() {
    setIsRequesting(true);
    setUrl(url);
  }
  let isLoadingAndRequesting = isLoading && isRequesting;
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
          <div className="flex gap-2 itmes-center">
            <button
              type="submit"
              className=" bg-slate-900  p-1 rounded-sm text-white font-semibold cursor-pointer flex items-center gap-2"
            >
              {isLoadingAndRequesting && (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 text-neutral-tertiary animate-spin fill-brand"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="transparent"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="white"
                    />
                  </svg>
                </div>
              )}
              Fetch
            </button>
            <button
              type="submit"
              className=" bg-slate-300  p-1 rounded-sm text-white font-semibold cursor-pointer flex items-center gap-2"
              onSubmit={handleRetry}
            >
              Retry
            </button>
          </div>
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
