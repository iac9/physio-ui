import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { blogPosts } from '../data/blog';

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const categoryColors: Record<string, string> = {
  Education: 'bg-blue-50 text-blue-600',
  Sports: 'bg-green-50 text-green-600',
  'Workplace Wellness': 'bg-orange-50 text-orange-600',
  Treatment: 'bg-purple-50 text-purple-600',
  Rehabilitation: 'bg-teal-50 text-teal-600',
};

export default function Blog() {
  const [featured, ...rest] = blogPosts;

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-light to-bg py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-2xl">
            <motion.p variants={fadeUp} className="text-primary font-medium text-sm tracking-wide uppercase mb-3">Blog</motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">Health & Movement</motion.h1>
            <motion.p variants={fadeUp} className="text-neutral-600 text-lg leading-relaxed">
              Practical advice, education, and insights from Huy Hua on physiotherapy, injury prevention, and living well.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Featured post */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="mb-12"
          >
            <motion.p variants={fadeUp} className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-4">Featured</motion.p>
            <motion.div variants={fadeUp}>
              <Link to={`/blog/${featured.slug}`} className="group block">
                <div className="grid md:grid-cols-2 gap-8 rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow bg-white">
                  <div className="bg-gradient-to-br from-primary/15 to-primary/5 aspect-video md:aspect-auto flex items-center justify-center">
                    <span className="text-5xl">🦴</span>
                  </div>
                  <div className="p-6 sm:p-8 flex flex-col gap-4 justify-center">
                    <span className={`self-start text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[featured.category] ?? 'bg-neutral-100 text-neutral-600'}`}>
                      {featured.category}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 group-hover:text-primary transition-colors leading-snug">
                      {featured.title}
                    </h2>
                    <p className="text-neutral-500 text-sm leading-relaxed">{featured.excerpt}</p>
                    <div className="flex items-center gap-3 text-xs text-neutral-400">
                      <span>{featured.date}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{featured.readTime}</span>
                    </div>
                    <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read article <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Rest of posts */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {rest.map(post => (
              <motion.div key={post.id} variants={fadeUp}>
                <Link to={`/blog/${post.slug}`} className="group block bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow h-full">
                  <div className="bg-gradient-to-br from-neutral-100 to-neutral-50 aspect-video flex items-center justify-center text-3xl">
                    🦴
                  </div>
                  <div className="p-5 flex flex-col gap-3">
                    <span className={`self-start text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColors[post.category] ?? 'bg-neutral-100 text-neutral-600'}`}>
                      {post.category}
                    </span>
                    <h3 className="font-semibold text-neutral-900 group-hover:text-primary transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-neutral-500 text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-2 text-xs text-neutral-400 mt-auto pt-2">
                      <span>{post.date}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
