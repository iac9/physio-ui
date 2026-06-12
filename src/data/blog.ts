export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'understanding-lower-back-pain',
    title: 'Understanding Lower Back Pain: Causes, Treatment, and Prevention',
    excerpt: 'Lower back pain affects nearly 80% of people at some point in their lives. Learn about the most common causes and what you can do about it.',
    content: 'Placeholder content for this article. Real content to be added later.',
    author: 'Huy Hua',
    date: '15 May 2025',
    category: 'Education',
    readTime: '5 min read',
  },
  {
    id: '2',
    slug: 'returning-to-sport-after-injury',
    title: 'Returning to Sport After Injury: A Physiotherapist\'s Guide',
    excerpt: 'Rushing back after an injury is one of the most common mistakes athletes make. Here\'s how to return to sport safely and confidently.',
    content: 'Placeholder content for this article. Real content to be added later.',
    author: 'Huy Hua',
    date: '2 April 2025',
    category: 'Sports',
    readTime: '6 min read',
  },
  {
    id: '3',
    slug: 'desk-worker-neck-pain-tips',
    title: '5 Simple Exercises to Relieve Neck Pain for Desk Workers',
    excerpt: 'Prolonged sitting and screen time are leading causes of neck pain. These five exercises can be done at your desk to provide relief.',
    content: 'Placeholder content for this article. Real content to be added later.',
    author: 'Huy Hua',
    date: '18 March 2025',
    category: 'Workplace Wellness',
    readTime: '4 min read',
  },
  {
    id: '4',
    slug: 'what-to-expect-first-physio',
    title: 'What to Expect at Your First Physiotherapy Appointment',
    excerpt: 'Not sure what happens at a physio consultation? We walk you through the process so you know exactly what to expect.',
    content: 'Placeholder content for this article. Real content to be added later.',
    author: 'Huy Hua',
    date: '5 February 2025',
    category: 'Education',
    readTime: '3 min read',
  },
  {
    id: '5',
    slug: 'dry-needling-vs-acupuncture',
    title: 'Dry Needling vs Acupuncture: What\'s the Difference?',
    excerpt: 'Many people confuse dry needling with acupuncture. While both use needles, the philosophy and technique are quite different.',
    content: 'Placeholder content for this article. Real content to be added later.',
    author: 'Huy Hua',
    date: '20 January 2025',
    category: 'Treatment',
    readTime: '4 min read',
  },
  {
    id: '6',
    slug: 'knee-osteoarthritis-exercise',
    title: 'Exercise and Knee Osteoarthritis: Why Movement is Medicine',
    excerpt: 'Contrary to popular belief, exercise is one of the best treatments for knee osteoarthritis. Here\'s the evidence and how to get started.',
    content: 'Placeholder content for this article. Real content to be added later.',
    author: 'Huy Hua',
    date: '8 January 2025',
    category: 'Rehabilitation',
    readTime: '5 min read',
  },
];
