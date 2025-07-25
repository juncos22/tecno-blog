import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/lib/definitions";

const FeaturedPostCard = ({ post }: { post: BlogPost }) => {
  return (
    <Link href={`/posts/${post.slug}`}>
      <div className="group rounded-xl overflow-hidden shadow-lg bg-zinc-900/50 border border-zinc-800/50 hover:shadow-xl hover:border-zinc-700/60 transition-all duration-300 ease-in-out transform hover:-translate-y-1">
        <div className="relative w-full h-96">
          <Image
            src={post.imageUrl}
            alt={post.title}
            width={1500}
            height={500}
            priority
            className="transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center mb-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-teal-500/10 text-teal-400 rounded-full px-3 py-1 text-xs font-semibold mr-2"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors duration-300">
            {post.title}
          </h3>
          <p className="text-zinc-400 text-base">{post.content}</p>
          <p className="text-zinc-500 text-sm mt-4">{post.createdAt}</p>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedPostCard;
