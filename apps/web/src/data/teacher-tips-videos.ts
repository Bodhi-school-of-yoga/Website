// Video tips shown on /tips-to-become-a-successful-yoga-teacher.
// Sourced from the Bodhi School of Yoga YouTube guidance series (the live site's
// /video_gallery/load_more_videos feed — 69 videos). Each entry is a short talk
// on building a thriving yoga-teaching practice. Thumbnails are served by
// YouTube (img.youtube.com — whitelisted in next.config.ts).
//
// Titles are lightly cleaned from the source for presentation; a handful of
// source videos have no title and use a neutral fallback.

export type TeacherTipVideo = {
  /** YouTube video id (the part after /watch?v=). */
  youtubeId: string;
  /** Short, question-led title as shown on the card. */
  title: string;
};

export const TEACHER_TIPS_VIDEOS: TeacherTipVideo[] = [
  { youtubeId: "40KkDPHP5es", title: "Do you want to earn ₹20,000 or ₹2 lakhs?" },
  { youtubeId: "Pl8Tgih7Iu4", title: "What workshops should you conduct?" },
  { youtubeId: "5I5BUwkKNKQ", title: "How to impress your students?" },
  { youtubeId: "f-YrnP1CdCc", title: "How much fees should you fix?" },
  {
    youtubeId: "pVyhgROBSrk",
    title: "What we give our online teacher-training students",
  },
  { youtubeId: "0HuEXwY37e8", title: "How to teach confidently?" },
  { youtubeId: "b_tF24BTTzE", title: "Which tools to use for online yoga?" },
  { youtubeId: "LqBPiiSgTck", title: "How to earn ₹2.5 lakhs in just 3 hours?" },
  {
    youtubeId: "v2Rm1v_Rg6g",
    title: "Good communication: the foundation of successful teaching",
  },
  {
    youtubeId: "B49LUwpPX7U",
    title: "Why patience is the key to success in yoga and life",
  },
  { youtubeId: "5ne-zcH-mBY", title: "Why so many yoga teachers struggle to succeed" },
  { youtubeId: "E4ILOV6AV18", title: "Why effort always leads to success" },
  { youtubeId: "j_Pq3LlN1R8", title: "Take responsibility to inspire change" },
  { youtubeId: "-eg2bmeIBXA", title: "Why yoga teachers still fail" },
  {
    youtubeId: "yhDzroc-oAA",
    title: "Common challenges every new yoga teacher faces",
  },
  { youtubeId: "vz4kig82p4I", title: "When you teach yoga professionally" },
  {
    youtubeId: "MIrUNcReD-I",
    title: "If you want to become a great, successful yoga teacher",
  },
  { youtubeId: "dW6IUamxumY", title: "Do you have confidence? (Tip No. 2)" },
  { youtubeId: "P9GP6SjsUlA", title: "Who inspired you in your life?" },
  { youtubeId: "iEIY8xmLgJE", title: "How to become a successful yoga teacher" },
  { youtubeId: "9FpY6sg6lKw", title: "How much time should you teach daily?" },
  { youtubeId: "-Dhg5qhv6EE", title: "Communication is everything" },
  { youtubeId: "Ox7QLFMKWhE", title: "Be simple & be humble" },
  { youtubeId: "fJvlLwHd-8s", title: "I want 100 students" },
  { youtubeId: "c8PCpijCBIA", title: "How to treat rich students?" },
  { youtubeId: "7TbL5sxnUOM", title: "Should you cut off students?" },
  { youtubeId: "o1SOm5d-y0o", title: "Positive aura: an energetic yoga teacher" },
  { youtubeId: "JsJtgAEwIx0", title: "Teaching yoga from the heart" },
  { youtubeId: "wQHyS3zy5Do", title: "Ethics for yoga teachers" },
  {
    youtubeId: "Z8oYFbfFyy4",
    title: "From good to great: evolving as a yoga teacher",
  },
  { youtubeId: "O3xDC19Jl0o", title: "The growing demand for health coaches" },
  { youtubeId: "6TBRWQD7S24", title: "Always keep learning" },
  {
    youtubeId: "iW6QCFBiP5Y",
    title: "What common challenges every new yoga teacher faces?",
  },
  { youtubeId: "q-rzZ-MDahc", title: "About the Bodhi app" },
  {
    youtubeId: "O35NzkOTlI0",
    title: "What to do when students ask difficult questions?",
  },
  { youtubeId: "cVNbVBxSddQ", title: "How can I market myself?" },
  { youtubeId: "t3Yy0NyRJfc", title: "The big worry of new yoga teachers" },
  {
    youtubeId: "oa1R_STA9vg",
    title: "How many days should I teach yoga — 3, 5 or 7?",
  },
  { youtubeId: "vsjOS_RyLJA", title: "Should you avoid one-to-one classes?" },
  { youtubeId: "F7-HF8cCY0M", title: "How to teach confidently?" },
  {
    youtubeId: "Cph-9ZUsKrY",
    title: "Important workshops every yoga teacher should conduct",
  },
  { youtubeId: "ccPRF1h3L7M", title: "Is success easy or hard?" },
  { youtubeId: "TKQ0vHHwv4I", title: "Do you want to earn ₹20,000 or ₹2 lakhs?" },
  { youtubeId: "bF9HfgZluv4", title: "How much fee should I fix?" },
  { youtubeId: "ryfWqsAUqAc", title: "Student database & consent form" },
  { youtubeId: "WuA_f-VhQP0", title: "The importance of flyers" },
  { youtubeId: "zR0_hzNd8Zk", title: "What is your specialization?" },
  {
    youtubeId: "U_ruSkPn4ws",
    title: "Basic rules every yoga teacher should follow",
  },
  {
    youtubeId: "tSvuDlGq-Bw",
    title: "Mistakes senior yoga teachers can make",
  },
  { youtubeId: "UMeE_UXYkbY", title: "A tip for aspiring yoga teachers" },
  { youtubeId: "X8OKjvLlr9k", title: "How to deal with difficult students?" },
  { youtubeId: "vk-zAlvbTI0", title: "What music should I play in yoga classes?" },
  {
    youtubeId: "gVT382qe6Gk",
    title: "How to handle students who disturb others?",
  },
  {
    youtubeId: "13Cv_NRdeuI",
    title: "How to speak confidently while teaching yoga?",
  },
  {
    youtubeId: "ha6uJ2UB2x4",
    title: "How to teach yoga during the menstrual cycle?",
  },
  {
    youtubeId: "bw49tmKwiFM",
    title: "What to learn after completing your 200-hr Yoga TTC?",
  },
  { youtubeId: "elta9l1nbkY", title: "A tip for aspiring yoga teachers" },
  {
    youtubeId: "sWdv789tN_8",
    title: "Can I use a mobile while teaching a yoga class?",
  },
  { youtubeId: "30QnXxZXkV4", title: "A tip for aspiring yoga teachers" },
  { youtubeId: "OytzkXNGQw0", title: "What is the importance of technology?" },
  {
    youtubeId: "ZzhslydUDJY",
    title: "Why do senior yoga teachers feel bored teaching?",
  },
  { youtubeId: "wB02StuJj7I", title: "A tip for aspiring yoga teachers" },
  { youtubeId: "ULhJw16uGos", title: "Why every yoga teacher needs a mentor" },
  {
    youtubeId: "j_fMuaKhTpg",
    title: "The 3-step process to convince a student",
  },
  {
    youtubeId: "5Icyg3DX5Dc",
    title: "An important message for senior yoga teachers",
  },
  { youtubeId: "zxwra7TByYM", title: "Why discipline is the mother of success" },
  { youtubeId: "EGurCuQrq3Y", title: "A tip for aspiring yoga teachers" },
  {
    youtubeId: "zG7XdO7QxA0",
    title: "What are the fundamentals of yogic science?",
  },
  { youtubeId: "w4kN4pijlPg", title: "A tip for aspiring yoga teachers" },
];
