import type {
  Activity,
  Artisan,
  Booking,
  Contract,
  Conversation,
  HiddenGem,
  Host,
  Review,
  User,
  Vehicle,
} from "@/types";

const photos = {
  homes: [
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
  ],
  cars: [
    "/car-renault-clio.png",
    "/car-peugeot-208.png",
    "/car-dacia-duster.png",
    "/car-toyota-prado.png",
  ],
  pottery: [
    "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=85",
  ],
  wood: ["/artisan-wood-carving.png"],
  couscous: ["/artisan-couscous.png"],
  kayak: [
    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1504150558240-0b5fd6fdad4d?auto=format&fit=crop&w=1200&q=85",
  ],
  food: [
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=85",
  ],
  forest: ["/gem-forest-path.png"],
  rooftop: ["/gem-rooftop-terrace.png"],
  arch: ["/gem-stone-arch.png"],
  door: ["/gem-blue-door.png"],
};

const activityPhotos: Record<string, string[]> = {
  Kayak: [...photos.kayak],
  Hiking: [photos.forest[0], photos.arch[0]],
  Scuba: [photos.rooftop[0], photos.door[0]],
  Cooking: [...photos.food],
  "Mountain tours": [photos.arch[0], photos.forest[0]],
  Festivals: [photos.door[0], photos.rooftop[0]],
};

const gemPhotos: Record<string, string[]> = {
  Nature: [photos.forest[0], photos.arch[0]],
  Food: [...photos.food],
  Culture: [photos.door[0], photos.rooftop[0]],
  Viewpoint: [photos.arch[0], photos.rooftop[0]],
};

const cities = [
  ["Algiers", 36.7538, 3.0588],
  ["Oran", 35.6969, -0.6331],
  ["Constantine", 36.365, 6.6147],
  ["Tlemcen", 34.8783, -1.315],
  ["Ghardaïa", 32.49, 3.67],
  ["Béjaïa", 36.7515, 5.0557],
  ["Tamanrasset", 22.785, 5.5228],
  ["Annaba", 36.9, 7.7667],
  ["Blida", 36.4702, 2.8289],
  ["Skikda", 36.8764, 6.9094],
] as const;

