export type DepartmentHead = {
  slug: string;
  name: string;
  role: string;
  /** Optional. Omit to render the card as a placeholder (no image), matching Figma. */
  image?: string;
};

// Core Team — order, names and roles sourced from the "Our Trainers" Figma frame.
// Members without an `image` are shown as placeholder cards (kept in the grid, no photo).
export const departmentHeads: DepartmentHead[] = [
  {
    slug: "prarthana-patel",
    name: "Prarthana Patel",
    role: "head of online certification courses and prenatal",
    image: "/images/trainers/prarthana-patel.png",
  },
  {
    slug: "sujana-shergill",
    name: "Sujana Shergill",
    role: "head of online ytt",
    image: "/images/trainers/sujana-shergill.png",
  },
  {
    slug: "janardhan-durga-prasad",
    name: "Janardhan Durga Prasad",
    role: "head - learning & development",
    image: "/images/trainers/janardhan-durga-prasad.png",
  },
  {
    slug: "lakshmi-yalamudi",
    name: "Lakshmi Yalamudi",
    role: "head - pilates & yoga studio",
    image: "/images/trainers/lakshmi-yalamudi.png",
  },
  {
    slug: "harsh-rungta",
    name: "Harsh Rungta",
    role: "head academics",
    image: "/images/trainers/harsh-rungta.png",
  },
  {
    slug: "khushboo-jain",
    name: "Khushboo Jain",
    role: "online yoga classes",
    image: "/images/trainers/khushboo-jain.png",
  },
  {
    slug: "vijaya-raghavan",
    name: "VijayaRaghavan",
    role: "advance yoga training",
    image: "/images/trainers/vijayaraghavan.png",
  },
  {
    slug: "eena-chawla",
    name: "Eeena Chawla",
    role: "head - face yoga",
    image: "/images/trainers/eeena-chawla.png",
  },
  {
    slug: "sneha-shankar",
    name: "Sneha Shankar",
    role: "children's yoga training",
    image: "/images/trainers/sneha-shankar.png",
  },
  {
    slug: "sujay-choudhary",
    name: "Sujay Choudhary",
    role: "studio training",
    image: "/images/trainers/sujay-choudhary.png",
  },
  {
    slug: "swetha-varda",
    name: "Swetha Varda",
    role: "online training",
    image: "/images/trainers/swetha-varda.png",
  },
  {
    slug: "swetanga-nandan",
    name: "Swetanga Nandan",
    role: "online training",
    image: "/images/trainers/swetanga-nandan.png",
  },
  {
    slug: "swathi-patle",
    name: "Swathi Patle",
    role: "mat pilates training",
    image: "/images/trainers/swathi-patle.png",
  },
];
