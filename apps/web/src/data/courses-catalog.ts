// Single source of truth for all Bodhi courses surfaced under
// /advanced-certifications/{online,offline}, /teacher-courses/{online,offline},
// and /yoga-courses/{online,offline}. Each entry powers both the listing card
// and the dynamic detail page at /courses/[slug].
//
// Content seeded from https://www.bodhischoolofyoga.com/ (see CLAUDE update
// 2026-05-28). Update this file when CMS-driven course data is wired up.

export type CourseCategory = "advanced" | "teacher" | "yoga";
export type CourseMode = "online" | "studio";

export type CourseMeta = { icon: string; label: string };
export type CourseHighlight = { icon: string; iconSrc?: string; title: string; body: string };
export type CourseCurriculumItem = { title: string; body: string };
export type CourseInstructor = { name: string; role: string; avatar: string };
export type CourseFaq = { question: string; answer: string; defaultOpen?: boolean };

export type Course = {
  slug: string;
  title: string;
  titleLead: string;
  titleAccent: string;
  category: CourseCategory;
  mode: CourseMode;
  shortDescription: string;
  durationLabel: string;
  scheduleLabel: string;
  listingImage: string;
  heroImage: string;
  instructor: { initials: string; name: string };
  overview: string[];
  highlights: CourseHighlight[];
  curriculum: CourseCurriculumItem[];
  prerequisites: string[];
  instructors: CourseInstructor[];
  faqs: CourseFaq[];
};

// Trainer avatars resolved from /public/images/trainers/. Names where a portrait
// is not yet on disk fall back to a generic faculty avatar.
const TRAINER_AVATARS = {
  janardhan: "/images/trainers/janardhan-durga-prasad.png",
  prarthana: "/images/trainers/prarthana-patel.png",
  lakshmi: "/images/trainers/lakshmi-yalamudi.png",
  vijaya: "/images/trainers/vijayaraghavan.png",
  sneha: "/images/trainers/sneha-shankar.png",
  atheesh: "/images/trainers/atheesh-kumar.png",
  prajakta: "/images/trainers/prajakta-jadhav.png",
  harsh: "/images/trainers/harsh-rungta.png",
  eena: "/images/trainers/eeena-chawla.png",
  muskan: "/images/trainers/muskan-jain.png",
  ashok: "/images/trainers/ashok-vankineni.png",
  archana: "/images/trainers/archana-kulkarni.png",
  sujana: "/images/trainers/sujana-shergill.png",
  vyshnavie: "/images/trainers/vyshnavie-vasasali.png",
  swetangana: "/images/trainers/swetangana-nandan.png",
} as const;

// Faculty pool used when the official site lists a name we don't yet have a
// portrait for — keeps cards visually consistent until headshots are uploaded.
const FALLBACK_AVATAR_M = TRAINER_AVATARS.atheesh;
const FALLBACK_AVATAR_F = TRAINER_AVATARS.sneha;

function teacher(name: string, avatar: string, role = "Faculty · Bodhi School of Yoga"): CourseInstructor {
  return { name, role, avatar };
}

// Generic faculty block — used only where the official site does not name
// specific instructors (e.g. M.Sc / Ph.D programme has 9+ faculty).
const DEFAULT_INSTRUCTORS: CourseInstructor[] = [
  teacher("Janardhan Durga Prasad", TRAINER_AVATARS.janardhan, "Lead Faculty · Bodhi School of Yoga"),
  teacher("Prarthana Patel", TRAINER_AVATARS.prarthana, "Senior Teacher · Bodhi School of Yoga"),
  teacher("Lakshmi Yalamudi", TRAINER_AVATARS.lakshmi, "Senior Teacher · Bodhi School of Yoga"),
  teacher("Vijaya Raghavan", TRAINER_AVATARS.vijaya, "Senior Teacher · Bodhi School of Yoga"),
];

const SHARED_FAQS: CourseFaq[] = [
  {
    question: "Is this course Yoga Alliance accredited?",
    answer:
      "Bodhi School of Yoga is a Yoga Alliance Registered School (RYS-200, RYS-300, RPYT, RCYT). Hours from this course count toward your Yoga Alliance continuing education credits.",
  },
  {
    question: "What if I miss a live session?",
    answer:
      "Every live session is recorded and uploaded to your student dashboard within 24 hours. You can revisit lessons as many times as you want during the course window.",
  },
  {
    question: "Do I get a certificate after completion?",
    answer:
      "Yes — on successful completion of attendance and final assessments you receive a Bodhi School of Yoga certificate that you can share on LinkedIn and use professionally.",
  },
];

// Weekday-only schedule label per user requirement "no weekend classes".
const WEEKDAY_SCHEDULE = "Mon – Fri";

// ---------------------------------------------------------------------------
// Catalog
// ---------------------------------------------------------------------------