const reviewProfiles = [
  { name: "Amel", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&crop=face&w=120&h=120&q=85" },
  { name: "Yasmine", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&crop=face&w=120&h=120&q=85" },
  { name: "Karim", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&crop=face&w=120&h=120&q=85" },
  { name: "Nadia", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&crop=face&w=120&h=120&q=85" },
  { name: "Sofiane", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&crop=face&w=120&h=120&q=85" },
  { name: "Lina", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&crop=face&w=120&h=120&q=85" },
  { name: "Rachid", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&crop=face&w=120&h=120&q=85" },
  { name: "Samira", avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&crop=face&w=120&h=120&q=85" },
  { name: "Walid", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&crop=face&w=120&h=120&q=85" },
  { name: "Djamila", avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&crop=face&w=120&h=120&q=85" },
];
const people = reviewProfiles.map((profile) => profile.name);
const hostFamilyNames = [
  "Nadia & Mourad Bensalem",
  "Samira & Youcef Aït Ahmed",
  "Khadija & Rachid Benyahia",
  "Amel & Sofiane Boumediene",
  "Djamila & Kamel Belkacem",
  "Lila & Hakim Mokrani",
  "Yamina & Farid Amrani",
  "Nassima & Djamel Boudiaf",
  "Soraya & Karim Kaci",
  "Malika & Nabil Meziane",
  "Farida & Abdelkader Rahmani",
  "Houria & Samir Saïdi",
  "Naïma & Mourad Zerrouki",
  "Aïcha & Reda Touati",
  "Leïla & Yacine Bensaïd",
  "Warda & Mustapha Hadjres",
  "Fatiha & Ali Aït Ouabane",
  "Zohra & Hamid Merabet",
  "Nouria & Salim Bouzidi",
  "Razika & Lounès Chérif",
];

export const reviews: Review[] = Array.from({ length: 50 }, (_, index) => ({
  id: `review-${index + 1}`,
  author: reviewProfiles[index % reviewProfiles.length].name,
  avatar: reviewProfiles[index % reviewProfiles.length].avatar,
  rating: index % 7 === 0 ? 4 : 5,
  comment: [
    "An unforgettable welcome. We felt part of the family from our first evening.",
    "Beautifully organized, deeply authentic, and full of thoughtful local details.",
    "A warm experience with excellent communication and wonderful recommendations.",
    "The highlight of our Algeria journey. I would return without hesitation.",
  ][index % 4],
  date: `2026-${String((index % 6) + 1).padStart(2, "0")}-${String((index % 26) + 1).padStart(2, "0")}`,
}));

export const hosts: Host[] = Array.from({ length: 20 }, (_, index) => {
  const city = cities[index % cities.length];
  return {
    id: `host-${index + 1}`,
    name: hostFamilyNames[index],
    city: city[0],
    country: "Algeria",
    coordinates: [city[1] + (index % 3) * 0.01, city[2] + (index % 4) * 0.01],
    cover: photos.homes[index % photos.homes.length],
    gallery: photos.homes,
    description: "A welcoming multigenerational home where shared couscous, stories, and slow mornings turn a stay into a genuine cultural exchange.",
    verified: true,
    languages: index % 2 ? ["Arabic", "French", "English"] : ["Arabic", "French"],
    children: index % 3 !== 0,
    pets: index % 4 === 0,
    environment: (["Calm", "Balanced", "Social"] as const)[index % 3],
    traditionalClothes: index % 2 === 0,
    bikeRental: index % 3 === 0,
    experiences: index % 2 ? ["Traditional cooking", "Market walk"] : ["Gardening", "Animal care"],
    availability: ["2026-08-12", "2026-08-13", "2026-08-14"],
    price: (38 + index * 3) * 150,
    rating: Number((4.6 + (index % 4) * 0.1).toFixed(1)),
    reviews: reviews.slice((index * 2) % 44, (index * 2) % 44 + 6),
  };
});

const carCatalog = [
  { name: "Renault Clio Campus", category: "Economy" as const, image: photos.cars[0] },
  { name: "Peugeot 208 GT", category: "Family" as const, image: photos.cars[1] },
  { name: "Dacia Duster", category: "SUV" as const, image: photos.cars[2] },
  { name: "Toyota Land Cruiser Prado", category: "Luxury" as const, image: photos.cars[3] },
];
export const vehicles: Vehicle[] = Array.from({ length: 25 }, (_, index) => {
  const model = carCatalog[index % carCatalog.length];
  const category = model.category;
  const city = cities[index % cities.length];
  return {
    id: `car-${index + 1}`,
    name: `${model.name} ${2022 + (index % 4)}`,
    category,
    cover: model.image,
    gallery: [model.image, model.image, model.image],
    transmission: index % 2 ? "Automatic" : "Manual",
    fuel: (["Petrol", "Diesel", "Hybrid"] as const)[index % 3],
    seats: category === "SUV" ? 7 : 5,
    bags: category === "Economy" ? 2 : 4,
    price: (28 + index * 4) * 150,
    driverOption: true,
    available: index % 6 !== 0,
    city: city[0],
    coordinates: [city[1], city[2]],
  };
});

const crafts = ["Pottery", "Wood carving", "Traditional cooking"] as const;
const craftPhotos = {
  Pottery: photos.pottery,
  "Wood carving": photos.wood,
  "Traditional cooking": photos.couscous,
} as const;
const craftMaterials = {
  Pottery: ["Local clay", "Natural pigments", "Kiln-fired glaze"],
  "Wood carving": ["Olive wood", "Walnut", "Hand tools"],
  "Traditional cooking": ["Semolina", "Seasonal vegetables", "Family recipes"],
} as const;

export const artisans: Artisan[] = Array.from({ length: 15 }, (_, index) => {
  const city = cities[index % cities.length];
  const craft = crafts[index % crafts.length];
  const gallery = [...craftPhotos[craft]];
  return {
    id: `artisan-${index + 1}`,
    name: `${people[index % people.length]} ${["B.", "K.", "M."][index % 3]}`,
    craft,
    story: "Raised among makers, this artisan preserves ancestral gestures while inviting travelers to create a meaningful piece of their own.",
    yearsExperience: 8 + index * 2,
    materials: craftMaterials[craft].slice(0, 2 + (index % 2)),
    cover: gallery[index % gallery.length],
    gallery,
    city: city[0],
    coordinates: [city[1], city[2]],
    availability: ["2026-08-14", "2026-08-16", "2026-08-19"],
    verified: true,
    price: (22 + index * 3) * 150,
    rating: Number((4.7 + (index % 3) * 0.1).toFixed(1)),
    reviews: reviews.slice(index, index + 4),
  };
});

const activityCategories = ["Kayak", "Hiking", "Scuba", "Cooking", "Mountain tours", "Festivals"] as const;
const activitySuffixes = ["Discovery", "Escape", "with locals", "Adventure", "Masterclass"] as const;
const cityByName = Object.fromEntries(cities.map(([name, lat, lng]) => [name, [lat, lng] as const]));

export const activities: Activity[] = Array.from({ length: 30 }, (_, index) => {
  const category = activityCategories[index % activityCategories.length];
  const suffix = activitySuffixes[index % activitySuffixes.length];
  const title = category === "Mountain tours" && suffix === "Discovery"
    ? "Mountain Discovery"
    : `${category} ${suffix}`;
  const isMountainDiscovery = title === "Mountain Discovery";
  const city = isMountainDiscovery
    ? (["Skikda", ...cityByName.Skikda] as const)
    : cities[index % cities.length];
  const gallery = isMountainDiscovery
    ? [photos.arch[0], photos.forest[0]]
    : activityPhotos[category];
  return {
    id: `activity-${index + 1}`,
    title,
    category,
    description: "A small-group experience designed by local guides to reveal landscapes, flavors, and stories beyond the usual itinerary.",
    cover: isMountainDiscovery ? photos.arch[0] : gallery[index % gallery.length],
    gallery,
    difficulty: (["Easy", "Moderate", "Sporty"] as const)[index % 3],
    duration: `${2 + (index % 6)} hours`,
    minimumAge: 8 + (index % 5) * 2,
    equipment: ["Safety equipment", "Local guide", "Refreshments"],
    guide: people[(index + 2) % people.length],
    languages: ["Arabic", "French", index % 2 ? "English" : "Spanish"],
    city: city[0],
    coordinates: [city[1], city[2]],
    price: (18 + index * 2) * 150,
    rating: Number((4.5 + (index % 5) * 0.1).toFixed(1)),
  };
});

const gemCatalog = [
  { name: "Cedar Forest Path", category: "Nature" as const, city: "Blida", image: photos.forest[0] },
  { name: "Old Medina Bakery", category: "Food" as const, city: null, image: null },
  { name: "Secret Casbah Terrace", category: "Culture" as const, city: "Algiers", image: photos.rooftop[0] },
  { name: "Sunset Stone Arch", category: "Viewpoint" as const, city: "Blida", image: photos.arch[0] },
  { name: "Hidden Olive Grove", category: "Nature" as const, city: "Blida", image: photos.forest[0] },
  { name: "Harbor Spice Stall", category: "Food" as const, city: null, image: null },
  { name: "Blue Door Alley", category: "Culture" as const, city: "Oran", image: photos.door[0] },
  { name: "Cliffside Lookout", category: "Viewpoint" as const, city: "Blida", image: photos.arch[0] },
  { name: "Mountain Spring Trail", category: "Nature" as const, city: "Skikda", image: photos.forest[0] },
  { name: "Courtyard Mint Tea", category: "Food" as const, city: null, image: null },
  { name: "Ottoman Fountain Square", category: "Culture" as const, city: "Constantine", image: photos.door[0] },
  { name: "Desert Ridge Viewpoint", category: "Viewpoint" as const, city: "Blida", image: photos.arch[0] },
  { name: "Coastal Pine Grove", category: "Nature" as const, city: "Skikda", image: photos.forest[0] },
  { name: "Night Market Flatbread", category: "Food" as const, city: null, image: null },
  { name: "Mosaic Courtyard", category: "Culture" as const, city: "Tlemcen", image: photos.rooftop[0] },
  { name: "Bay Overlook", category: "Viewpoint" as const, city: "Blida", image: photos.arch[0] },
  { name: "Palm Oasis Walk", category: "Nature" as const, city: "Ghardaïa", image: photos.forest[0] },
  { name: "Fishermen’s Breakfast", category: "Food" as const, city: null, image: null },
  { name: "Heritage Doorway Lane", category: "Culture" as const, city: "Annaba", image: photos.door[0] },
  { name: "Golden Hour Rooftop", category: "Viewpoint" as const, city: "Algiers", image: photos.rooftop[0] },
];

export const hiddenGems: HiddenGem[] = gemCatalog.map((gem, index) => {
  const fallback = cities[index % cities.length];
  const cityName = gem.city ?? fallback[0];
  const coords = cityByName[cityName] ?? [fallback[1], fallback[2]];
  const gallery = gemPhotos[gem.category];
  const image = gem.image ?? gallery[index % gallery.length];
  return {
    id: `gem-${index + 1}`,
    name: gem.name,
    category: gem.category,
    city: cityName,
    description: "A quiet local favorite, best discovered slowly and respectfully.",
    image,
    coordinates: [coords[0] + 0.02, coords[1] - 0.02],
  };
});

export const users: User[] = [{
  id: "user-1",
  name: "Maya Laurent",
  email: "maya@ahlana.travel",
  password: "welcome",
  role: "Traveler",
  avatar: "https://i.pravatar.cc/200?img=47",
  bio: "Curious traveler, food lover, and collector of local stories.",
}];

export const bookings: Booking[] = Array.from({ length: 15 }, (_, index) => ({
  id: `booking-${index + 1}`,
  kind: (["host", "activity", "artisan", "car"] as const)[index % 4],
  itemId: index % 4 === 0 ? hosts[index % hosts.length].id : activities[index % activities.length].id,
  title: index % 4 === 0 ? hosts[index % hosts.length].name : activities[index % activities.length].title,
  date: `2026-08-${String(10 + index).padStart(2, "0")}`,
  total: (45 + index * 11) * 150,
  status: index % 5 === 0 ? "Pending" : "Confirmed",
}));

export const conversations: Conversation[] = Array.from({ length: 15 }, (_, index) => ({
  id: `conversation-${index + 1}`,
  kind: (["host", "artisan", "car", "activity"] as const)[index % 4],
  name: index % 2 ? artisans[index % artisans.length].name : hosts[index % hosts.length].name,
  avatar: `https://i.pravatar.cc/120?img=${index + 10}`,
  online: index % 3 !== 0,
  messages: [
    { id: "m1", sender: "them", text: "Ahlan! We’re delighted to help with your stay.", time: "10:24" },
    { id: "m2", sender: "me", text: "Thank you! Could you tell me what the evening usually looks like?", time: "10:27" },
    { id: "m3", sender: "them", text: "We usually share dinner on the terrace. You’re very welcome to join us.", time: "10:31" },
  ],
}));

export const contracts: Contract[] = Array.from({ length: 10 }, (_, index) => ({
  id: `AHL-2026-${String(index + 1).padStart(4, "0")}`,
  traveler: "Maya Laurent",
  host: hosts[index].name,
  services: [hosts[index].name, activities[index].title, index % 2 ? vehicles[index].name : artisans[index].name],
  total: (420 + index * 73) * 150,
  status: (["Signed", "Pending", "Draft"] as const)[index % 3],
  date: `2026-0${(index % 7) + 1}-12`,
}));

export const algerianCities = [
  { name: "Algiers", subtitle: "The Casbah, Rue Sidi Abdellah", image: "/vr-algiers.png", coordinates: [36.7538, 3.0588] as [number, number], provider: "360Cities", viewerUrl: "https://www.360cities.net/embed_iframe/rue-sidi-abdellah-the-casbah-algiers-algeria", sourceUrl: "https://www.360cities.net/image/rue-sidi-abdellah-the-casbah-algiers-algeria" },
  { name: "Constantine", subtitle: "Emir Abdelkader Mosque", image: "/vr-constantine.png", coordinates: [36.365, 6.6147] as [number, number], provider: "360Cities", viewerUrl: "https://www.360cities.net/embed_iframe/prince-abdel-kader-mosque-constantine-algeria", sourceUrl: "https://www.360cities.net/image/prince-abdel-kader-mosque-constantine-algeria" },
  { name: "Tipaza", subtitle: "Roman ruins and thermal baths", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Tipaza.ruines_romaines.jpg", coordinates: [36.5897, 2.4475] as [number, number], provider: "360Cities", viewerUrl: "https://www.360cities.net/embed_iframe/tipaza-roman-ruins-3-of-8-overview-from-thermal-baths", sourceUrl: "https://www.360cities.net/image/tipaza-roman-ruins-3-of-8-overview-from-thermal-baths" },
  { name: "Tamanrasset", subtitle: "Sunset from Assekrem", image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1400&q=85", coordinates: [22.785, 5.5228] as [number, number], provider: "360Cities", viewerUrl: "https://www.360cities.net/embed_iframe/sunset-from-hermitage-of-father-de-foucauld-at-the-assekrem-tamanrasset-algeria", sourceUrl: "https://www.360cities.net/image/sunset-from-hermitage-of-father-de-foucauld-at-the-assekrem-tamanrasset-algeria" },
  { name: "Oran", subtitle: "Palais du Bey", image: "/vr-oran.png", coordinates: [35.6969, -0.6331] as [number, number], provider: "360Cities", viewerUrl: "https://www.360cities.net/embed_iframe/palais-du-bey-oran-algeria", sourceUrl: "https://www.360cities.net/image/palais-du-bey-oran-algeria" },
  { name: "Béjaïa", subtitle: "View from Pic des Singes", image: "/vr-bejaia.png", coordinates: [36.7515, 5.0557] as [number, number], provider: "360Cities", viewerUrl: "https://www.360cities.net/embed_iframe/bejaia-peak-monkeys-summit-algeria", sourceUrl: "https://www.360cities.net/image/bejaia-peak-monkeys-summit-algeria" },
];
