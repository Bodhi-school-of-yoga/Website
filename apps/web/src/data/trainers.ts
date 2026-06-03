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

// "Meet All Our Trainers" roster — names, order and portraits sourced directly
// from the "Our Trainers" Figma frame. Core Team / leadership members live in
// data/department-heads.ts and are intentionally excluded here to avoid
// duplication.
export const trainers: Trainer[] = [
  { slug: "aman-sahani", name: "Aman Sahani", image: "/trainers/aman-sahani.jpg" },
  { slug: "bhargavi", name: "Bhargavi", image: "/trainers/bhargavi.jpg" },
  { slug: "bhavyasri", name: "Bhavyasri", image: "/trainers/bhavyasri.jpg" },
  { slug: "kavitha-chowdhary", name: "Kavitha Chowdhary", image: "/trainers/kavitha-chowdhary.png" },
  { slug: "dinesh-chouhan", name: "Dinesh Chouhan", image: "/trainers/dinesh-chouhan.jpg" },
  { slug: "eeshwar-motupalli", name: "Eeshwar Motupalli", image: "/trainers/eeshwar-motupalli.jpg" },
  { slug: "gurucharan", name: "Gurucharan", image: "/trainers/gurucharan.jpg" },
  { slug: "jagadeeswari-chadalawada", name: "Jagadeeswari Chadalawada", image: "/trainers/jagadeeswari-chadalawada.jpg" },
  { slug: "jnana-poornima-devi", name: "Jnana Poornima Devi", image: "/trainers/jnana-poornima-devi.jpg" },
  { slug: "padmakar-mokhede", name: "Padmakar Mokhede", image: "/trainers/padmakar-mokhede.png" },
  { slug: "pranathi", name: "Pranathi", image: "/trainers/pranathi.jpg" },
  { slug: "priyanka", name: "Priyanka", image: "/trainers/priyanka.jpg" },
  { slug: "roohi", name: "Roohi", image: "/trainers/roohi.jpg" },
  { slug: "shalini", name: "Shalini", image: "/trainers/shalini.jpg" },
  { slug: "sirisha-bammidi", name: "Sirisha Bammidi", image: "/trainers/sirisha-bammidi.jpg" },
  { slug: "siva-jyothi", name: "Siva Jyothi", image: "/trainers/siva-jyothi.jpg" },
  { slug: "susatyavathidasari", name: "Susatyavathidasari", image: "/trainers/susatyavathidasari.jpg" },
  { slug: "susmita-roy", name: "Susmita Roy", image: "/trainers/susmita-roy.jpg" },
  { slug: "venkat", name: "Venkat", image: "/trainers/venkat.png" },
];

export const facultyTrainers: Trainer[] = trainers.filter(
  (trainer) => trainer.tier === "faculty",
);
