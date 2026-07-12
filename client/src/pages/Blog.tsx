import { useFetch } from "@/hooks/useFetch";
import { Link } from "wouter";
import { Calendar, Clock, User } from "lucide-react";

const mockPosts = [
  { _id: "1", title: "Healthy Diet During Pregnancy", category: "Pregnancy", excerpt: "Essential nutritional guidelines for expectant mothers to ensure optimal health for both mother and baby.", coverImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800", author: "Dr. Priya Sharma", publishedAt: new Date().toISOString(), readTime: "5 min read" },
  { _id: "2", title: "Importance of Regular Check-ups", category: "Women's Health", excerpt: "Why regular health screenings are vital for women at every stage of life.", coverImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800", author: "Dr. Anjali Patel", publishedAt: new Date().toISOString(), readTime: "4 min read" },
  { _id: "3", title: "Tips for a Healthy Lifestyle", category: "Lifestyle", excerpt: "Simple but effective lifestyle changes that can dramatically improve your overall health.", coverImage: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800", author: "Dr. Suresh Kumar", publishedAt: new Date().toISOString(), readTime: "6 min read" },
];

export default function Blog() {
  const { data: posts, isLoading } = useFetch<any[]>("/api/blog");
  const items = posts && posts.length > 0 ? posts : mockPosts;

  return (
    <div className="w-full">
      <div className="bg-gradient-to-r from-[#6A1B9A] to-[#E91E63] text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Health Blog</h1>
        <p className="text-lg text-white/90 max-w-2xl mx-auto px-4">Insights, tips, and medical advice from our experts.</p>
      </div>
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {isLoading && !posts ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1,2,3].map(i => <div key={i} className="bg-white rounded-2xl border h-80 animate-pulse" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((post: any) => (
                <div key={post._id} className="bg-white rounded-2xl overflow-hidden shadow-sm border hover:shadow-xl transition-shadow flex flex-col group">
                  <div className="relative h-56 overflow-hidden">
                    <img src={post.coverImage || "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800"} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 right-4 bg-[#6A1B9A] text-white text-xs font-bold px-3 py-1 rounded-full">{post.category}</div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-[#6A1B9A] transition-colors">
                      <Link href={`/blog/${post._id}`}>{post.title}</Link>
                    </h3>
                    <p className="text-gray-500 mb-6 line-clamp-3 flex-1">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs text-gray-400 font-medium pt-4 border-t">
                      {post.author && <div className="flex items-center gap-1"><User size={14} />{post.author}</div>}
                      <div className="flex items-center gap-1"><Calendar size={14} />{new Date(post.publishedAt).toLocaleDateString()}</div>
                      {post.readTime && <div className="flex items-center gap-1"><Clock size={14} />{post.readTime}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
