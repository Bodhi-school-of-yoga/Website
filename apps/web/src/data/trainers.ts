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

// "Meet All Our Trainers" roster — both the Figma frame roster and the existing
// trainer roster are kept here so every portrait shows. Core Team / leadership
// members live in data/department-heads.ts and are excluded to avoid duplication.
export const trainers: Trainer[] = [
  // --- From the "Our Trainers" Figma frame ---
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

  // --- Existing trainer roster (kept alongside the Figma roster) ---
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
