// Library posts. Empty until real, club-written articles are added here.
// BiC's actual writing lives on Medium — the Library page links there when this is empty.
// To add one: { tag, min, title, excerpt, body } — body is an HTML string.
export const POSTS = [];

export const MEMBERS = [
  {
    group: "2026–27 — current",
    people: [
      { name: "Anvi Wadhwa", role: "Vice President" },
      { name: "Srivats", role: "General Secretary" },
      { name: "Sharan Gopinath Bailur", role: "Events Lead" },
      { name: "S N Adithya Srivatsan", role: "R&D Lead" },
      { name: "Daksh Sablok", role: "Software Lead" },
      { name: "Ardhra Arunkumar", role: "Social Media Lead" },
      { name: "Sri Hasini Chowdhary", role: "Design Lead" },
    ]
  },
  {
    group: "2025–26",
    people: [
      { name: "Dhanvanthini Balaji", role: "President" },
      { name: "Arjuun Bharath", role: "Vice President" },
      { name: "Kanishk M", role: "General Secretary" },
      { name: "Adithya R", role: "Events Lead" },
      { name: "Anvi Wadhwa", role: "Curation Lead" },
      { name: "Sandhya", role: "Design Lead" },
      { name: "Jane Bernice", role: "Design Lead" },
    ]
  },
  {
    group: "Founding committee",
    people: [
      { name: "Mitra Vinda", role: "Founder" },
      { name: "Riddhi Satija", role: "Co-Founder" },
      { name: "Syed Owais", role: "Co-Founder" },
      { name: "Nihar Thampi", role: "Events Lead" },
      { name: "Shaahid Ahmed", role: "R&D Lead" },
      { name: "Parthivi Singh", role: "Social Media Lead" },
      { name: "Samruth A.", role: "Content Lead" },
      { name: "Nikhil Nair", role: "Design Lead" },
    ]
  }
];

export const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/bic-vitc/posts/?feedView=all" },
  { label: "Instagram", href: "https://www.instagram.com/bic_vitc/?hl=en" },
  { label: "Medium", href: "https://medium.com/@businessinnovationcommunityvit" },
];

export const DEFY_NEXT = {
  label: "Next edition",
  title: "DeFy",
  blurb: "The next edition is in the works. Dates, tracks and the prize pool are announced on our socials first.",
  chips: ["Status: in the works", "Dates: TBA", "Tracks: TBA"],
  link: { text: "Visit the DeFy site ↗", href: "https://defy26.vercel.app" }
};

// `winners` is optional — add it only when the results are confirmed.
// e.g. winners: [{ pos: "1st", team: "Team name", prize: "₹25,000/-" }]
export const DEFY_EDITIONS = [
  {
    ed: "DeFy'26",
    when: "12–13 Jan 2026 · VIT Chennai",
    theme: "Third edition. Web3 × entrepreneurship — online ideation round, then a 24-hour onsite build and a top-nine finale.",
    facts: ["₹40,000 pool / track", "1st — ₹25,000", "2nd — ₹15,000", "+ Bounties", "Top 9 finale"]
  },
  {
    ed: "DeFy'25",
    when: "10–11 Jan 2025 · MG Auditorium, VIT Chennai",
    theme: "Second edition. 24 hours of Web3 across two tracks — DeFi and Public Goods.",
    facts: ["Track: DeFi", "Track: Public Goods", "24-hour build"]
  },
  {
    ed: "DeFy'24",
    when: "Jan 2024 · VIT Chennai",
    theme: "Where it started. The first edition that proved a business-first hackathon could pull a crowd.",
    facts: ["The original"]
  }
];

export const EVENTS = {
  technovit: [
    {
      title: "Title under wraps",
      lead: "Daksh",
      blurb: "Scope locked, name pending — details drop here first.",
      chips: ["TechnoVIT '26", "Flagship"]
    },
    {
      title: "Title under wraps",
      lead: "Sharan",
      blurb: "Scope locked, name pending — details drop here first.",
      chips: ["TechnoVIT '26", "Flagship"]
    }
  ],
  general: [
    { title: "Founder AMA night", blurb: "A VIT alum who's raised money, on stage, no filter." },
    { title: "6-hour ideathon", blurb: "One evening, one problem statement, teams of two. Decks by dinner." },
    { title: "Pitch clinic", blurb: "Bring your idea, leave with a deck that survives hard questions." }
  ]
};
