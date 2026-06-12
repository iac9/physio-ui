export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const faqs: FAQItem[] = [
  {
    id: '1',
    category: 'Appointments',
    question: 'Do I need a referral to see a physiotherapist?',
    answer: 'No referral is needed to see a physiotherapist in Australia. You can book directly. However, if you have a GP Management Plan (GPMP), you may be eligible for Medicare-rebated sessions — speak to your GP about this.',
  },
  {
    id: '2',
    category: 'Appointments',
    question: 'How long is a typical appointment?',
    answer: 'An initial consultation is 60 minutes to allow for a thorough assessment and commencement of treatment. Follow-up appointments are 30 minutes, and extended rehabilitation sessions are 45 minutes.',
  },
  {
    id: '3',
    category: 'Appointments',
    question: 'What should I bring to my first appointment?',
    answer: 'Please bring any relevant imaging (X-rays, MRI scans), referral letters, a list of current medications, and your private health insurance card if applicable. Wear comfortable, loose-fitting clothing that allows easy access to the area being treated.',
  },
  {
    id: '4',
    category: 'Treatment',
    question: 'Will physiotherapy be painful?',
    answer: 'Some treatments may cause mild discomfort, particularly when working with an area that is inflamed or tight. Huy will always communicate what to expect and work within your comfort level. Any soreness after a session typically resolves within 24–48 hours.',
  },
  {
    id: '5',
    category: 'Treatment',
    question: 'How many sessions will I need?',
    answer: 'This varies depending on your condition, severity, and goals. Many acute injuries improve within 4–6 sessions, while chronic conditions or post-surgical rehab may require a longer program. Huy will give you a realistic timeframe at your initial assessment.',
  },
  {
    id: '6',
    category: 'Treatment',
    question: 'Do you offer dry needling?',
    answer: 'Yes. Dry needling is offered as a complementary treatment for muscle tension, trigger points, and certain pain conditions. It is different from acupuncture and is used alongside manual therapy and exercise to enhance outcomes.',
  },
  {
    id: '7',
    category: 'Costs & Rebates',
    question: 'Does private health insurance cover physiotherapy?',
    answer: 'Yes, most private health insurance extras policies cover physiotherapy. The rebate amount depends on your specific policy. Please check with your insurer to confirm your entitlements before your appointment.',
  },
  {
    id: '8',
    category: 'Costs & Rebates',
    question: 'Is WorkCover or TAC accepted?',
    answer: 'Yes, we accept patients with WorkCover (workplace injury) and TAC (transport accident) claims. Please bring your claim number and relevant paperwork to your first appointment.',
  },
  {
    id: '9',
    category: 'Costs & Rebates',
    question: 'What are your payment options?',
    answer: 'We accept EFTPOS, credit/debit card, and cash. HICAPS is available for on-the-spot private health insurance claiming. Payment is due at the time of your appointment.',
  },
  {
    id: '10',
    category: 'Location & Hours',
    question: 'Where are you located and what are your hours?',
    answer: 'We are located in Mitcham, Victoria. The clinic is open Monday to Friday, 9:00 AM – 7:00 PM. Please contact us for the exact address and parking information.',
  },
];
