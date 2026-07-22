
import img1 from '@assets/Screenshot_2026-07-22_184603_1784753102187.png';
import img2 from '@assets/Screenshot_2026-07-22_184920_1784753102188.png';
import img3 from '@assets/Screenshot_2026-07-22_185003_1784753102189.png';
import img4 from '@assets/Screenshot_2026-07-22_185104_1784753102189.png';
import img5 from '@assets/Screenshot_2026-07-22_185137_1784753102190.png';
import img6 from '@assets/Screenshot_2026-07-22_185213_1784753102190.png';
import img8 from '@assets/Screenshot_2026-07-22_185309_1784753102190.png';
import img9 from '@assets/Screenshot_2026-07-22_185331_1784753102191.png';
import img10 from '@assets/Screenshot_2026-07-22_185358_1784753102191.png';
import img14 from '@assets/Screenshot_2026-07-22_185626_1784753102192.png';
import img15 from '@assets/Screenshot_2026-07-22_185642_1784753102192.png';
import img19 from '@assets/Screenshot_2026-07-22_185839_1784753102193.png';

export type GalleryItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  category: string;
};

export const galleryItems: GalleryItem[] = [
  {
    id: 'garden-clearance',
    title: 'Garden Clearance',
    description: 'Overgrown shrubs and vegetation cleared before the transformation begins — the first step in every great garden project.',
    image: img10,
    alt: 'L&M team member clearing overgrown shrubs and vegetation',
    category: 'Before work'
  },
  {
    id: 'turf-laying',
    title: 'Artificial Turf Installation',
    description: 'Precision cutting and laying of artificial turf with professional edging for a clean, long-lasting finish.',
    image: img6,
    alt: 'L&M team member carefully laying artificial turf',
    category: 'Artificial grass'
  },
  {
    id: 'timber-screening',
    title: 'Timber Screening & Artificial Lawn',
    description: 'Horizontal timber screening panels combined with premium artificial lawn — a low-maintenance, high-impact garden.',
    image: img4,
    alt: 'Garden with horizontal timber screening panels and artificial grass',
    category: 'Fencing'
  },
  {
    id: 'slate-paving',
    title: 'Slate Patio & Paving',
    description: 'Dark slate tiles laid with tight joints and a level finish for a contemporary patio that stands the test of time.',
    image: img3,
    alt: 'Freshly laid dark slate paving slabs for a patio',
    category: 'Paving'
  },
  {
    id: 'picket-fencing',
    title: 'Timber Picket Gate & Fencing',
    description: 'A freshly built timber picket gate with matching fencing — functional, tidy and built to last.',
    image: img19,
    alt: 'New timber picket gate and fence installed at a property',
    category: 'Fencing'
  },
  {
    id: 'grey-patio',
    title: 'Porcelain Patio with Screening',
    description: 'Large-format porcelain tiles laid to create a seamless outdoor living space with coordinating timber screening.',
    image: img9,
    alt: 'Finished porcelain patio with timber screening panels and outdoor seating',
    category: 'Completed garden'
  },
  {
    id: 'turf-with-edging',
    title: 'New Turf with Steel Edging',
    description: 'Freshly laid turf with precision steel edging giving a sharp, defined border between lawn and patio.',
    image: img15,
    alt: 'New turf laid with curved steel edging next to a patio area',
    category: 'Completed garden'
  },
  {
    id: 'artificial-lawn-dusk',
    title: 'Artificial Lawn — Full Garden Finish',
    description: 'A complete garden transformation with artificial lawn, timber screening and patio seen at dusk — ready to use year-round.',
    image: img8,
    alt: 'Completed garden with artificial lawn, fencing and patio photographed at dusk',
    category: 'Completed garden'
  },
  {
    id: 'pressure-washing',
    title: 'Driveway Pressure Washing',
    description: 'Thorough pressure washing restores block paving to near-new condition — fast, effective and great value.',
    image: img14,
    alt: 'Pressure washer cleaning a block paved driveway',
    category: 'Maintenance'
  },
  {
    id: 'enclosed-artificial-lawn',
    title: 'Enclosed Artificial Lawn',
    description: 'A fully enclosed artificial lawn surrounded by tall timber screening panels — private, neat and zero maintenance.',
    image: img5,
    alt: 'Enclosed garden with artificial grass surrounded by tall timber screening panels',
    category: 'Artificial grass'
  },
  {
    id: 'garden-maintenance',
    title: 'Garden Maintenance',
    description: 'Regular garden maintenance keeps everything looking sharp — from decking upkeep to lawn edging and tidying.',
    image: img1,
    alt: 'L&M team member carrying out garden maintenance work on a decked garden',
    category: 'Maintenance'
  },
  {
    id: 'wooden-planter',
    title: 'Bespoke Timber Planter',
    description: 'A custom-built timber planter on castors — handcrafted by the L&M team for a client\'s patio.',
    image: img2,
    alt: 'Bespoke timber planter box on wheels built by L&M Landscape Maintenance',
    category: 'Bespoke builds'
  }
];
