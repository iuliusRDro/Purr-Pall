export interface Cat {
  id: string;
  name: string;
  age: number;
  bio: string;
  photoUrl: string;
  tags: string[];
  distance: number; // km away
}

export interface DatabaseCat {
  id: string;
  name: string;
  age: number;
  bio: string;
  photo_url?: string;
  photourl?: string;
  tags?: string[];
  distance?: number;
}

export interface DatabaseMatch {
  id: string;
  cat_id: string;
  user_id: string;
  created_at: string;
  cat: DatabaseCat;
  last_message?: string;
}

export interface Match {
  id: string;
  catId: string;
  userId: string;
  matchedAt: Date;
  cat: Cat; // Embed the cat details for easy access
  lastMessage?: string;
}

export interface Message {
  id: string;
  sender: "user" | "cat";
  text: string;
  timestamp: Date;
}

export const MOCK_CATS: Cat[] = [
  {
    id: "1",
    name: "Mittens",
    age: 2,
    bio: "Professional napper and laser pointer enthusiast. Will judge you silently.",
    photoUrl:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80",
    tags: ["Napper", "Vocal", "Cuddly"],
    distance: 1.2,
  },
  {
    id: "2",
    name: "Whiskers",
    age: 4,
    bio: "I love cardboard boxes more than I love you. Sorry, not sorry.",
    photoUrl:
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800&q=80",
    tags: ["Playful", "Independent", "Box-lover"],
    distance: 3.5,
  },
  {
    id: "3",
    name: "Luna",
    age: 1,
    bio: "Full of energy! I zoomie at 3AM. Looking for a human trampoline.",
    photoUrl:
      "https://images.unsplash.com/photo-1495360019602-e001c276375f?w=800&q=80",
    tags: ["Zoomies", "High Energy", "Kitten"],
    distance: 5.0,
  },
  {
    id: "4",
    name: "Garfield",
    age: 5,
    bio: "Lasagna is life. Mondays are the worst. Do not disturb my slumber.",
    photoUrl:
      "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800&q=80",
    tags: ["Foodie", "Chill", "Orange"],
    distance: 0.8,
  },
  {
    id: "5",
    name: "Salem",
    age: 3,
    bio: "Not a witch, I promise. Just a very cool void staring into your soul.",
    photoUrl:
      "https://images.unsplash.com/photo-1529778873920-4da4926a7071?w=800&q=80",
    tags: ["Void", "Mysterious", "Smart"],
    distance: 2.1,
  },
];
