
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
    title: 'Tuck Pointing Restoration',
    description: 'Complete restoration of brickwork through professional tuck pointing, enhancing both structural integrity and aesthetic appeal',
    beforeImage: '/assets/IMG_0480.jpeg',
    afterImage: '/assets/IMG_0481.jpeg'
  },
  {
    id: '2',
    title: 'Brick Wall Renovation',
    description: 'Comprehensive brick wall renovation with precise tuck pointing, ensuring long-lasting durability and improved appearance',
    beforeImage: '/assets/IMG_0495.jpeg',
    afterImage: '/assets/IMG_0496.jpeg'
  },
  {
    id: '3',
    title: 'External Painting & Garden Maintenance',
    description: 'Professional external painting and comprehensive garden maintenance services that enhance the appearance of your property',
    beforeImage: '/assets/IMG_0486.jpeg',
    afterImage: '/assets/IMG_0487.jpeg'
  }
];