export const COURSES: Course[] = [
  // ===========================================================
  // ADVANCED TEACHER COURSES — ONLINE
  // ===========================================================
  {
    slug: "300-hour-ytt-online",
    title: "300-Hour Yoga Teacher Training Course",
    titleLead: "300-Hour Yoga",
    titleAccent: "Teacher Training",
    category: "advanced",
    mode: "online",
    shortDescription:
      "Deepen your practice and earn your RYT-300 with Bodhi's flagship online advanced teacher training.",
    durationLabel: "12 weeks · 2 hrs/session · Mon – Fri",
    scheduleLabel: WEEKDAY_SCHEDULE,
    listingImage: "/images/programs/300-hour-yoga-teacher-training-online.jpg",
    heroImage: "/images/programs/300-hour-yoga-teacher-training-online.jpg",
    instructor: { initials: "VR", name: "Vijayraghavan" },
    overview: [
      "The online 300-Hour YTT improves a trainer's comprehension of core yoga principles and teachings covered in the RYT 200 worldwide yoga certification programme.",
      "Our advanced curriculum equips you with more sophisticated yoga techniques in line with current trends — sequencing, hands-on adjustments, alignment, biomechanics, and the four streams of Yoga (Raja, Karma, Bhakti, Jnana).",
      "On completion you are certified as a Yoga Alliance RYT 300 international yoga trainer, ready to launch a successful career and join an advanced teacher community.",
    ],
    highlights: [
      { icon: "yoga", iconSrc: "/icon/course1.svg", title: "Advanced Techniques & Philosophy", body: "Four streams of Yoga (Raja, Karma, Bhakti, Jnana) plus 70+ advanced asanas." },
      { icon: "leaf", iconSrc: "/icon/course4.svg", title: "Classical Texts", body: "Vedas, Upanishads, Patanjali's Yoga Sutras, Bhagavad Gita." },
      { icon: "align-center", iconSrc: "/icon/course5.svg", title: "Sequencing & Adjustments", body: "Alignment, biomechanics, and safe hands-on adjustments." },
      { icon: "strength", iconSrc: "/icon/course6.svg", title: "Advanced Pranayama & Kriya", body: "Pranayama, mudras, bandhas, kriya yoga and shat kriyas." },
      { icon: "rocket", iconSrc: "/icon/course7.svg", title: "Flexible Online Format", body: "12-week schedule, weekday evenings, recordings included." },
      { icon: "people", iconSrc: "/icon/course8.svg", title: "RYT 300 Community", body: "Global cohort of advanced teachers." },
    ],
    curriculum: [
      { title: "Four Streams of Yoga", body: "Raja, Karma, Bhakti, and Jnana yoga in depth." },
      { title: "70+ Advanced Asanas", body: "Inversions, arm balances, deep backbends with safe progressions." },
      { title: "Vedas & Upanishads", body: "Survey of classical texts and the philosophy of yoga." },
      { title: "Advanced Pranayama", body: "Kapalabhati, Bhastrika, Nadi Shodhana, Kumbhaka, and shat kriyas." },
      { title: "Mudras, Bandhas & Kriya Yoga", body: "Energetic locks, gestures, and cleansing practices." },
      { title: "Biomechanics & Teaching Methodology", body: "Functional anatomy, sequencing, cueing, hands-on adjustments." },
    ],
    prerequisites: [
      "Completed a Yoga Alliance certified RYT 200.",
      "Age 18 – 55.",
      "A device with reliable internet, yoga mat, and a quiet space to practise.",
    ],
    instructors: [
      teacher("Vijayraghavan", TRAINER_AVATARS.vijaya, "Lead Faculty · RYT 500"),
      teacher("Priyanka Singh", FALLBACK_AVATAR_F, "Senior Teacher · Bodhi School of Yoga"),
    ],
    faqs: [
      {
        question: "Do I need a 200-hour certificate to enrol?",
        answer:
          "Yes — the 300-Hour YTT is built for graduates of a Yoga Alliance certified 200-hour course. Share your certificate at the time of enrolment.",
        defaultOpen: true,
      },
      ...SHARED_FAQS,
    ],
  },
  {
    slug: "prenatal-ytt",
    title: "Pre-Natal Yoga Teacher Training Course",
    titleLead: "Pre-Natal Yoga",
    titleAccent: "Teacher Training",
    category: "advanced",
    mode: "online",
    shortDescription:
      "Yoga Alliance accredited RPYT — become an internationally certified Prenatal Yoga Instructor in 4 weeks.",
    durationLabel: "4 weeks · 2 hrs/session · Mon – Thu",
    scheduleLabel: "Mon – Thu",
    listingImage: "/images/programs/face-yoga-teacher-training.jpg",
    heroImage: "/images/programs/face-yoga-teacher-training.jpg",
    instructor: { initials: "PP", name: "Prarthana Patel" },
    overview: [
      "Yoga Alliance accredited Pre-Natal Yoga Teacher Training that certifies you as an internationally recognised RPYT in one month.",
      "Covers the full journey — from preconception through each trimester to post-natal recovery and Mom & Baby yoga — with senior faculty including doctors and lactation specialists.",
      "Graduates can register as RPYT with Yoga Alliance and start safe, evidence-informed pre-natal yoga classes.",
    ],
    highlights: [
      { icon: "yoga", iconSrc: "/icon/course1.svg", title: "Trimester-Specific Asana", body: "Safe modifications for first, second, and third trimesters." },
      { icon: "leaf", iconSrc: "/icon/course4.svg", title: "Preconception to Postnatal", body: "Whole-journey curriculum including Mom & Baby yoga." },
      { icon: "align-center", iconSrc: "/icon/course5.svg", title: "Acupressure & Energy", body: "Acupressure points, mudras, and energetic practices for pregnancy." },
      { icon: "smile", iconSrc: "/icon/course6.svg", title: "Handling Complications", body: "Hormonal shifts, thyroid, diabetes, depression — safe modifications." },
      { icon: "rocket", iconSrc: "/icon/course7.svg", title: "Yoga Alliance RPYT", body: "Curriculum aligned with Registered Prenatal Yoga Teacher standards." },
      { icon: "people", iconSrc: "/icon/course8.svg", title: "Expert Panel", body: "Faculty includes prenatal yoga teachers, doctors, and birth specialists." },
    ],
    curriculum: [
      { title: "Importance of Pre-Natal Yoga", body: "Why yoga matters across the maternal journey." },
      { title: "Preconception Module", body: "Diet, asana, pranayama, meditation, and mudras for conception." },
      { title: "Trimester-Specific Practice", body: "Care, common symptoms, safe poses, pranayama, acupressure for each trimester." },
      { title: "Post-Natal Recovery", body: "Breastfeeding support, mood, nutrition, rebuilding core and pelvic floor." },
      { title: "Mom & Baby Yoga", body: "Bonding sequences and gentle practices for the fourth trimester." },
      { title: "Anatomy, Nutrition & Affirmations", body: "Reproductive anatomy, prenatal nutrition, and supportive affirmations." },
    ],
    prerequisites: [
      "Completed an RYT 200 (or equivalent yoga foundation).",
      "Device with reliable internet, yoga mat, and a quiet space.",
      "Notebook for theory sessions.",
    ],
    instructors: [
      teacher("Bindu Priya", FALLBACK_AVATAR_F, "Lead Faculty · RPYT"),
      teacher("Prarthana Patel", TRAINER_AVATARS.prarthana, "Senior Teacher · Bodhi School of Yoga"),
      teacher("Dr. Naiya Mukati", FALLBACK_AVATAR_F, "Medical Advisor · OB-GYN"),
    ],
    faqs: SHARED_FAQS,
  },
  {
    slug: "bala-ytt",
    title: "Children's (Bala) Yoga Teacher Training Course",
    titleLead: "Bala Yoga",
    titleAccent: "Teacher Training",
    category: "advanced",
    mode: "online",
    shortDescription:
      "Yoga Alliance RCYT certification — engage children with 36 age-appropriate poses, brain games, and storytelling.",
    durationLabel: "8 weeks · 2.5 hrs/session",
    scheduleLabel: WEEKDAY_SCHEDULE,
    listingImage: "/images/programs/bala-yoga-teacher-training.jpg",
    heroImage: "/images/programs/bala-yoga-teacher-training.jpg",
    instructor: { initials: "JD", name: "Janardhan Durga Prasad" },
    overview: [
      "Bala Yoga Teacher Training equips you with engaging instruction to teach yoga at home, in studios, and in schools — through mindfulness, creativity, and play.",
      "Covers physical aspects of growing bodies, chakras and koshas for kids, ethics, and how to manage common health issues with care.",
      "Graduates qualify as RCYT (Registered Children's Yoga Teacher) with Yoga Alliance.",
    ],
    highlights: [
      { icon: "yoga", iconSrc: "/icon/course1.svg", title: "36 Yoga Poses", body: "Age-appropriate asana set designed for children." },
      { icon: "smile", iconSrc: "/icon/course4.svg", title: "Brain Games & Stories", body: "Story-based teaching and brain games that hold attention." },
      { icon: "leaf", iconSrc: "/icon/course5.svg", title: "Chakras & Koshas", body: "Energy-body and subtle-body theory adapted for kids." },
      { icon: "align-center", iconSrc: "/icon/course6.svg", title: "Mindfulness for Kids", body: "Pranayama, mudras, trataka kriya, and yoga nidra." },
      { icon: "people", iconSrc: "/icon/course7.svg", title: "Sequencing Across Age Groups", body: "Different sequences for different developmental stages." },
      { icon: "rocket", iconSrc: "/icon/course8.svg", title: "Yoga Alliance RCYT", body: "Registered Children's Yoga Teacher pathway." },
    ],
    curriculum: [
      { title: "Theory — Growth & Ethics", body: "Physical aspects, breathing, child growth stages, teen health, ethics." },
      { title: "Chakras, Koshas & Health", body: "Energy body, koshas, and managing common health issues in kids." },
      { title: "Practical — 36 Yoga Poses", body: "Curated age-appropriate asana set." },
      { title: "Pranayama, Mudras & Meditation", body: "Simple breathing, hand-gestures, and concentration practices." },
      { title: "Trataka Kriya & Yoga Nidra", body: "Focused-gazing kriya and guided rest for children." },
      { title: "Brain Games, Storytelling & Sequencing", body: "Class design, sequencing, and creative play tools." },
    ],
    prerequisites: [
      "Completed a Level 1 YTT (or equivalent yoga foundation).",
      "Passion for working with children.",
      "Device, yoga mat, and a quiet space.",
    ],
    instructors: [
      teacher("Janardhan Durga Prasad", TRAINER_AVATARS.janardhan, "Lead Faculty · RCYT"),
      teacher("Sneha Shankar", TRAINER_AVATARS.sneha, "Children's Yoga Specialist"),
    ],
    faqs: SHARED_FAQS,
  },
  {
    slug: "msc-yoga-science",
    title: "M.Sc in Yoga Science",
    titleLead: "M.Sc in",
    titleAccent: "Yoga Science",
    category: "advanced",
    mode: "online",
    shortDescription:
      "Postgraduate Master's in Yoga Science — first phase of Bodhi's integrated MSc + PhD programme with Jyotish Yoga Sastra University, Florida.",
    durationLabel: "4 semesters",
    scheduleLabel: WEEKDAY_SCHEDULE,
    listingImage: "/images/programs/pranayama-nervous-system.jpg",
    heroImage: "/images/programs/pranayama-nervous-system.jpg",
    instructor: { initials: "PP", name: "Prarthana Patel" },
    overview: [
      "Bodhi's M.Sc in Yoga Science is the first phase of an integrated MSc + PhD programme awarded by Jyotish Yoga Sastra University, Florida.",
      "Curriculum covers fundamental texts, energy anatomy, pranayama, Patanjali's Sutras, yoga therapy, Ayurveda, yoga psychology, and research methodology.",
      "Designed for practitioners who want to advance yoga as a recognised academic discipline and pursue careers in yoga therapy, research, or higher education.",
    ],
    highlights: [
      { icon: "leaf", iconSrc: "/icon/course1.svg", title: "Classical & Modern", body: "Fundamental texts, Patanjali Sutras, Vedanta, and integrative yoga therapy." },
      { icon: "align-center", iconSrc: "/icon/course4.svg", title: "Energy Anatomy & Therapy", body: "Subtle anatomy, mudra therapy, and yoga psychology." },
      { icon: "yoga", iconSrc: "/icon/course5.svg", title: "Ayurveda & Naturopathy", body: "Traditional Indian medicine and yogic wellness science." },
      { icon: "technology", iconSrc: "/icon/course6.svg", title: "Research Methodology", body: "Study design, statistics, and academic writing." },
      { icon: "rocket", iconSrc: "/icon/course7.svg", title: "Jyotish Yoga Sastra University", body: "Degree partner: Jyotish Yoga Sastra University, Florida." },
      { icon: "people", iconSrc: "/icon/course8.svg", title: "9-Member Faculty", body: "Senior teachers, therapists, and yoga researchers." },
    ],
    curriculum: [
      { title: "Fundamental Texts & Patanjali Sutras", body: "Survey of foundational yoga literature." },
      { title: "Anatomy & Energy Anatomy", body: "Gross and subtle anatomy for yoga professionals." },
      { title: "Pranayama, Mudras & Yoga Nidra", body: "Advanced breath work and concentration practices." },
      { title: "Yoga Therapy & Mudra Therapy", body: "Therapeutic applications for chronic conditions." },
      { title: "Ayurveda & Traditional Medicine", body: "Constitutional health and yogic diet." },
      { title: "Research Methodology & Yoga Psychology", body: "Academic research, Vedanta, and applied psychology." },
    ],
    prerequisites: [
      "Bachelor's degree (Yoga, Physical Education, or related field preferred).",
      "Demonstrated English proficiency.",
      "Commitment to a multi-semester academic programme with weekly live sessions.",
    ],
    instructors: [
      teacher("Prarthana Patel", TRAINER_AVATARS.prarthana, "Programme Co-ordinator"),
      teacher("Sujana Shergill", TRAINER_AVATARS.sujana, "Senior Faculty"),
      teacher("Janardhan Durga Prasad", TRAINER_AVATARS.janardhan, "Senior Faculty"),
      teacher("Vyshnavie Vasasali", TRAINER_AVATARS.vyshnavie, "Senior Faculty"),
      teacher("Archana Kulkarni", TRAINER_AVATARS.archana, "Senior Faculty"),
    ],
    faqs: [
      {
        question: "Who awards the degree?",
        answer:
          "The M.Sc is awarded by Jyotish Yoga Sastra University, Florida — the academic partner of Bodhi School of Yoga's integrated MSc + PhD programme.",
        defaultOpen: true,
      },
      ...SHARED_FAQS,
    ],
  },
  {
    slug: "phd-yoga-science",
    title: "Ph.D in Yoga Science",
    titleLead: "Ph.D in",
    titleAccent: "Yoga Science",
    category: "advanced",
    mode: "online",
    shortDescription:
      "Doctoral research phase of Bodhi's integrated MSc + PhD programme — awarded by Jyotish Yoga Sastra University, Florida.",
    durationLabel: "Research phase (post-MSc)",
    scheduleLabel: WEEKDAY_SCHEDULE,
    listingImage: "/images/programs/ttc-300.jpg",
    heroImage: "/images/programs/ttc-300.jpg",
    instructor: { initials: "JD", name: "Janardhan Durga Prasad" },
    overview: [
      "The Ph.D programme is the doctoral phase of Bodhi's integrated MSc + PhD with Jyotish Yoga Sastra University, Florida.",
      "Candidates work with senior faculty on original research across yoga philosophy, yoga therapy, education, or applied science.",
      "Programme follows standard doctoral requirements — proposal defence, fieldwork, thesis, and final viva.",
    ],
    highlights: [
      { icon: "technology", iconSrc: "/icon/course1.svg", title: "Original Research", body: "Choose your own research question under faculty supervision." },
      { icon: "leaf", iconSrc: "/icon/course4.svg", title: "Classical & Modern Lens", body: "Bridge traditional yoga wisdom with contemporary science." },
      { icon: "align-center", iconSrc: "/icon/course5.svg", title: "Publish & Present", body: "Support to publish in peer-reviewed journals and present at conferences." },
      { icon: "people", iconSrc: "/icon/course6.svg", title: "Senior Faculty Mentorship", body: "1:1 guidance from experienced yoga researchers." },
      { icon: "yoga", iconSrc: "/icon/course7.svg", title: "Applied Practice", body: "Integrate teaching, therapy, or fieldwork into your research." },
      { icon: "rocket", iconSrc: "/icon/course8.svg", title: "Jyotish Yoga Sastra University", body: "Doctorate awarded by Jyotish Yoga Sastra University, Florida." },
    ],
    curriculum: [
      { title: "Coursework Phase", body: "Research methodology, advanced philosophy, statistics." },
      { title: "Proposal Defence", body: "Develop and defend your research proposal with supervisory committee." },
      { title: "Fieldwork / Data Collection", body: "Conduct primary research with mentor oversight." },
      { title: "Thesis Writing", body: "Systematic writing support and milestone reviews." },
      { title: "Publication", body: "Co-author with faculty in indexed journals." },
      { title: "Final Viva", body: "Defend your thesis before the academic panel." },
    ],
    prerequisites: [
      "Master's degree in Yoga Science (Bodhi's MSc or equivalent).",
      "English proficiency and a clear research interest.",
      "Commitment to a multi-year original research project.",
    ],
    instructors: [
      teacher("Janardhan Durga Prasad", TRAINER_AVATARS.janardhan, "Doctoral Supervisor"),
      teacher("Sujana Shergill", TRAINER_AVATARS.sujana, "Doctoral Supervisor"),
      teacher("Vyshnavie Vasasali", TRAINER_AVATARS.vyshnavie, "Senior Faculty"),
      teacher("Archana Kulkarni", TRAINER_AVATARS.archana, "Senior Faculty"),
    ],
    faqs: SHARED_FAQS,
  },

  // ===========================================================
  // ADVANCED TEACHER COURSES — STUDIO
  // ===========================================================
  {
    slug: "300-hour-ytt-studio",
    title: "300-Hour Yoga Teacher Training Course",
    titleLead: "300-Hour Yoga",
    titleAccent: "Teacher Training",
    category: "advanced",
    mode: "studio",
    shortDescription:
      "Studio RYT 300 — meticulously crafted advanced teacher training over 12 weeks of immersive practice at a Bodhi centre.",
    durationLabel: "12 weeks · 5 hrs/day · 90 days total",
    scheduleLabel: WEEKDAY_SCHEDULE,
    listingImage: "/images/programs/ttc-300.jpg",
    heroImage: "/images/programs/ttc-300.jpg",
    instructor: { initials: "LS", name: "Leelamber Sastry" },
    overview: [
      "In-studio advanced yoga teacher training (RYT 300) at a Bodhi centre — meticulously crafted to deepen your understanding of advanced asana, philosophy, and teaching.",
      "12 weeks (90 days total) of immersive 5-hour daily practice — covering 70+ advanced asanas, the four streams of yoga, and classical texts including the Vedas and Upanishads.",
      "Graduates are eligible for Yoga Alliance RYT 500 designation and join Bodhi's advanced teacher community.",
    ],
    highlights: [
      { icon: "yoga", iconSrc: "/icon/course1.svg", title: "70+ Advanced Asanas", body: "Inversions, arm balances, and deep backbends with safe progressions." },
      { icon: "align-center", iconSrc: "/icon/course4.svg", title: "Meditation & Breathwork", body: "Advanced pranayama, mudras, bandhas, and meditation." },
      { icon: "leaf", iconSrc: "/icon/course5.svg", title: "Vedas & Upanishads", body: "All four Vedas and the major Upanishads studied in depth." },
      { icon: "strength", iconSrc: "/icon/course6.svg", title: "Biomechanics & Anatomy", body: "Functional anatomy and Kriya Yoga." },
      { icon: "rocket", iconSrc: "/icon/course7.svg", title: "Therapeutic Applications", body: "Apply yoga to common conditions and student needs." },
      { icon: "people", iconSrc: "/icon/course8.svg", title: "RYT 500 Designation", body: "Eligible for Yoga Alliance RYT 500." },
    ],
    curriculum: [
      { title: "Four Streams of Yoga", body: "Raja, Karma, Bhakti, and Jnana yoga in depth." },
      { title: "70+ Advanced Asanas", body: "Full advanced asana catalogue with sequencing." },
      { title: "Meditation, Mantras, Mudras & Bandhas", body: "Energetic practices and concentration techniques." },
      { title: "Vedas & Upanishads", body: "All four Vedas and major Upanishads." },
      { title: "Advanced Pranayama & Kriya Yoga", body: "Breath work and cleansing practices." },
      { title: "Biomechanics & Teaching Methodology", body: "Anatomy applied to advanced teaching." },
    ],
    prerequisites: [
      "Certified RYT 200 instructors — or committed practitioners eager to deepen.",
      "Able to attend full-day weekday sessions at the studio.",
      "Open to immersive 12-week residential-style training.",
    ],
    instructors: [
      teacher("Leelamber Sastry", FALLBACK_AVATAR_M, "Lead Faculty · RYT 500"),
    ],
    faqs: SHARED_FAQS,
  },

  // ===========================================================
  // TEACHER COURSES — ONLINE
  // ===========================================================
  {
    slug: "200-hour-ytt-online",
    title: "200-Hour Yoga Teacher Training Course",
    titleLead: "200-Hour Yoga",
    titleAccent: "Teacher Training",
    category: "teacher",
    mode: "online",
    shortDescription:
      "Foundation Yoga Alliance RYT 200 — an immersive online journey blending tradition, modern teaching, and senior faculty expertise.",
    durationLabel: "8 weeks",
    scheduleLabel: WEEKDAY_SCHEDULE,
    listingImage: "/images/programs/pranayama-nervous-system.jpg",
    heroImage: "/images/programs/pranayama-nervous-system.jpg",
    instructor: { initials: "JD", name: "Janardhan Durga Prasad" },
    overview: [
      "Bodhi's online 200-Hour YTT is an immersive journey blending tradition, modernity, and expert instruction — anchored in the eight-limbed path of Hatha-Raja Yoga.",
      "Covers Ashtanga theory, full anatomy, pranayama, mudras, energy anatomy, Patanjali Sutras, Pancha Koshas, yogic diet, bandhas, shat kriyas, and 100+ asanas including Surya Namaskara variations and Ashtanga Viniyasa.",
      "Add-on modules in Prenatal, Yoga Therapy, and MAT Pilates round out the foundation. Graduates qualify as Yoga Alliance RYT 200.",
    ],
    highlights: [
      { icon: "yoga", iconSrc: "/icon/course1.svg", title: "100+ Asanas", body: "Surya Namaskara variations and Ashtanga Viniyasa A/B." },
      { icon: "leaf", iconSrc: "/icon/course4.svg", title: "Pranayama & Mudras", body: "10 pranayama, mudras, bandhas, and shat kriyas." },
      { icon: "align-center", iconSrc: "/icon/course5.svg", title: "Anatomy & Energy Anatomy", body: "12 body systems plus Pancha Koshas." },
      { icon: "people", iconSrc: "/icon/course6.svg", title: "Live Cohort", body: "Small batches with peer practicum and feedback." },
      { icon: "rocket", iconSrc: "/icon/course7.svg", title: "RYT 200 Pathway", body: "Yoga Alliance registered curriculum and certification." },
      { icon: "smile", iconSrc: "/icon/course8.svg", title: "Add-On Modules", body: "Prenatal, Yoga Therapy, and MAT Pilates introductions." },
    ],
    curriculum: [
      { title: "Theory — Ashtanga, Sutras & Koshas", body: "Eight limbs, Patanjali Sutras, Pancha Koshas, yogic diet, ethics." },
      { title: "Anatomy & Energy Anatomy", body: "12 body systems plus chakras and subtle anatomy." },
      { title: "Pranayama, Mudras, Bandhas & Shat Kriyas", body: "10 pranayama techniques and cleansing practices." },
      { title: "Practical — 100+ Asanas", body: "Surya Namaskara variations, Ashtanga Viniyasa, full asana set." },
      { title: "Meditation Practices", body: "6 meditation techniques and guided relaxation." },
      { title: "Add-On Modules", body: "Introductions to Prenatal Yoga, Yoga Therapy, and MAT Pilates." },
    ],
    prerequisites: [
      "Age 18 – 55.",
      "Device with reliable internet, yoga mat, and notebook.",
      "Quiet space to practise daily.",
    ],
    instructors: [
      teacher("Janardhan Durga Prasad", TRAINER_AVATARS.janardhan, "Lead Faculty · RYT 500"),
      teacher("Lakshmi Yalamudi", TRAINER_AVATARS.lakshmi, "Senior Teacher"),
      teacher("Eena Chawla", TRAINER_AVATARS.eena, "Senior Teacher"),
      teacher("Archana Kulkarni", TRAINER_AVATARS.archana, "Senior Teacher"),
      teacher("Nagalakshmi Shankar", FALLBACK_AVATAR_F, "Senior Teacher"),
      teacher("Choudhary Sujay Kumar Roy", FALLBACK_AVATAR_M, "Senior Teacher"),
      teacher("Anupama Singh", FALLBACK_AVATAR_F, "Senior Teacher"),
    ],
    faqs: SHARED_FAQS,
  },
  {
    slug: "face-yoga-ttc",
    title: "Face Yoga Teacher Training Course",
    titleLead: "Face Yoga",
    titleAccent: "Teacher Training",
    category: "teacher",
    mode: "online",
    shortDescription:
      "Holistic mastery of face yoga — tone, tighten, and rejuvenate naturally through facial exercises, acupressure, and skin detox.",
    durationLabel: "4 weeks · 1.5 hrs/session · Mon – Thu",
    scheduleLabel: "Mon – Thu",
    listingImage: "/images/programs/face-yoga-teacher-training.jpg",
    heroImage: "/images/programs/face-yoga-teacher-training.jpg",
    instructor: { initials: "EC", name: "Eena Chawla" },
    overview: [
      "Holistic mastery of face yoga — tone, tighten, and rejuvenate naturally through targeted facial exercises and supporting practices.",
      "Covers face anatomy, acupressure and face mapping, lymphatic system, facial tools, nutrition for skin, face yoga nidra, mudras, and skin detox.",
      "Graduates can teach private clients, group classes, and integrate face yoga into existing yoga or wellness practice.",
    ],
    highlights: [
      { icon: "yoga", iconSrc: "/icon/course1.svg", title: "Toning & Anti-Ageing", body: "Lift, firm, and tone without injections or surgery." },
      { icon: "leaf", iconSrc: "/icon/course4.svg", title: "Lymphatic Drainage", body: "Face mapping plus drainage routines that reduce puffiness." },
      { icon: "smile", iconSrc: "/icon/course5.svg", title: "Acupressure", body: "Energy points and face mapping practices." },
      { icon: "align-center", iconSrc: "/icon/course6.svg", title: "Facial Tools", body: "Gua sha, face-rollers, and self-massage protocols." },
      { icon: "people", iconSrc: "/icon/course7.svg", title: "Skin Detox & Nutrition", body: "Skin nutrition and yogic detox practices." },
      { icon: "rocket", iconSrc: "/icon/course8.svg", title: "Niche Certification", body: "Stand out in the wellness market with a rare skill set." },
    ],
    curriculum: [
      { title: "What, Why & Benefits", body: "Purpose and benefits of face yoga." },
      { title: "Face Anatomy & Mapping", body: "Muscles, skin layers, acupressure points, lymphatic system." },
      { title: "Exercises by Area", body: "Forehead, eyes, cheeks, mouth, jaws, and neck." },
      { title: "Face Yoga Nidra & Mudras", body: "Relaxation and energetic gestures for the face." },
      { title: "Tools, Nutrition & Skin Detox", body: "Facial tools, nutrition for skin, and yogic detox." },
      { title: "Teaching Methodology", body: "Demonstrate, cue, and adjust for online or 1:1 sessions." },
    ],
    prerequisites: [
      "Anyone interested in skincare, anti-ageing, or wellness.",
      "Welcomes fitness and wellness professionals.",
      "Device, yoga mat, and notebook.",
    ],
    instructors: [
      teacher("Eena Chawla", TRAINER_AVATARS.eena, "Lead Faculty · Face Yoga"),
      teacher("Khushbu Jain", FALLBACK_AVATAR_F, "Senior Teacher"),
    ],
    faqs: SHARED_FAQS,
  },
  {
    slug: "mat-pilates-certification",
    title: "MAT Pilates Certification Course",
    titleLead: "MAT Pilates",
    titleAccent: "Certification",
    category: "teacher",
    mode: "online",
    shortDescription:
      "Online MAT Pilates Instructor Certification — six foundational principles, classical-to-contemporary repertoire, functional core and breathing.",
    durationLabel: "4 weeks · 2 hrs/session · Mon – Thu",
    scheduleLabel: "Mon – Thu",
    listingImage: "/images/programs/mat-pilates-teacher-training.jpg",
    heroImage: "/images/programs/mat-pilates-teacher-training.jpg",
    instructor: { initials: "LY", name: "Lakshmi Yalamudi" },
    overview: [
      "Certification programme grounded in the six foundational principles of Pilates — combining classical and contemporary mat work with functional core and breathing.",
      "Covers Pilates vs yoga, history and types (classical, MAT, reformer, contemporary), yoga-Pilates integration, plus Pilates and spine anatomy.",
      "Includes modifications for common injuries and progressions from beginner to advanced.",
    ],
    highlights: [
      { icon: "strength", iconSrc: "/icon/course1.svg", title: "Six Foundational Principles", body: "Concentration, control, centring, flow, precision, breathing." },
      { icon: "align-center", iconSrc: "/icon/course4.svg", title: "Functional Core & Breathing", body: "True deep-core engagement and lateral thoracic breathing." },
      { icon: "yoga", iconSrc: "/icon/course5.svg", title: "Yoga-Pilates Integration", body: "Hybrid class templates that blend both traditions." },
      { icon: "leaf", iconSrc: "/icon/course6.svg", title: "Modifications for Injuries", body: "Safe progressions and adaptations for common conditions." },
      { icon: "people", iconSrc: "/icon/course7.svg", title: "Beginner → Advanced", body: "Progress students from foundations through advanced repertoire." },
      { icon: "rocket", iconSrc: "/icon/course8.svg", title: "Globally Recognised", body: "Certification accepted by studios and gym chains." },
    ],
    curriculum: [
      { title: "Foundations", body: "Pilates vs yoga, history, types (classical, MAT, reformer, contemporary), yoga-Pilates integration, six principles." },
      { title: "Functional Core & Breathing", body: "Breathing patterns, respiratory mechanics, and core engagement." },
      { title: "Pilates & Spine Anatomy", body: "Functional anatomy applied to Pilates cueing." },
      { title: "Body Alignment & Modifications", body: "Alignment principles and modifications for common injuries." },
      { title: "Class Design", body: "30/45/60-minute templates for beginner to advanced groups." },
      { title: "Teaching Methodology", body: "Cueing, sequencing, and demonstration for online or studio." },
    ],
    prerequisites: [
      "Completed RYT 200 (from any institute).",
      "Age 18 – 45.",
      "Device with reliable internet, yoga/Pilates mat.",
    ],
    instructors: [
      teacher("Lakshmi Yalamudi", TRAINER_AVATARS.lakshmi, "Lead Faculty · MAT Pilates"),
      teacher("Swathi Patle", FALLBACK_AVATAR_F, "Senior Teacher"),
      teacher("Muskan Jain", TRAINER_AVATARS.muskan, "Senior Teacher"),
    ],
    faqs: SHARED_FAQS,
  },
  {
    slug: "weight-loss-coach-certification",
    title: "Weight Loss Coach Certification Course",
    titleLead: "Weight Loss",
    titleAccent: "Coach Certification",
    category: "teacher",
    mode: "online",
    shortDescription:
      "Holistic yogic-grounded weight-loss coaching — asana sequences, Shakthi Bandhana series, Pilates, yogic diet, naturopathy, and coaching skills.",
    durationLabel: "4 weeks · 2 hrs/day · 30 days",
    scheduleLabel: WEEKDAY_SCHEDULE,
    listingImage: "/images/programs/weight-loss-coach-teacher-training.jpg",
    heroImage: "/images/programs/weight-loss-coach-teacher-training.jpg",
    instructor: { initials: "JD", name: "Janardhan Durga Prasad" },
    overview: [
      "Holistic, yogic-grounded coaching certification — Asana Sequences, Shakthi Bandhana series, Pilates Sequences, and Sun Salutations adapted for weight loss.",
      "Theory covers yogic diet, meal plans, diet types, yogic detox, naturopathy, the role of water, mantras and mudras, yogic relaxation, and the causes of obesity.",
      "Includes coaching skills and business models so graduates can offer 1:1 coaching or group programmes.",
    ],
    highlights: [
      { icon: "strength", iconSrc: "/icon/course1.svg", title: "Targeted Workouts", body: "Asana sequences, Shakthi Bandhana, Pilates, Sun Salutations." },
      { icon: "leaf", iconSrc: "/icon/course4.svg", title: "Yogic Diet & Naturopathy", body: "Yogic diet, meal plans, detox, naturopathy, water." },
      { icon: "smile", iconSrc: "/icon/course5.svg", title: "Mantras & Mudras", body: "Energetic and meditative tools for the journey." },
      { icon: "yoga", iconSrc: "/icon/course6.svg", title: "Personalised Plans", body: "Tailor workouts and nutrition to each client." },
      { icon: "people", iconSrc: "/icon/course7.svg", title: "Coaching Skills", body: "Intake, goal-setting, weekly check-ins, accountability." },
      { icon: "rocket", iconSrc: "/icon/course8.svg", title: "Business Toolkit", body: "Pricing, packages, and business models for online coaches." },
    ],
    curriculum: [
      { title: "Workouts — Asana & Pilates", body: "Asana sequences, Shakthi Bandhana series, Pilates, Sun Salutations, ailment variations." },
      { title: "Yogic Diet & Meal Plans", body: "Yogic diet, diet types, meal planning, role of water." },
      { title: "Yogic Detox & Naturopathy", body: "Cleansing practices and naturopathic principles." },
      { title: "Mantras, Mudras & Relaxation", body: "Energetic, meditative, and yogic relaxation tools." },
      { title: "Causes of Obesity & Mindset", body: "Root causes and coaching mindset to support change." },
      { title: "Coaching & Business Models", body: "Intake, accountability, pricing, packages, marketing." },
    ],
    prerequisites: [
      "Completed RYT 200 (Bodhi or accredited).",
      "Age 18 – 55.",
      "Device with reliable internet and yoga mat.",
    ],
    instructors: [
      teacher("Janardhan Durga Prasad", TRAINER_AVATARS.janardhan, "Lead Faculty · Weight Loss Coach"),
      teacher("Pratyusha", FALLBACK_AVATAR_F, "Senior Teacher"),
    ],
    faqs: SHARED_FAQS,
  },

  // ===========================================================
  // TEACHER COURSES — STUDIO
  // ===========================================================
  {
    slug: "200-hour-ytt-studio",
    title: "200-Hour Yoga Teacher Training Course",
    titleLead: "200-Hour Yoga",
    titleAccent: "Teacher Training",
    category: "teacher",
    mode: "studio",
    shortDescription:
      "Immersive in-studio RYT 200 — 8 weeks of daily practice (9:30 am – 1:30 pm) combining Hatha, Ashtanga, anatomy, methodology, and Aerial & Acro yoga.",
    durationLabel: "8 weeks · 9:30 am – 1:30 pm daily",
    scheduleLabel: WEEKDAY_SCHEDULE,
    listingImage: "/images/programs/pranayama.jpg",
    heroImage: "/images/programs/pranayama.jpg",
    instructor: { initials: "CS", name: "Choudhary Sujay Kumar Roy" },
    overview: [
      "Bodhi's in-studio 200-Hour YTT — 8 weeks of immersive practice at a Bodhi centre, daily 9:30 am – 1:30 pm.",
      "Combines Hatha + Ashtanga, meditation, relaxation, pranayama, anatomy, and teaching methodology — plus Aerial Yoga and Acro Yoga sessions.",
      "Graduates qualify as Yoga Alliance RYT 200 and join the Bodhi alumni sangha.",
    ],
    highlights: [
      { icon: "yoga", iconSrc: "/icon/course1.svg", title: "100+ Asanas", body: "Surya Namaskara variations and Ashtanga Viniyasa A & B." },
      { icon: "feather", iconSrc: "/icon/course4.svg", title: "Aerial & Acro Yoga", body: "Bonus modules in aerial hammock and partner acro practice." },
      { icon: "align-center", iconSrc: "/icon/course5.svg", title: "Anatomy & Energy Anatomy", body: "12 body systems plus Pancha Koshas." },
      { icon: "leaf", iconSrc: "/icon/course6.svg", title: "Pranayama, Mudras & Bandhas", body: "Energetic locks, gestures, and breath work." },
      { icon: "people", iconSrc: "/icon/course7.svg", title: "Studio Sangha", body: "Practise, study, and teach alongside your cohort." },
      { icon: "rocket", iconSrc: "/icon/course8.svg", title: "Add-On Modules", body: "Prenatal, Yoga Therapy, and MAT Pilates introductions." },
    ],
    curriculum: [
      { title: "Theory — Ashtanga, Sutras & Koshas", body: "Eight limbs, Patanjali Sutras, Pancha Koshas, yogic diet, ethics." },
      { title: "Anatomy & Energy Anatomy", body: "12 body systems, chakras, and shat kriyas." },
      { title: "Practical — Asana", body: "Surya Namaskara, Ashtanga Viniyasa A & B, 100+ asanas." },
      { title: "Pranayama, Mudras & Meditation", body: "Breath work, energetic gestures, and concentration." },
      { title: "Aerial & Acro Yoga", body: "Bonus modules in aerial hammock and partner acro." },
      { title: "Add-On Modules", body: "Prenatal, Yoga Therapy, and MAT Pilates introductions." },
    ],
    prerequisites: [
      "No specific prior experience required.",
      "Able to attend full-day weekday sessions at the studio.",
      "Genuine interest in teaching and personal transformation.",
    ],
    instructors: [
      teacher("Choudhary Sujay Kumar Roy", FALLBACK_AVATAR_M, "Lead Faculty"),
      teacher("Harsh Rungta", TRAINER_AVATARS.harsh, "Senior Teacher"),
    ],
    faqs: SHARED_FAQS,
  },
  {
    slug: "aerial-yoga-ttc",
    title: "Aerial Yoga Teacher Training Course",
    titleLead: "Aerial Yoga",
    titleAccent: "Teacher Training",
    category: "teacher",
    mode: "studio",
    shortDescription:
      "Master the art of yoga in the air — gravity-assisted inversions, decompressive sequences, and hammock teaching.",
    durationLabel: "4 weeks",
    scheduleLabel: WEEKDAY_SCHEDULE,
    listingImage: "/images/courses/aerial-yoga/hero.png",
    heroImage: "/images/courses/aerial-yoga/hero.png",
    instructor: { initials: "HR", name: "Harsh Rungta" },
    overview: [
      "Master the art of yoga in the air with our Aerial Yoga Teacher Training Course at Bodhi School of Yoga. Build strength, grace, and confidence while learning to teach this unique and therapeutic style using the hammock.",
      "You'll combine traditional yoga postures with graceful aerial movements — learning how inversions decompress the spine, build core stability, and create a deeply healing experience for your future students.",
      "Hands-on training with rigging, transitions, and safety — every session is on the hammock under expert supervision.",
    ],
    highlights: [
      { icon: "feather", iconSrc: "/icon/course1.svg", title: "Yoga Meets Flight", body: "Combine traditional poses with graceful aerial movements." },
      { icon: "spine", iconSrc: "/icon/course4.svg", title: "Relieve & Realign", body: "Inversions decompress the spine and boost flexibility." },
      { icon: "smile", iconSrc: "/icon/course5.svg", title: "Therapeutic & Fun", body: "Enjoy emotional release through playful, healing practice." },
      { icon: "strength", iconSrc: "/icon/course6.svg", title: "Build Strength", body: "Improve core stability, balance, and control." },
      { icon: "rocket", iconSrc: "/icon/course7.svg", title: "Teach with an Edge", body: "Gain a rare certification and grow your yoga career." },
      { icon: "people", iconSrc: "/icon/course8.svg", title: "Join a Community", body: "Connect with passionate practitioners and expert teachers." },
    ],
    curriculum: [
      { title: "Rigging Essentials", body: "How to safely set up and use aerial hammocks." },
      { title: "Aerial Sequences", body: "Beginner to advanced aerial yoga flows." },
      { title: "Teaching Methodology", body: "Conducting private and group aerial sessions." },
      { title: "Alignment & Anatomy in the Air", body: "How aerial postures impact muscles and joints." },
      { title: "Contraindications & Safety", body: "Modifications for common conditions." },
      { title: "Business of Aerial Yoga", body: "Studio set-up, pricing, marketing, and safety paperwork." },
    ],
    prerequisites: [
      "Basic understanding of yoga postures.",
      "Physically fit to perform inversions and aerial movements.",
      "Willingness to explore new boundaries of body and breath.",
    ],
    instructors: [
      teacher("Harsh Rungta", TRAINER_AVATARS.harsh, "Lead Faculty · Aerial Yoga"),
    ],
    faqs: [
      {
        question: "Do I need prior experience in aerial yoga?",
        answer:
          "No prior aerial yoga experience is required. A basic understanding of yoga postures and physical fitness to perform inversions is sufficient.",
        defaultOpen: true,
      },
      ...SHARED_FAQS,
    ],
  },
  {
    slug: "mudgar-ttc",
    title: "Mudgar Teacher Training Course",
    titleLead: "Mudgar",
    titleAccent: "Teacher Training",
    category: "teacher",
    mode: "studio",
    shortDescription:
      "Learn the ancient Indian art of mudgar (yogic mace) — build strength, mobility, and rotational power. Bundled with the in-studio Residential YTT.",
    durationLabel: "3 weeks",
    scheduleLabel: WEEKDAY_SCHEDULE,
    listingImage: "/images/programs/weight-loss-coach.png",
    heroImage: "/images/programs/weight-loss-coach.png",
    instructor: { initials: "JD", name: "Janardhan Durga Prasad" },
    overview: [
      "The mudgar (yogic mace) is one of the oldest strength tools in India — used for centuries by wrestlers and yogis to build whole-body strength and rotational mobility.",
      "Our Teacher Training certifies you to safely coach mudgar flows of varying weights, paired with yogic breath and movement principles. Available as a stand-alone studio module or bundled with the Residential 21-day YTT in Bangalore.",
      "Graduates can teach group mudgar sessions, integrate mace work into existing yoga or fitness classes, or coach 1:1 clients.",
    ],
    highlights: [
      { icon: "strength", iconSrc: "/icon/course1.svg", title: "Shoulder Health", body: "Build resilient, mobile shoulders through 360° loading." },
      { icon: "align-center", iconSrc: "/icon/course4.svg", title: "Rotational Power", body: "Develop torso strength that transfers to every sport." },
      { icon: "yoga", iconSrc: "/icon/course5.svg", title: "Breath-Linked Flow", body: "Pair mace work with yogic breath patterns." },
      { icon: "leaf", iconSrc: "/icon/course6.svg", title: "Joint Mobility", body: "Open shoulders, thoracic spine, and hips safely." },
      { icon: "people", iconSrc: "/icon/course7.svg", title: "Coach Group Classes", body: "Class formats for 5–25 people across skill levels." },
      { icon: "rocket", iconSrc: "/icon/course8.svg", title: "Niche Specialisation", body: "Rare credential in the modern yoga and fitness market." },
    ],
    curriculum: [
      { title: "History & Philosophy", body: "Origins of the mudgar in Indian wrestling and yoga traditions." },
      { title: "Foundational Holds", body: "Grip, stance, and safe entry positions." },
      { title: "Beginner Flows", body: "10 / 20 / 30 — counts and basic 360° flows." },
      { title: "Intermediate & Advanced Flows", body: "Pendulum, gama cast, and combination flows." },
      { title: "Safety & Progressions", body: "Loading, deloading, contraindications, common errors." },
      { title: "Class Design", body: "30 / 45 / 60-minute formats and progressions." },
    ],
    prerequisites: [
      "Baseline shoulder mobility and overhead strength.",
      "No prior mudgar experience required.",
      "Comfortable working with weighted implements (we provide).",
    ],
    instructors: DEFAULT_INSTRUCTORS,
    faqs: SHARED_FAQS,
  },

  // ===========================================================
  // REGULAR YOGA COURSES — ONLINE
  // ===========================================================
  {
    slug: "daily-regular-yoga-online",
    title: "Daily Regular Yoga Classes",
    titleLead: "Daily Regular",
    titleAccent: "Yoga Classes",
    category: "yoga",
    mode: "online",
    shortDescription:
      "Rediscover, rejuvenate, relax — daily 50-minute online yoga classes with flexible morning and evening slots for every level.",
    durationLabel: "4 weeks",
    scheduleLabel: WEEKDAY_SCHEDULE,
    listingImage: "/images/programs/pranayama.jpg",
    heroImage: "/images/programs/pranayama.jpg",
    instructor: { initials: "SG", name: "Swetangana Nandan Gogoi" },
    overview: [
      "Live online yoga classes designed to help you rediscover, rejuvenate, and relax — taught daily with flexible morning and evening slots.",
      "Each 50-minute session is low-impact, all-ages friendly, and blends asana, pranayama, and a short meditation.",
      "Affordable membership at ₹50/day with replays available so you never miss a class on busy days.",
    ],
    highlights: [
      { icon: "yoga", iconSrc: "/icon/course1.svg", title: "All Ages Welcome", body: "Low-impact sequences designed for every fitness level." },
      { icon: "leaf", iconSrc: "/icon/course4.svg", title: "Flexible Slots", body: "Morning (4 am – 11 am) and evening (5 pm – 8 pm) time slots." },
      { icon: "smile", iconSrc: "/icon/course5.svg", title: "Live & Replays", body: "Join live or watch the recording within 24 hours." },
      { icon: "align-center", iconSrc: "/icon/course6.svg", title: "Rotating Themes", body: "Strength, flexibility, breath, and meditation each week." },
      { icon: "people", iconSrc: "/icon/course7.svg", title: "Bodhi Community", body: "Practise alongside a friendly global community." },
      { icon: "rocket", iconSrc: "/icon/course8.svg", title: "₹50 / Day", body: "Affordable membership with no long-term commitment." },
    ],
    curriculum: [
      { title: "Morning Flow", body: "Energising sequences to start the day." },
      { title: "Evening Restorative", body: "Gentle, slow sequences to unwind." },
      { title: "Pranayama Lab", body: "Weekly deep breath-work session." },
      { title: "Strength & Mobility", body: "Functional-yoga sessions for joint health." },
      { title: "Guided Meditation", body: "20-minute guided meditation session." },
      { title: "Yoga Therapy Slots", body: "Targeted sessions for back pain, sleep, and stress." },
    ],
    prerequisites: [
      "All ages welcome — no prior experience required.",
      "Yoga mat and comfortable clothing.",
      "Stable internet connection.",
    ],
    instructors: [
      teacher("Swetangana Nandan Gogoi", TRAINER_AVATARS.swetangana, "Lead Faculty · Daily Yoga"),
    ],
    faqs: SHARED_FAQS,
  },
  {
    slug: "happy-weight-loss",
    title: "Happy Weight Loss Classes",
    titleLead: "Happy",
    titleAccent: "Weight Loss",
    category: "yoga",
    mode: "online",
    shortDescription:
      "Bodhi's 21-day Weight Loss Transformation — yoga, breath, mindful nutrition, and weekly coaching for sustainable change.",
    durationLabel: "21 days",
    scheduleLabel: WEEKDAY_SCHEDULE,
    listingImage: "/images/programs/weight-loss-coach.png",
    heroImage: "/images/programs/weight-loss-coach.png",
    instructor: { initials: "JD", name: "Janardhan Durga Prasad" },
    overview: [
      "A 21-day guided transformation combining live online yoga, breath-work, and mindful nutrition for sustainable weight loss.",
      "Weekday sessions only — designed for people with full-time work who want a realistic, repeatable rhythm.",
      "Includes weekly check-ins, simple recipes, and a private community for accountability.",
    ],
    highlights: [
      { icon: "yoga", iconSrc: "/icon/course1.svg", title: "Targeted Yoga", body: "Dynamic flows, twists, and inversions that move stuck energy." },
      { icon: "leaf", iconSrc: "/icon/course4.svg", title: "Mindful Eating", body: "Sustainable food habits — no crash dieting." },
      { icon: "strength", iconSrc: "/icon/course5.svg", title: "Daily Movement", body: "Weekday yoga sessions with progressive intensity." },
      { icon: "smile", iconSrc: "/icon/course6.svg", title: "Happy, Not Harsh", body: "Joy-led programme — celebrate progress, not punish." },
      { icon: "people", iconSrc: "/icon/course7.svg", title: "Daily Check-ins", body: "Accountability messaging and coach support throughout the 21 days." },
      { icon: "rocket", iconSrc: "/icon/course8.svg", title: "Lasting Results", body: "Habits and tools that stay long after the programme ends." },
    ],
    curriculum: [
      { title: "Week 1 — Foundations", body: "Baseline measurements, breath-work, mindful eating intro." },
      { title: "Week 1 — Cleansing", body: "Yogic detox practices and hydration reset." },
      { title: "Week 2 — Build Strength", body: "Surya Namaskara, Shakthi Bandhana, dynamic flows." },
      { title: "Week 2 — Nutrition Reset", body: "Yogic diet, simple meal plans, plate guide." },
      { title: "Week 3 — Deepen Practice", body: "Twists, inversions, and longer holds." },
      { title: "Week 3 — Integrate", body: "Build a sustainable practice and meal plan beyond day 21." },
    ],
    prerequisites: [
      "Medical clearance if you have a chronic condition.",
      "Open mind — willingness to try mindful eating practices.",
      "Stable internet for live sessions and check-ins.",
    ],
    instructors: [
      teacher("Janardhan Durga Prasad", TRAINER_AVATARS.janardhan, "Lead Faculty · Weight Loss Coach"),
    ],
    faqs: SHARED_FAQS,
  },
  {
    slug: "advanced-yoga-mat-pilates",
    title: "Advanced Yoga & Mat-Pilates Classes",
    titleLead: "Advanced Yoga",
    titleAccent: "& Mat-Pilates",
    category: "yoga",
    mode: "online",
    shortDescription:
      "Take your practice to the next level — 3 months of live advanced yoga and mat-Pilates classes with expert guidance.",
    durationLabel: "3 months",
    scheduleLabel: WEEKDAY_SCHEDULE,
    listingImage: "/images/programs/mat-pilates.png",
    heroImage: "/images/programs/mat-pilates.png",
    instructor: { initials: "LY", name: "Lakshmi Yalamudi" },
    overview: [
      "Take your practice to the next level with 3 months of live advanced yoga combined with mat-Pilates conditioning — designed for experienced practitioners.",
      "Work through advanced asanas, Pilates exercises, breath control, and refined body alignment under expert guidance.",
      "Membership-based with recorded sessions and a small live community for personalised feedback.",
    ],
    highlights: [
      { icon: "yoga", iconSrc: "/icon/course1.svg", title: "Advanced Asana", body: "Inversions, arm balances, and deep flexibility work." },
      { icon: "strength", iconSrc: "/icon/course4.svg", title: "Pilates Conditioning", body: "Core, pelvic floor, and stability sessions." },
      { icon: "align-center", iconSrc: "/icon/course5.svg", title: "Posture & Alignment", body: "Detailed cues for refined alignment." },
      { icon: "leaf", iconSrc: "/icon/course6.svg", title: "Breath-Linked Flow", body: "Sequencing that honours breath rhythm at every step." },
      { icon: "people", iconSrc: "/icon/course7.svg", title: "Small Cohort", body: "Limited live spots so the teacher can see you." },
      { icon: "rocket", iconSrc: "/icon/course8.svg", title: "Progress Tracking", body: "Monthly milestones to track your practice growth." },
    ],
    curriculum: [
      { title: "Monday — Inversions", body: "Sirsasana, Sarvangasana, and prep variations." },
      { title: "Tuesday — Pilates Core", body: "Full mat repertoire with breath." },
      { title: "Wednesday — Arm Balances", body: "Bakasana, Eka Pada Koundinyasana, transitions." },
      { title: "Thursday — Pilates Flow", body: "Flow-based class linking 20+ exercises." },
      { title: "Friday — Backbends & Stretch", body: "Deep flexibility and recovery." },
      { title: "Saturday — Recordings Only", body: "Catch up on missed sessions (no live class)." },
    ],
    prerequisites: [
      "Prior yoga experience required.",
      "All ages with experience welcome.",
      "Medical clearance for advanced postures if relevant.",
    ],
    instructors: [
      teacher("Lakshmi Yalamudi", TRAINER_AVATARS.lakshmi, "Lead Faculty · Advanced Yoga"),
      teacher("Swathi Patle", FALLBACK_AVATAR_F, "Senior Teacher · Mat Pilates"),
    ],
    faqs: SHARED_FAQS,
  },

  // ===========================================================
  // REGULAR YOGA COURSES — STUDIO
  // ===========================================================
  {
    slug: "daily-regular-yoga-studio",
    title: "Daily Regular Yoga Classes",
    titleLead: "Daily Regular",
    titleAccent: "Yoga Classes",
    category: "yoga",
    mode: "studio",
    shortDescription:
      "Drop-in daily yoga at Bodhi centres — weekday mornings and evenings, 50-minute classes for every level.",
    durationLabel: "4 weeks",
    scheduleLabel: WEEKDAY_SCHEDULE,
    listingImage: "/images/programs/pranayama-nervous-system.jpg",
    heroImage: "/images/programs/pranayama-nervous-system.jpg",
    instructor: { initials: "SG", name: "Swetangana Nandan Gogoi" },
    overview: [
      "In-person yoga classes at Bodhi centres — open every weekday morning and evening for members and drop-ins.",
      "Each 50-minute session blends asana, pranayama, and short meditation — taught by Bodhi-certified faculty.",
      "Affordable monthly memberships with unlimited classes; senior, student, and family discounts available.",
    ],
    highlights: [
      { icon: "yoga", iconSrc: "/icon/course1.svg", title: "All Levels Welcome", body: "From absolute beginner to seasoned practitioner." },
      { icon: "leaf", iconSrc: "/icon/course4.svg", title: "Weekday Schedule", body: "Mon – Fri mornings and evenings — no weekend classes." },
      { icon: "smile", iconSrc: "/icon/course5.svg", title: "Studio Sangha", body: "Practise alongside a friendly local community." },
      { icon: "align-center", iconSrc: "/icon/course6.svg", title: "Hands-On Adjustments", body: "Real-time consent-led adjustments from your teacher." },
      { icon: "strength", iconSrc: "/icon/course7.svg", title: "Rotating Themes", body: "Strength, flexibility, breath, and meditation each week." },
      { icon: "rocket", iconSrc: "/icon/course8.svg", title: "Unlimited Membership", body: "One monthly fee for unlimited classes." },
    ],
    curriculum: [
      { title: "Morning Flow", body: "Energising sequence to start the day." },
      { title: "Evening Restorative", body: "Gentle slow sequence to unwind." },
      { title: "Pranayama Lab", body: "Weekly deep breath-work session." },
      { title: "Strength & Mobility", body: "Functional yoga session for joint health." },
      { title: "Meditation Wednesday", body: "20-minute guided meditation." },
      { title: "Open Q&A Friday", body: "Hour with senior teachers." },
    ],
    prerequisites: [
      "No prior experience required.",
      "Bring water and a small towel — mats provided.",
      "Arrive 10 minutes early to settle in.",
    ],
    instructors: [
      teacher("Swetangana Nandan Gogoi", TRAINER_AVATARS.swetangana, "Lead Faculty · Daily Yoga"),
    ],
    faqs: SHARED_FAQS,
  },
];

