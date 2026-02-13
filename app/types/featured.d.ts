interface FeaturedProperty {
    id: number;
    title: string;
    location: string;
    imageUrl: string;
    badges: { label: string; variant: 'primary' | 'secondary' }[];
    bedrooms: string;
    bathrooms: string;
    area: string;
    price: string;
}