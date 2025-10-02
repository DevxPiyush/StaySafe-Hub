export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: 'male' | 'female' | 'other';
  college?: string;
  company?: string;
  durationOfStay: string;
  emergencyContacts?: EmergencyContact[];
  verificationStatus: 'pending' | 'verified' | 'rejected';
  profilePicture?: string;
  createdAt: Date;
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  type: 'pg' | 'hostel' | 'apartment';
  images: string[];
  videoTour?: string;
  address: Address;
  pricing: Pricing;
  amenities: string[];
  safetyFeatures: SafetyFeature[];
  landlord: Landlord;
  availability: Availability;
  reviews: Review[];
  rating: number;
  isVerified: boolean;
  isGirlsOnly: boolean;
  messIncluded: boolean;
  createdAt: Date;
}

export interface Address {
  street: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  latitude: number;
  longitude: number;
  nearbyPlaces: NearbyPlace[];
}

export interface NearbyPlace {
  name: string;
  type: 'metro' | 'bus' | 'atm' | 'grocery' | 'medical' | 'college' | 'office';
  distance: number; // in meters
}

export interface Pricing {
  rent: number;
  deposit: number;
  messCharges?: number;
  electricityCharges?: number;
  maintenanceCharges?: number;
}

export interface SafetyFeature {
  name: string;
  verified: boolean;
  description?: string;
}

export interface Landlord {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'other';
  phone: string;
  email: string;
  rating: number;
  isVerified: boolean;
  profilePicture?: string;
  totalProperties: number;
}

export interface Availability {
  single: number;
  double: number;
  triple: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userGender: 'male' | 'female' | 'other';
  rating: number;
  comment: string;
  categories: {
    hygiene: number;
    food: number;
    safety: number;
    landlordBehavior: number;
  };
  createdAt: Date;
  isVerified: boolean;
}

export interface Booking {
  id: string;
  userId: string;
  propertyId: string;
  roomType: 'single' | 'double' | 'triple';
  planType: 'room-only' | 'room-mess' | 'mess-only';
  checkInDate: Date;
  checkOutDate?: Date;
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  payment: Payment;
  roommates?: string[];
  createdAt: Date;
}

export interface Payment {
  id: string;
  amount: number;
  breakdown: {
    rent: number;
    deposit: number;
    mess?: number;
    other?: number;
  };
  method: 'upi' | 'card' | 'netbanking';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  createdAt: Date;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
}

export interface SearchFilters {
  location?: string;
  priceRange?: [number, number];
  propertyType?: ('pg' | 'hostel' | 'apartment')[];
  roomType?: ('single' | 'double' | 'triple')[];
  amenities?: string[];
  safetyFeatures?: string[];
  verifiedOnly: boolean;
  girlsOnly?: boolean;
  femalelandlord?: boolean;
  messIncluded?: boolean;
  sortBy?: 'price' | 'rating' | 'distance';
}

export interface EmergencyAlert {
  id: string;
  userId: string;
  location: {
    latitude: number;
    longitude: number;
  };
  timestamp: Date;
  status: 'active' | 'resolved';
  type: 'sos' | 'safety-concern';
}
