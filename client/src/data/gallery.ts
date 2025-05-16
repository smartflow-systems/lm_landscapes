
export type GalleryItem = {
  id: string;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
};

export const galleryItems: GalleryItem[] = [
  {
    id: '1',
    title: 'Garden Transformation',
    description: 'Complete garden renovation with professional landscaping, enhancing both aesthetic appeal and functionality',
    beforeImage: '/assets/IMG_0480.jpeg',
    afterImage: '/assets/IMG_0481.jpeg'
  },
  {
    id: '2',
    title: 'Patio & Garden Installation',
    description: 'Comprehensive patio construction and garden planting, creating a beautiful outdoor living space',
    beforeImage: '/assets/IMG_0495.jpeg',
    afterImage: '/assets/IMG_0496.jpeg'
  },
  {
    id: '3',
    title: 'Lawn & Landscape Renovation',
    description: 'Professional lawn installation and landscape design that transforms the appearance of your property',
    beforeImage: '/assets/IMG_0486.jpeg',
    afterImage: '/assets/IMG_0487.jpeg'
  },
  {
    id: '4',
    title: 'Outdoor Living Space',
    description: 'Creation of functional outdoor living areas with professional landscaping and garden features',
    beforeImage: '/assets/IMG_0490.jpeg',
    afterImage: '/assets/IMG_0491.jpeg'
  },
  {
    id: '5',
    title: 'Garden Bedding & Planting',
    description: 'Expert garden bed preparation and planting, adding color and life to your outdoor space',
    beforeImage: '/assets/IMG_0492.jpeg',
    afterImage: '/assets/IMG_0493.jpeg'
  },
  {
    id: '6',
    title: 'Complete Yard Makeover',
    description: 'Transformation of your entire yard with professional landscaping, plantings, and lawn installation',
    beforeImage: '/assets/IMG_0497.jpeg',
    afterImage: '/assets/IMG_0498.jpeg'
  }
];
