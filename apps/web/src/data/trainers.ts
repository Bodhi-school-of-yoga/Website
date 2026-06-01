export type Trainer = {
  slug: string;
  name: string;
  /** Optional. Omit to render the card as a placeholder (no image), matching Figma. */
  image?: string;
  role?: string;
  years?: number;
  city?: string;
  tier?: "faculty" | "extended";
};

// "Meet All Our Trainers" roster — built from the trainer photos available in
// /public/trainers. Every entry has a real portrait so no card falls back to a
// placeholder. Core Team / leadership members live in data/department-heads.ts
// and are intentionally excluded here to avoid duplication.
export const trainers: Trainer[] = [
  { slug: "anupama-singh", name: "Anupama Singh", image: "/trainers/anupama-singh.webp" },
  { slug: "archana-kulkarni", name: "Archana Kulkarni", image: "/trainers/archana-kulkarni.webp" },
  { slug: "atheesh-kumar", name: "Atheesh Kumar", image: "/trainers/atheesh-kumar.jpg" },
  { slug: "avinash-adapa", name: "Avinash Adapa", image: "/trainers/avinash-adapa.webp" },
  { slug: "bindu-priya", name: "Bindu Priya", image: "/trainers/bindu-priya.jpg" },
  { slug: "dharani", name: "Dharani", image: "/trainers/dharani.jpg" },
  { slug: "leelamber-sastry", name: "Leelamber Sastry", image: "/trainers/leelamber-sastry.webp" },
  { slug: "moumita-mandal", name: "Moumita Mandal", image: "/trainers/moumita-mandal.webp" },
  { slug: "muskan-jain", name: "Muskan Jain", image: "/trainers/muskan-jain.jpg" },
  { slug: "nagalakshmi-shankar", name: "Nagalakshmi Shankar", image: "/trainers/nagalakshmi-shankar.webp" },
  { slug: "naiya-mukati", name: "Naiya Mukati", image: "/trainers/naiya-mukati.webp" },
  { slug: "namratha", name: "Namratha", image: "/trainers/namratha.jpg" },
  { slug: "prajakta-jadhav", name: "Prajakta Jadhav", image: "/trainers/prajakta-jadhav.jpg" },
  { slug: "pratyusha", name: "Pratyusha", image: "/trainers/pratyusha.jpg" },
  { slug: "priyanka-singh", name: "Priyanka Singh", image: "/trainers/priyanka-singh.jpeg" },
  { slug: "rithika-patteti", name: "Rithika Patteti", image: "/trainers/rithika-patteti.webp" },
  { slug: "saloni", name: "Saloni", image: "/trainers/saloni.webp" },
  { slug: "sandhya-ramesh", name: "Sandhya Ramesh", image: "/trainers/sandhya-ramesh.jpg" },
  { slug: "suhasini", name: "Suhasini", image: "/trainers/suhasini.webp" },
  { slug: "vyshnavie-vasasali", name: "Vyshnavie Vasasali", image: "/trainers/vyshnavie-vasasali.jpg" },
];

export const facultyTrainers: Trainer[] = trainers.filter(
  (trainer) => trainer.tier === "faculty",
);
