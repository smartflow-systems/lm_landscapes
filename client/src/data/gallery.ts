
import siteClearanceImage from '@assets/IMG_0481.jpeg';
import excavatedGardenImage from '@assets/IMG_0480.jpeg';
import fencingImage from '@assets/IMG_0484.jpeg';
import pavedPathImage from '@assets/IMG_0485.jpeg';
import fenceBeforeImage from '@assets/IMG_0487.jpeg';
import fenceAfterImage from '@assets/IMG_0486.jpeg';
import lawnPreparationImage from '@assets/IMG_0488.jpeg';
import artificialLawnImage from '@assets/IMG_0495.jpeg';
import subBaseImage from '@assets/IMG_0497.jpeg';
import diggerImage from '@assets/IMG_0498.jpeg';

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
    id: 'site-clearance',
    title: 'Garden Clearance',
    description: 'The starting condition before vegetation, waste and uneven ground were cleared for a full garden rebuild.',
    image: siteClearanceImage,
    alt: 'Overgrown back garden before clearance and excavation work',
    category: 'Before work'
  },
  {
    id: 'ground-preparation',
    title: 'Excavation & Ground Preparation',
    description: 'The same garden cleared, excavated and levelled with a compacted stone base ready for landscaping.',
    image: excavatedGardenImage,
    alt: 'Cleared back garden with compacted sub-base after digger excavation',
    category: 'Groundworks'
  },
  {
    id: 'timber-screening',
    title: 'Timber Screening & Sleepers',
    description: 'Horizontal timber screening, painted fencing and sleeper edging used to define a prepared garden.',
    image: fencingImage,
    alt: 'Garden with horizontal timber screening, painted fencing and sleeper edging',
    category: 'Fencing'
  },
  {
    id: 'paved-path',
    title: 'Paved Garden Path',
    description: 'A straight paved path installed with crisp edging and space prepared for the surrounding finish.',
    image: pavedPathImage,
    alt: 'New grey paved garden path with neat edging',
    category: 'Paving'
  },
  {
    id: 'fence-before',
    title: 'Fence Refresh — Before',
    description: 'Weathered fence panels before preparation and exterior painting work began.',
    image: fenceBeforeImage,
    alt: 'Weathered brown garden fencing before exterior painting',
    category: 'Before work'
  },
  {
    id: 'fence-after',
    title: 'Fence Refresh — After',
    description: 'Fence panels refreshed in black for a cleaner, more consistent garden boundary.',
    image: fenceAfterImage,
    alt: 'Garden fencing freshly painted black',
    category: 'External painting'
  },
  {
    id: 'lawn-preparation',
    title: 'Lawn Base Preparation',
    description: 'A defined lawn area excavated and prepared before the final surface was installed.',
    image: lawnPreparationImage,
    alt: 'Prepared rectangular garden area ready for a new lawn surface',
    category: 'Preparation'
  },
  {
    id: 'artificial-lawn',
    title: 'Artificial Lawn & Patio Finish',
    description: 'A low-maintenance artificial lawn completed alongside a clean, raised paved patio.',
    image: artificialLawnImage,
    alt: 'Finished artificial lawn with raised paved patio and garden fencing',
    category: 'Completed garden'
  },
  {
    id: 'sub-base',
    title: 'Compacted Sub-base',
    description: 'Stone sub-base levelled and compacted to create a firm foundation for the final surface.',
    image: subBaseImage,
    alt: 'Levelled compacted stone sub-base beside a brick wall',
    category: 'Groundworks'
  },
  {
    id: 'digger-work',
    title: 'Mini-digger Excavation',
    description: 'A compact digger working safely in a restricted garden to remove and reshape difficult ground.',
    image: diggerImage,
    alt: 'Mini digger excavating a sloped garden site',
    category: 'Digger & driver'
  }
];
