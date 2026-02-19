interface Property {
    id: string;
    title: string;
    slug?: string;
    location: PropertyLoc;
    propertiesTypeId?: string;
    type: PropertyType;
    badges: PropertyBadge[];
    content: string;
    thumbnailUrl: string;
    imageUrl: string[];
    bedrooms: string;
    bathrooms: string;
    area: string;
    price: string;
    priceValue: number;
    status: 'draft' | 'published' | 'archived';
    author?: Author;
    createdAt?: Date;
    updatedAt?: Date;
}

interface Author {
    displayName: string;
    email: string;
    phoneNumber: string;
    photoURL?: string;
}

interface PropertyLoc {
    name: string,
    locationsId: string
}

interface PropertyType {
    name: string,
    propertiesTypeId: string
}

interface PropertyBadge {
    name: string,
    badgesId: string
}

//======================= Property Type (dashboard) =======================//
interface PropertyType {
    id: string;
    name: string;
    propertiesTypeId?: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

//======================= Property Location (dashboard) =======================//
interface PropertyLocation {
    id: string;
    name: string;
    locationsId?: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

//======================= Property Badge (dashboard) =======================//
interface PropertyBadge {
    id: string;
    name: string;
    badgesId?: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}