interface FeaturedProperty {
    id: number;
    title: string;
    location: string;
    type: 'Rumah Modern' | 'Apartemen Halal' | 'Villa Tropis';
    imageUrl: string;
    badges: { label: string; variant: 'primary' | 'secondary' }[];
    bedrooms: string;
    bathrooms: string;
    area: string;
    price: string;
    /** Harga dalam juta untuk filtering */
    priceValue: number;
}