import { useFetch } from "@/hooks/useFetch";
import { Link, useParams } from "wouter";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";

export default function BlogDetail() {
  const params = useParams<{ id: string }>();
  const { data: post, isLoading } = useFetch<any>(`/api/blog/${params.id}`);

  if (isLoading) return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <div className="h-8 bg-gray-200 rounded animate-pulse mb-4 w-3/4" />
      <div className="h-64 bg-gray-200 rounded animate-pulse mb-8" />
      {[1,2,3].map(i => <div key={i} className="h-4 bg-gray-200 rounded animate-pulse mb-3" />)}
    </div>
  );

  if (!post) return (
    <div className="text-center py-40">
      <h2 className="text-2xl font-bold text-gray-400 mb-4">Post not found</h2>
      <Link href="/blog" className="text-[#6A1B9A] font-bold hover:underline">← Back to Blog</Link>
    </div>
  );

  return (
    <div className="w-full">
      <div className="bg-gradient-to-r from-[#6A1B9A] to-[#E91E63] text-white py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="bg-white/20 text-white text-sm font-bold px-3 py-1 rounded-full mb-4 inline-block">{post.category}</span>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">{post.title}</h1>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/blog" className="inline-flex items-center gap-2 text-[#6A1B9A] font-semibold text-sm hover:underline mb-8">
          <ArrowLeft size={16} /> Back to Blog
        </Link>
        {post.coverImage && <img src={post.coverImage} alt={post.title} className="w-full h-72 object-cover rounded-2xl mb-8" />}
        <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-8 pb-6 border-b">
          {post.author && <div className="flex items-center gap-2"><User size={15} />{post.author}</div>}
          <div className="flex items-center gap-2"><Calendar size={15} />{new Date(post.publishedAt).toLocaleDateString()}</div>
          {post.readTime && <div className="flex items-center gap-2"><Clock size={15} />{post.readTime}</div>}
        </div>
        <div className="prose max-w-none text-gray-600 leading-relaxed">
          <p>{post.excerpt}</p>
          {post.content && <div className="mt-6 whitespace-pre-wrap">{post.content}</div>}
        </div>
      </div>
    </div>
  );
}
