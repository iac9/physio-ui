import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { blogPosts } from '../data/blog';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-32 text-center">
        <h1 className="text-2xl font-bold text-neutral-900 mb-4">Article Not Found</h1>
        <Link to="/blog" className="text-primary hover:text-primary-dark font-medium">← Back to Blog</Link>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-light to-bg py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-700 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <div className="flex items-center gap-3 mb-4 text-sm text-neutral-500">
            <span className="bg-primary-light text-primary px-2.5 py-0.5 rounded-full text-xs font-semibold">{post.category}</span>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 leading-snug">{post.title}</h1>
          <p className="text-neutral-600 mt-4 text-lg">{post.excerpt}</p>
          <p className="text-sm text-neutral-400 mt-4">By {post.author}</p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="rounded-2xl bg-neutral-50 border border-neutral-200 aspect-video flex items-center justify-center text-5xl mb-10">
            🦴
          </div>
          <div className="prose prose-neutral max-w-none">
            <p className="text-neutral-600 leading-relaxed text-lg italic text-center py-16">
              Full article content coming soon. This is a placeholder post.
            </p>
          </div>
          <div className="mt-12 pt-8 border-t border-neutral-100">
            <Link to="/blog" className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary-dark transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to all articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
