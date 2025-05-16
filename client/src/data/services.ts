export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
};

export const services: Service[] = [
  {
    id: 'digger',
    title: 'Digger & Driver Hire',
    description: 'Professional excavation services for landscaping projects of any size. Our skilled operators can handle all your digging needs.',
    icon: 'fa-truck-monster',
    image: '/assets/IMG_0498.jpeg'
  },
  {
    id: 'fencing',
    title: 'Fencing, Sleepers, Decking & Lighting',
    description: 'Create beautiful boundaries and outdoor living spaces with our quality fencing, sleepers, decking, and atmospheric lighting solutions.',
    icon: 'fa-fence',
    image: 'https://images.unsplash.com/photo-1597845452876-860151fe04a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500'
  },
  {
    id: 'painting',
    title: 'External Painting & Garden Maintenance',
    description: 'Keep your outdoor structures looking fresh with our external painting services, along with comprehensive garden maintenance.',
    icon: 'fa-paint-roller',
    image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500'
  },
  {
    id: 'design',
    title: 'Full Landscape Design',
    description: 'Transform your outdoor space with our comprehensive landscape design services, creating harmony between aesthetics and functionality.',
    icon: 'fa-drafting-compass',
    image: 'https://images.unsplash.com/photo-1551410224-699683e15636?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500'
  },
  {
    id: 'driveways',
    title: 'Driveways & Patios',
    description: 'Enhance your property with our custom driveway and patio solutions, using quality materials for durability and aesthetic appeal.',
    icon: 'fa-road',
    image: 'https://images.unsplash.com/photo-1600240644455-3edc55c375fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500'
  }
];
