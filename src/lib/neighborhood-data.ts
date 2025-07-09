import type { Neighborhood } from './types';

export const AMENITIES = ['parks', 'schools', 'cafes', 'nightlife', 'gyms', 'groceries'];

export const neighborhoods: Neighborhood[] = [
  {
    id: 1,
    name: 'Greenwood',
    city: 'Seattle',
    data: 'Greenwood is a family-friendly neighborhood with many parks, including the large Greenwood Park. It has several highly-rated public schools. The area is mostly residential with quiet streets. Coffee shops and small restaurants are scattered throughout. Public transport is available but not as frequent as downtown. The crime rate is lower than the city average.',
    image: 'https://placehold.co/600x400.png',
    avgRent: 2200,
    walkScore: 75,
    amenities: ['parks', 'schools', 'cafes']
  },
  {
    id: 2,
    name: 'Capitol Hill',
    city: 'Seattle',
    data: 'Capitol Hill is a vibrant and dense urban neighborhood known for its bustling nightlife, diverse restaurants, and strong LGBTQ+ community. It offers excellent walkability and public transit options. Housing consists mainly of apartments and condos. While it has some parks like Volunteer Park, it is primarily a busy, energetic area with a higher noise level and crime rate compared to quieter suburbs.',
    image: 'https://placehold.co/600x400.png',
    avgRent: 2500,
    walkScore: 94,
    amenities: ['nightlife', 'cafes', 'groceries', 'gyms']
  },
  {
    id: 3,
    name: 'The Mission',
    city: 'San Francisco',
    data: 'The Mission District is a culturally rich neighborhood famous for its street art, taquerias, and sunny weather. It has a vibrant, youthful energy with many bars, music venues, and unique shops. Dolores Park is a major hub of activity. The area is very walkable and well-connected by BART and MUNI. Housing is a mix of Victorian homes and modern apartments, but can be expensive.',
    image: 'https://placehold.co/600x400.png',
    avgRent: 3500,
    walkScore: 97,
    amenities: ['parks', 'nightlife', 'cafes', 'groceries']
  },
  {
    id: 4,
    name: 'Park Slope',
    city: 'New York City',
    data: 'Park Slope in Brooklyn is known for its historic brownstones, top-rated schools, and family-oriented atmosphere. It borders Prospect Park, offering vast green space. The streets are lined with trees, independent boutiques, and restaurants. It is a very safe and quiet neighborhood, making it popular with families, despite the high cost of living. Excellent subway access.',
    image: 'https://placehold.co/600x400.png',
    avgRent: 4200,
    walkScore: 91,
    amenities: ['parks', 'schools', 'cafes', 'groceries']
  },
    {
    id: 5,
    name: 'Wicker Park',
    city: 'Chicago',
    data: 'Wicker Park is a trendy neighborhood known for its eclectic arts scene, live music venues, and unique fashion boutiques. It has a lively nightlife centered around Milwaukee Avenue. The area features a mix of historic mansions and modern condos. It is highly walkable and has great access to the "L" train Blue Line. The 606 trail offers a great path for walking and biking.',
    image: 'https://placehold.co/600x400.png',
    avgRent: 2800,
    walkScore: 92,
    amenities: ['parks', 'nightlife', 'cafes', 'gyms']
  },
  {
    id: 6,
    name: 'Ballard',
    city: 'Seattle',
    data: 'Once a Scandinavian fishing village, Ballard is now a hip neighborhood with a popular farmers market, numerous craft breweries, and a vibrant main street. It maintains a sense of community while offering many modern amenities. It has some waterfront access at Golden Gardens Park. Public transit to downtown can be slow, but it is fairly walkable within the core neighborhood.',
    image: 'https://placehold.co/600x400.png',
    avgRent: 2400,
    walkScore: 88,
    amenities: ['parks', 'cafes', 'nightlife', 'groceries']
  }
];
