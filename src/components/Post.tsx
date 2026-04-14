export interface PostProps {
  postHeader: string;
  postId: number;
  userId: number;
  description: string;
}
export default function PostElement({
  postHeader,
  postId,
  userId,
  description,
}: PostProps) {
  return (
    <div className=" p-8 rounded-md w-3xl my-4 shadow-[0_0_15px_5px_rgba(0,0,0,0.1)]">
      <h1 className="text-lg font-bold py-4">{postHeader}</h1>
      <p className="pb-2 opacity-50">
        <span>Post ID:{postId}</span> <span>User ID:{userId}</span>
      </p>
      <p className="opacity-50">{description}</p>
    </div>
  );
}
