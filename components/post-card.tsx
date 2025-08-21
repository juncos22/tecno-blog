import Link from "next/link";
import { BlogPost } from "@/lib/definitions";

const PostCard = ({ post }: { post: BlogPost }) => {
  return (
    <Link href={`/posts/${post.slug}`}>
      <div className="group flex items-center justify-between rounded-xl overflow-hidden shadow-lg bg-zinc-900/50 border border-zinc-800/50 hover:shadow-xl hover:border-zinc-700/60 transition-all duration-300 ease-in-out transform hover:-translate-y-1">
        <div className="p-6">
          <div className="flex items-center mb-3">
            {post.tags.map((tag, i) => (
              <span
                key={i}
                className="inline-block bg-teal-500/10 text-teal-400 rounded-full px-3 py-1 text-xs font-semibold mr-2"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors duration-300">
            {post.title}
          </h3>
          {/* <p className="text-zinc-400 text-base">
            {post.content.substring(0, 100)}...
          </p> */}
          <p className="text-zinc-500 text-sm mt-4">
            {new Date(post.createdAt).toLocaleDateString("es-AR")}
          </p>
        </div>
        <div className="p-6">
          <img
            className="rounded-full"
            src={
              post.user !== null ? post.user?.avatar_url : "/placeholder.jpg"
            }
            alt={post.user !== null ? post.user?.id : post.id}
          />
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
