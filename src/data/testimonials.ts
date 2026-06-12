export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  date: string;
  text: string;
  condition: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah M.',
    rating: 5,
    date: 'March 2025',
    condition: 'Lower Back Pain',
    text: 'After months of debilitating back pain, Huy had me feeling like myself again within a few weeks. His thorough assessment and personalised approach made all the difference. Highly recommend!',
  },
  {
    id: '2',
    name: 'James K.',
    rating: 5,
    date: 'February 2025',
    condition: 'Knee Rehabilitation',
    text: 'Post-ACL surgery rehab with Huy was outstanding. His knowledge, patience, and attention to detail gave me confidence throughout my recovery. I returned to playing footy stronger than before.',
  },
  {
    id: '3',
    name: 'Linda T.',
    rating: 5,
    date: 'January 2025',
    condition: 'Neck & Shoulder Pain',
    text: 'I had chronic neck pain from desk work for years. Huy identified the root cause quickly and gave me practical exercises I could do at home. The difference has been remarkable.',
  },
  {
    id: '4',
    name: 'David R.',
    rating: 5,
    date: 'December 2024',
    condition: 'Sports Injury',
    text: 'Tore my hamstring during a run and Huy had me back training within the timeframe he predicted. His communication is excellent — always explains what he\'s doing and why.',
  },
  {
    id: '5',
    name: 'Emma P.',
    rating: 5,
    date: 'November 2024',
    condition: 'Post-Surgical Rehab',
    text: 'Huy guided me through my hip replacement recovery with such care and expertise. The clinic is welcoming and appointments are always on time. Cannot recommend highly enough.',
  },
  {
    id: '6',
    name: 'Michael C.',
    rating: 4,
    date: 'October 2024',
    condition: 'Sciatica',
    text: 'Great experience overall. Huy is professional, knowledgeable, and genuinely interested in your wellbeing. My sciatica is now well-managed and I have the tools to keep it that way.',
  },
];
