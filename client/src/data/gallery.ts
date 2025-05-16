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
    title: 'Garden Renovation',
    description: 'Complete transformation of an overgrown garden into a maintained landscape',
    beforeImage: 'https://images.unsplash.com/photo-1627759566062-a5e0c163cd37?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500',
    afterImage: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500'
  },
  {
    id: '2',
    title: 'Driveway Installation',
    description: 'Replacing an old concrete driveway with a beautiful stone paved design',
    beforeImage: 'https://images.unsplash.com/photo-1571737316396-8cda9bc8c6a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500',
    afterImage: 'https://images.unsplash.com/photo-1600240644455-3edc55c375fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500'
  },
  {
    id: '3',
    title: 'Decking & Lighting',
    description: 'Adding a custom wooden deck with integrated lighting for evening enjoyment',
    beforeImage: 'https://images.unsplash.com/photo-1558370781-d6196949e317?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500',
    afterImage: 'https://images.unsplash.com/photo-1597845452876-860151fe04a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500'
  }
];
