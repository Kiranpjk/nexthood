import type { Neighborhood } from './types';

export const AMENITIES = ['parks', 'metro', 'cafes', 'nightlife', 'gyms', 'markets', 'schools'];

export const neighborhoods: Neighborhood[] = [
  {
    id: 1,
    name: 'Koramangala',
    city: 'Bengaluru',
    data: 'Koramangala is a bustling neighborhood, popular with young professionals and startups. It has a mix of luxury apartments, cozy cafes, and vibrant nightlife. It is well-connected but can have traffic issues. Numerous parks and gyms are available.',
    image: 'https://placehold.co/600x400.png',
    avgRent: 35000,
    walkScore: 85,
    amenities: ['parks', 'cafes', 'nightlife', 'gyms', 'markets']
  },
  {
    id: 2,
    name: 'Bandra West',
    city: 'Mumbai',
    data: 'Bandra West is a trendy, upscale coastal suburb known for its celebrity residents, fashion boutiques, and sea-facing promenades. It has a vibrant nightlife and a wide variety of restaurants. It is well-connected by local trains.',
    image: 'https://placehold.co/600x400.png',
    avgRent: 80000,
    walkScore: 90,
    amenities: ['nightlife', 'cafes', 'markets', 'gyms']
  },
  {
    id: 3,
    name: 'Hauz Khas Village',
    city: 'New Delhi',
    data: 'Hauz Khas Village is a unique mix of historical ruins and modern urban culture. It is known for its high-end boutiques, art galleries, and a lively bar scene overlooking a lake. It is adjacent to a large deer park. Metro connectivity is good.',
    image: 'https://placehold.co/600x400.png',
    avgRent: 45000,
    walkScore: 78,
    amenities: ['parks', 'nightlife', 'cafes', 'metro']
  },
  {
    id: 4,
    name: 'Indiranagar',
    city: 'Bengaluru',
    data: 'Indiranagar is a posh residential and commercial locality. It is famous for its 100 Feet Road, which is packed with breweries, restaurants, and retail stores. It has excellent metro connectivity and several well-maintained parks.',
    image: 'https://placehold.co/600x400.png',
    avgRent: 40000,
    walkScore: 88,
    amenities: ['parks', 'metro', 'cafes', 'nightlife', 'gyms']
  },
    {
    id: 5,
    name: 'Powai',
    city: 'Mumbai',
    data: 'Centered around the scenic Powai Lake, this neighborhood is a well-planned area with a mix of residential and commercial spaces. Home to IIT Bombay, it has a youthful vibe. It offers a relatively peaceful environment with good schools and hospitals, but can be expensive.',
    image: 'https://placehold.co/600x400.png',
    avgRent: 60000,
    walkScore: 70,
    amenities: ['parks', 'schools', 'cafes', 'gyms']
  },
  {
    id: 6,
    name: 'Cyber Hub',
    city: 'Gurugram',
    data: 'Cyber Hub is a futuristic commercial and entertainment hub. While not strictly a residential area, its surroundings are full of modern apartments. It is a major destination for dining and nightlife, catering to the professionals working in the area. Excellent metro connectivity.',
    image: 'https://placehold.co/600x400.png',
    avgRent: 50000,
    walkScore: 82,
    amenities: ['metro', 'cafes', 'nightlife', 'gyms']
  }
];