// ---------------------------------------------------------------------------
// Lookups
// ---------------------------------------------------------------------------

export function getCoursesByCategoryAndMode(
  category: CourseCategory,
  mode: CourseMode,
): Course[] {
  return COURSES.filter((c) => c.category === category && c.mode === mode);
}

export function findCourseBySlug(slug: string): Course | undefined {
  return COURSES.find((c) => c.slug === slug);
}

export function getRelatedCourses(course: Course, limit = 3): Course[] {
  // Prefer same category and opposite mode, then same category same mode, then anything.
  const sameCatOtherMode = COURSES.filter(
    (c) => c.slug !== course.slug && c.category === course.category && c.mode !== course.mode,
  );
  const sameCatSameMode = COURSES.filter(
    (c) => c.slug !== course.slug && c.category === course.category && c.mode === course.mode,
  );
  const others = COURSES.filter(
    (c) => c.slug !== course.slug && c.category !== course.category,
  );
  return [...sameCatOtherMode, ...sameCatSameMode, ...others].slice(0, limit);
}

// ---------------------------------------------------------------------------
// Category metadata for listing pages
// ---------------------------------------------------------------------------

export const CATEGORY_LABELS: Record<CourseCategory, string> = {
  advanced: "Advanced Certifications",
  teacher: "Teacher Courses",
  yoga: "Yoga Courses",
};

export const CATEGORY_BASE_PATH: Record<CourseCategory, string> = {
  advanced: "/advanced-certifications",
  teacher: "/teacher-courses",
  yoga: "/yoga-courses",
};

export const MODE_LABELS: Record<CourseMode, string> = {
  online: "Online",
  studio: "Studio",
};
