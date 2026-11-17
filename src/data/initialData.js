// Curated Initial Data for EduConnect (UN SDG 4: Quality Education)

export const IMPACT_METRICS = {
  totalResources: 854,
  activeStudents: "14,820+",
  quizzesCompleted: "38,450+",
  partnerNGOs: 42,
  regionsCovered: 19,
  learningHoursSaved: "125,000+ hrs"
};

export const INITIAL_RESOURCES = [
  {
    id: "res-1",
    title: "Foundations of Fractions & Decimals (Visual Workbook)",
    description: "Interactive visual guides and practice worksheets illustrating fractions with pie slices and real-world currency math for primary learners.",
    subject: "Mathematics",
    gradeLevel: "Primary",
    fileType: "PDF",
    fileSize: "2.4 MB",
    author: "Global Math Initiative",
    partnerOrg: "Teach for All",
    uploadDate: "2026-10-14",
    downloads: 1240,
    rating: 4.9,
    tags: ["Fractions", "Visual Learning", "Basic Math"],
    featured: true,
    contentPreview: "Chapter 1: Understanding halves, quarters, and eighths using everyday shapes. Visual fraction bars, exercises with answers included."
  },
  {
    id: "res-2",
    title: "Eco-Explorers: Clean Water & Ecosystems Handbook",
    description: "Comprehensive guide to water cycles, river filtration, and ecological balance designed for accessible offline study.",
    subject: "Science",
    gradeLevel: "Middle",
    fileType: "PDF",
    fileSize: "4.1 MB",
    author: "UNESCO Youth Science Project",
    partnerOrg: "UNESCO Open Learning",
    uploadDate: "2026-10-28",
    downloads: 980,
    rating: 4.8,
    tags: ["Ecology", "Clean Water", "Biology", "SDG 6"],
    featured: true,
    contentPreview: "Explore how wetlands naturally filter pollutants, build a DIY sand-charcoal water filter, and test water clarity with Secchi disk simulation."
  },
  {
    id: "res-3",
    title: "Digital Literacy 101: Navigating the Internet Safely",
    description: "Step-by-step primer on using web browsers, identifying phishing, respecting online privacy, and using search engines effectively.",
    subject: "Digital Literacy",
    gradeLevel: "Middle",
    fileType: "Link",
    fileSize: "Web Guide",
    author: "Digital Bharat Education",
    partnerOrg: "Digital Bridge Alliance",
    uploadDate: "2026-11-02",
    downloads: 2150,
    rating: 5.0,
    tags: ["Internet Safety", "Cyber Hygiene", "Search Skills"],
    featured: true,
    contentPreview: "Includes interactive cyber safety quiz, checklist for strong passwords, and guides on finding trusted educational research online."
  },
  {
    id: "res-4",
    title: "Everyday English: Conversational & Storytelling Essentials",
    description: "Illustrated dialogue scenarios, vocabulary flashcard sheets, and phonetic reading drills for non-native English speakers.",
    subject: "English",
    gradeLevel: "Primary",
    fileType: "PDF",
    fileSize: "3.7 MB",
    author: "Community ESL Collaborative",
    partnerOrg: "Pratham Education",
    uploadDate: "2026-09-18",
    downloads: 1670,
    rating: 4.7,
    tags: ["Grammar", "Speaking", "Vocabulary"],
    featured: false,
    contentPreview: "Unit 1: Introductions and greetings. Unit 2: Describing community helpers. Audio link transcript and printable practice prompts."
  },
  {
    id: "res-5",
    title: "Algebra Made Simple: Linear Equations & Graphs",
    description: "Step-by-step breakdown of single-variable linear equations, slope-intercept form, and practical graphing techniques.",
    subject: "Mathematics",
    gradeLevel: "Secondary",
    fileType: "PDF",
    fileSize: "5.2 MB",
    author: "Open Science & Math Foundation",
    partnerOrg: "Khan Community Labs",
    uploadDate: "2026-11-08",
    downloads: 1430,
    rating: 4.9,
    tags: ["Algebra", "Linear Equations", "Graphs"],
    featured: true,
    contentPreview: "Detailed worked examples for y = mx + c. Real-world modeling: speed vs time, budgeting graphs, and 30 solved practice problems."
  },
  {
    id: "res-6",
    title: "Climate Change & Renewable Energy Fundamentals",
    description: "Solar, wind, and geothermal energy principles explained with DIY experiments that require only simple household items.",
    subject: "Science",
    gradeLevel: "Secondary",
    fileType: "PDF",
    fileSize: "3.9 MB",
    author: "UN Environment Youth Desk",
    partnerOrg: "SDG Action Network",
    uploadDate: "2026-10-05",
    downloads: 870,
    rating: 4.8,
    tags: ["Renewable Energy", "Climate Action", "Physics", "SDG 13"],
    featured: false,
    contentPreview: "Diagrams of photovoltaic cells, how wind turbines generate magnetic induction, and greenhouse gas impact data sets."
  },
  {
    id: "res-7",
    title: "Introduction to Computational Thinking & Block Coding",
    description: "Interactive visual logic puzzles introducing loops, conditionals, and variables without needing expensive computers.",
    subject: "Digital Literacy",
    gradeLevel: "Primary",
    fileType: "Link",
    fileSize: "Interactive Web",
    author: "Code For All Youth",
    partnerOrg: "Teach for All",
    uploadDate: "2026-11-12",
    downloads: 1890,
    rating: 4.9,
    tags: ["Coding", "Algorithms", "Logic"],
    featured: false,
    contentPreview: "Unplugged coding activities with grid paper, algorithm flowcharts, and browser-based beginner puzzle simulator."
  },
  {
    id: "res-8",
    title: "Creative Writing & Persuasive Essay Masterclass",
    description: "Frameworks for argumentative thesis statements, persuasive rhetoric, storytelling arcs, and peer review rubrics.",
    subject: "English",
    gradeLevel: "Secondary",
    fileType: "PDF",
    fileSize: "1.8 MB",
    author: "Literacy Without Borders",
    partnerOrg: "Room to Read",
    uploadDate: "2026-10-19",
    downloads: 760,
    rating: 4.6,
    tags: ["Essay Writing", "Rhetoric", "Literary Analysis"],
    featured: false,
    contentPreview: "The PEEL paragraph method (Point, Evidence, Explanation, Link). Sample high-scoring student essays with mentor commentary."
  }
];

