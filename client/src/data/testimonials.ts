export type Testimonial = {
  id: string;
  text: string;
  name: string;
  type: string;
  initial: string;
};

export const testimonials: Testimonial[] = [
  {
    id: '1',
    text: 'L&M completely transformed our garden. The team was professional, punctual, and went above and beyond. Our new patio and landscaping has become the envy of our neighbors!',
    name: 'Sarah Thompson',
    type: 'Residential Client',
    initial: 'S'
  },
  {
    id: '2',
    text: 'The digger and driver service was excellent. They completed a large excavation job quickly and efficiently, with minimal disruption to our property. Highly recommended!',
    name: 'Michael Rogers',
    type: 'Commercial Client',
    initial: 'M'
  },
  {
    id: '3',
    text: 'We\'ve been using L&M for regular garden maintenance for over a year now. Their attention to detail is remarkable, and our garden has never looked better. A reliable and trustworthy service.',
    name: 'Jennifer Wilson',
    type: 'Residential Client',
    initial: 'J'
  }
];
