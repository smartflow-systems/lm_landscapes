
import diggerImage from '@assets/IMG_0498.jpeg';
import groundworksImage from '@assets/Screenshot_2026-07-22_185358_1784753102191.png';
import fencingImage from '@assets/Screenshot_2026-07-22_185457_1784753102191.png';
import pavingImage from '@assets/Screenshot_2026-07-22_185331_1784753102191.png';
import artificialGrassImage from '@assets/Screenshot_2026-07-22_185137_1784753102190.png';
import paintingImage from '@assets/Screenshot_2026-07-22_185710_1784753102192.png';

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
    description: 'Mini-digger hire with an experienced driver for excavation, garden clearance and preparing difficult ground.',
    icon: 'fa-truck-monster',
    image: diggerImage
  },
  {
    id: 'groundworks',
    title: 'Groundworks & Site Preparation',
    description: 'Clearance, excavation, levelling and compacted sub-base preparation ready for the next stage of your project.',
    icon: 'fa-mountain',
    image: groundworksImage
  },
  {
    id: 'fencing',
    title: 'Fencing, Sleepers & Screening',
    description: 'Practical, tidy boundaries built with fencing, timber screening and sleepers to shape and secure your garden.',
    icon: 'fa-border-all',
    image: fencingImage
  },
  {
    id: 'paving',
    title: 'Patios, Paths & Paving',
    description: 'Neatly laid paving for patios and paths, with careful edging and groundwork for a durable, clean finish.',
    icon: 'fa-road',
    image: pavingImage
  },
  {
    id: 'artificial-grass',
    title: 'Artificial Grass & Garden Finishes',
    description: 'Low-maintenance artificial lawns finished with paving and defined edges for a garden that stays usable year-round.',
    icon: 'fa-leaf',
    image: artificialGrassImage
  },
  {
    id: 'painting',
    title: 'External Painting & Maintenance',
    description: 'Fence and exterior painting alongside general garden maintenance to refresh and protect your outdoor space.',
    icon: 'fa-paint-roller',
    image: paintingImage
  }
];