export const QUIZ_QUESTIONS = [
  {
    id: "q1",
    subject: "Science",
    gradeLevel: "Middle",
    question: "What primary gas do green plants absorb from the atmosphere during photosynthesis?",
    options: [
      "Oxygen (O2)",
      "Carbon Dioxide (CO2)",
      "Nitrogen (N2)",
      "Methane (CH4)"
    ],
    correctAnswer: 1,
    explanation: "Plants use sunlight, water, and carbon dioxide (CO2) to produce glucose and release oxygen back into the atmosphere as a byproduct."
  },
  {
    id: "q2",
    subject: "Mathematics",
    gradeLevel: "Primary",
    question: "If a student reads 15 pages every day for 4 days, how many pages have they read in total?",
    options: [
      "45 pages",
      "50 pages",
      "60 pages",
      "65 pages"
    ],
    correctAnswer: 2,
    explanation: "Multiplication calculation: 15 pages × 4 days = 60 total pages."
  },
  {
    id: "q3",
    subject: "Digital Literacy",
    gradeLevel: "Middle",
    question: "Which of the following creates the most secure password according to cyber safety best practices?",
    options: [
      "password123",
      "MySchool2024",
      "Tr!v1a#Sun$92&",
      "1234567890"
    ],
    correctAnswer: 2,
    explanation: "Strong passwords combine uppercase and lowercase letters, numbers, and special symbols, and avoid common dictionary words."
  },
  {
    id: "q4",
    subject: "Science",
    gradeLevel: "Secondary",
    question: "Which renewable energy source directly converts sunlight into electricity using photovoltaic cells?",
    options: [
      "Hydroelectric power",
      "Geothermal energy",
      "Solar power",
      "Biomass energy"
    ],
    correctAnswer: 2,
    explanation: "Solar panels contain photovoltaic (PV) semiconductor cells that convert photons from sunlight directly into electrical current."
  },
  {
    id: "q5",
    subject: "Mathematics",
    gradeLevel: "Secondary",
    question: "What is the value of 'x' in the linear equation: 3x + 9 = 24?",
    options: [
      "x = 3",
      "x = 5",
      "x = 7",
      "x = 8"
    ],
    correctAnswer: 1,
    explanation: "Subtract 9 from both sides: 3x = 15. Then divide both sides by 3: x = 5."
  },
  {
    id: "q6",
    subject: "English",
    gradeLevel: "Middle",
    question: "In the sentence 'The diligent student finished her homework before sunset', what part of speech is 'diligent'?",
    options: [
      "Adverb",
      "Noun",
      "Adjective",
      "Conjunction"
    ],
    correctAnswer: 2,
    explanation: "'Diligent' is an adjective because it describes or modifies the noun 'student'."
  },
  {
    id: "q7",
    subject: "Digital Literacy",
    gradeLevel: "Secondary",
    question: "What does the 's' in 'https://' signify in a web browser's address bar?",
    options: [
      "Speed (faster connection)",
      "Secure (encrypted transmission)",
      "Standard (certified domain)",
      "Server (hosted in cloud)"
    ],
    correctAnswer: 1,
    explanation: "HTTPS stands for Hypertext Transfer Protocol Secure, indicating that data transmitted between your browser and the website is encrypted with TLS/SSL."
  },
  {
    id: "q8",
    subject: "English",
    gradeLevel: "Secondary",
    question: "Which literary device involves giving human traits or emotions to inanimate objects (e.g., 'The wind whispered through the dark trees')?",
    options: [
      "Metaphor",
      "Personification",
      "Hyperbole",
      "Alliteration"
    ],
    correctAnswer: 1,
    explanation: "Personification attributes human qualities (like 'whispering') to non-human entities such as wind or trees."
  }
];

