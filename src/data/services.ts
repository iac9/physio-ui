export interface ServiceItem {
  id: string;
  title: string;
  icon: string;
  shortDescription: string;
  description: string;
  duration?: string;
  price?: string;
}

export const services: ServiceItem[] = [
  {
    id: 'physiotherapy',
    title: 'General Physiotherapy',
    icon: 'Activity',
    shortDescription: 'Comprehensive assessment and treatment for musculoskeletal conditions.',
    description: 'Thorough assessment of your condition followed by evidence-based treatment including manual therapy, exercise prescription, and education to restore function and reduce pain.',
    duration: '60 min',
    price: 'From $130',
  },
  {
    id: 'rehabilitation',
    title: 'Rehabilitation',
    icon: 'RefreshCw',
    shortDescription: 'Structured recovery programs tailored to your goals and timeline.',
    description: 'Progressive rehabilitation programs designed to restore strength, mobility, and function following injury, surgery, or illness. Each plan is individualised to your specific needs.',
    duration: '45 min',
    price: 'From $110',
  },
  {
    id: 'sports-injury',
    title: 'Sports Injury',
    icon: 'Zap',
    shortDescription: 'Specialised care to get athletes back to peak performance safely.',
    description: 'Expert management of acute and chronic sports injuries using a combination of manual therapy, sports-specific rehab, and return-to-sport protocols.',
    duration: '45 min',
    price: 'From $110',
  },
  {
    id: 'back-neck-pain',
    title: 'Back & Neck Pain',
    icon: 'Spine',
    shortDescription: 'Targeted treatment for spinal pain, stiffness, and disc conditions.',
    description: 'Specialised assessment and treatment for lower back pain, neck pain, disc injuries, and sciatica using manual therapy, dry needling, and targeted exercise.',
    duration: '45 min',
    price: 'From $110',
  },
  {
    id: 'post-surgical',
    title: 'Post-Surgical Rehab',
    icon: 'Heart',
    shortDescription: 'Guided recovery following joint replacements and surgical procedures.',
    description: 'Structured post-operative rehabilitation to optimise recovery, restore full function, and minimise complications following orthopaedic and other surgical procedures.',
    duration: '45 min',
    price: 'From $110',
  },
  {
    id: 'dry-needling',
    title: 'Dry Needling',
    icon: 'Crosshair',
    shortDescription: 'Effective treatment for muscle tension, trigger points, and pain relief.',
    description: 'Dry needling targets myofascial trigger points to release muscle tension, reduce pain, and improve movement. Often used as a complement to manual therapy and exercise.',
    duration: '30 min',
    price: 'From $90',
  },
];
