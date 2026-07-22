export type Role = "Traveler" | "Host Family" | "Artisan" | "Car Rental" | "Activity Provider";
export type ServiceKind = "host" | "car" | "artisan" | "activity";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  avatar: string;
  bio?: string;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Host {
  id: string;
  name: string;
  city: string;
  country: string;
  coordinates: [number, number];
  cover: string;
  gallery: string[];
  description: string;
  verified: boolean;
  languages: string[];
  children: boolean;
  pets: boolean;
  environment: "Calm" | "Balanced" | "Social";
  traditionalClothes: boolean;
  bikeRental: boolean;
  experiences: string[];
  availability: string[];
  price: number;
  rating: number;
  reviews: Review[];
}

export interface Vehicle {
  id: string;
  name: string;
  category: "Economy" | "Family" | "SUV" | "Luxury";
  cover: string;
  gallery: string[];
  transmission: "Manual" | "Automatic";
  fuel: "Petrol" | "Diesel" | "Hybrid";
  seats: number;
  bags: number;
  price: number;
  driverOption: boolean;
  available: boolean;
  city: string;
  coordinates: [number, number];
}

export interface Artisan {
  id: string;
  name: string;
  craft: "Pottery" | "Wood carving" | "Traditional cooking";
  story: string;
  yearsExperience: number;
  materials: string[];
  cover: string;
  gallery: string[];
  city: string;
  coordinates: [number, number];
  availability: string[];
  verified: boolean;
  price: number;
  rating: number;
  reviews: Review[];
}

export interface Activity {
  id: string;
  title: string;
  category: "Kayak" | "Hiking" | "Scuba" | "Cooking" | "Mountain tours" | "Festivals";
  description: string;
  cover: string;
  gallery: string[];
  difficulty: "Easy" | "Moderate" | "Sporty";
  duration: string;
  minimumAge: number;
  equipment: string[];
  guide: string;
  languages: string[];
  city: string;
  coordinates: [number, number];
  price: number;
  rating: number;
}

export interface HiddenGem {
  id: string;
  name: string;
  category: "Nature" | "Food" | "Culture" | "Viewpoint";
  city: string;
  description: string;
  image: string;
  coordinates: [number, number];
}

export interface Booking {
  id: string;
  kind: ServiceKind;
  itemId: string;
  title: string;
  date: string;
  total: number;
  status: "Pending" | "Confirmed" | "Cancelled";
}

export interface Conversation {
  id: string;
  kind: ServiceKind;
  name: string;
  avatar: string;
  online: boolean;
  messages: { id: string; sender: "me" | "them"; text: string; time: string }[];
}

export interface Contract {
  id: string;
  traveler: string;
  host: string;
  services: string[];
  total: number;
  status: "Draft" | "Signed" | "Pending";
  date: string;
}

export interface QuizAnswers {
  companions?: string;
  number?: string;
  age?: string;
  languages: string[];
  hostLanguage?: string;
  genderCompatibility?: string;
  privacy?: string;
  children?: string;
  pets?: string;
  environment?: string;
  immersion?: string;
  activityAmount?: string;
  carNeeded?: string;
  vehicleType?: string;
  driver?: string;
  workshop?: string;
  workshopPreferences: string[];
  interests: string[];
  rhythm?: string;
  nightBudget?: string;
  overallBudget?: string;
}

export interface PackageItemDates {
  /** Car rental window inside the trip */
  carStart?: string;
  carEnd?: string;
  /** Single-day workshop */
  artisanDate?: string;
  /** Activity id → scheduled day */
  activities: Record<string, string>;
}

export interface PackageSelection {
  host?: string;
  car?: string;
  artisan?: string;
  activities: string[];
  startDate?: string;
  endDate?: string;
  itemDates: PackageItemDates;
  confirmed?: boolean;
}
