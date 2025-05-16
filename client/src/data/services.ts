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
    image: '/assets/IMG_0483.jpeg'
  },
  {
    id: 'painting',
    title: 'External Painting & Garden Maintenance',
    description: 'Keep your outdoor structures looking fresh with our external painting services, along with comprehensive garden maintenance.',
    icon: 'fa-paint-roller',
    image: '/assets/IMG_0484.jpeg'
  },
  {
    id: 'design',
    title: 'Full Landscape Design',
    description: 'Transform your outdoor space with our comprehensive landscape design services, creating harmony between aesthetics and functionality.',
    icon: 'fa-drafting-compass',
    image: '/assets/IMG_0485.jpeg'
  },
  {
    id: 'driveways',
    title: 'Driveways & Patios',
    description: 'Enhance your property with our custom driveway and patio solutions, using quality materials for durability and aesthetic appeal.',
    icon: 'fa-road',
    image: '/assets/IMG_0488.jpeg'
  },
  {
    id: 'maintenance',
    title: 'Lawn & Garden Maintenance',
    description: 'Keep your outdoor space looking its best with our professional lawn care and garden maintenance services all year round.',
    icon: 'fa-leaf',
    image: '/assets/IMG_0489.jpeg'
  }
];
