
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
    beforeImage: '/attached_assets/IMG_0480.jpeg',
    afterImage: '/attached_assets/IMG_0481.jpeg'
  },
  {
    id: '2',
    title: 'Brick Wall Renovation',
    description: 'Comprehensive brick wall renovation with precise tuck pointing, ensuring long-lasting durability and improved appearance',
    beforeImage: '/attached_assets/IMG_0495.jpeg',
    afterImage: '/attached_assets/IMG_0496.jpeg'
  },
  {
    id: '3',
    title: 'Heritage Masonry Work',
    description: 'Detailed tuck pointing work on heritage brickwork, preserving historical character while reinforcing structural stability',
    beforeImage: '/attached_assets/IMG_0486.jpeg',
    afterImage: '/attached_assets/IMG_0487.jpeg'
  }
];