export const SYLLABUS_MILESTONES = [
  {
    id: "track-math",
    subject: "Mathematics",
    color: "from-blue-500 to-indigo-600",
    badge: "Master of Numbers",
    topics: [
      { id: "m1", title: "Number Systems & Place Value", estimatedTime: "2 hrs", completed: true },
      { id: "m2", title: "Fractions, Decimals & Percentages", estimatedTime: "3.5 hrs", completed: true },
      { id: "m3", title: "Introduction to Ratios & Proportions", estimatedTime: "2.5 hrs", completed: false },
      { id: "m4", title: "Algebraic Expressions & Simple Equations", estimatedTime: "4 hrs", completed: false },
      { id: "m5", title: "Perimeter, Area & 2D Geometry Basics", estimatedTime: "3 hrs", completed: false }
    ]
  },
  {
    id: "track-science",
    subject: "Science",
    color: "from-emerald-500 to-teal-600",
    badge: "Eco-Scientist",
    topics: [
      { id: "s1", title: "Living Organisms & Plant Biology", estimatedTime: "2.5 hrs", completed: true },
      { id: "s2", title: "Water Cycle & Weather Systems", estimatedTime: "2 hrs", completed: true },
      { id: "s3", title: "Forces, Motion & Simple Machines", estimatedTime: "3.5 hrs", completed: false },
      { id: "s4", title: "Renewable Energy & Environmental Care", estimatedTime: "3 hrs", completed: false },
      { id: "s5", title: "States of Matter & Chemical Reactions", estimatedTime: "4 hrs", completed: false }
    ]
  },
  {
    id: "track-digital",
    subject: "Digital Literacy",
    color: "from-violet-500 to-purple-600",
    badge: "Cyber Navigator",
    topics: [
      { id: "d1", title: "Computer Basics & Operating Systems", estimatedTime: "1.5 hrs", completed: true },
      { id: "d2", title: "Internet Safety & Password Protection", estimatedTime: "2 hrs", completed: true },
      { id: "d3", title: "Effective Web Search & Fact Checking", estimatedTime: "2.5 hrs", completed: true },
      { id: "d4", title: "Introduction to Visual Block Coding", estimatedTime: "4 hrs", completed: false },
      { id: "d5", title: "Digital Ethics & Creative Commons", estimatedTime: "2 hrs", completed: false }
    ]
  },
  {
    id: "track-english",
    subject: "English",
    color: "from-amber-500 to-orange-600",
    badge: "Literary Champion",
    topics: [
      { id: "e1", title: "Parts of Speech & Sentence Building", estimatedTime: "2.5 hrs", completed: true },
      { id: "e2", title: "Reading Comprehension & Critical Inquiries", estimatedTime: "3 hrs", completed: false },
      { id: "e3", title: "Vocabulary in Everyday Contexts", estimatedTime: "2 hrs", completed: false },
      { id: "e4", title: "Descriptive & Narrative Paragraphs", estimatedTime: "3.5 hrs", completed: false },
      { id: "e5", title: "Public Speaking & Discussion Skills", estimatedTime: "2 hrs", completed: false }
    ]
  }
];

export const SDG_INFO = {
  goalNumber: 4,
  title: "Quality Education",
  subtitle: "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.",
  targets: [
    { code: "4.1", title: "Universal Primary & Secondary Education", description: "Free, equitable, and quality primary and secondary education for all boys and girls." },
    { code: "4.4", title: "Skills for Decent Work", description: "Substantially increase the number of youth and adults with technical and vocational skills for employment." },
    { code: "4.7", title: "Education for Sustainable Development", description: "Ensure all learners acquire the knowledge and skills needed to promote sustainable lifestyles and human rights." },
    { code: "4.a", title: "Effective Learning Environments", description: "Build and upgrade education facilities that are child, disability, and gender sensitive." }
  ]
};
