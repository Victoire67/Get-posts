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
    <div className="shadow-[0_0_15px_5px_rgba(0,0,0,0.1)] p-8 rounded-md">
      <h1>{postHeader}</h1>
      <p>
        <span>Post ID:{postId}</span> <span>User ID:{userId}</span>
      </p>
      <p>{description}</p>
    </div>
  );
}
