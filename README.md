# EduConnect: Open-Access Web Resource & Study Hub
**Built for UN SDG 4: Quality Education**

EduConnect is a fully responsive, production-ready web application designed to bridge the digital education divide. It provides free, community-reviewed learning resources, interactive self-assessment quizzes, dynamic syllabus progress tracking, and an NGO admin portal for grassroots educators.

---

## 🌟 Key Features

1. **Home / Landing Page:**
   - Hero section featuring the headline: *"Empowering Community Education through Digital Access"*.
   - UN SDG 4 Quality Education mission spotlight banner with official SDG 2030 targets (4.1, 4.4, 4.7, 4.a).
   - Dynamic impact counter cards (850+ Open Resources, 14,800+ Active Students, 38,400+ Quizzes Completed, 42 Partner NGOs).

2. **Student Resource Hub (Library):**
   - Real-time instant keyword search across titles, descriptions, subjects, and NGO partners.
   - Multi-dimensional filters: Grade Level (*Primary, Middle, Secondary*), Subject (*Mathematics, Science, Digital Literacy, English*), and File Type (*PDF, Web Guide*).
   - Bookmark system with local persistence.
   - Interactive Study Preview Modal for low-bandwidth reading and offline downloads.

3. **Interactive Practice Quiz Engine:**
   - Multiple-choice questions (MCQs) covering STEM, Digital Hygiene, and English.
   - Subject-specific or Mixed Curriculum quiz tracks.
   - Instant visual feedback: Emerald green for correct answers, rose red for incorrect answers, accompanied by clear pedagogical explanations.
   - Comprehensive Score Summary Card with celebration confetti, XP rewards, review mode, and restart options.

4. **Student Progress Tracker:**
   - Interactive checklist with visual progress percentage bars updated in real-time.
   - Track breakdown across Mathematics, Science, Digital Literacy, and English.
   - Verified competence badges unlocked upon curriculum completion.
   - Persistent progress saved in `localStorage`.

5. **NGO Admin Dashboard:**
   - Overview metrics: Active Curriculums, Total Offline Downloads, Regional Clusters, Partner Verification.
   - "Upload New Resource" modal form with validation.
   - Interactive data table with real-time search, Edit modal, and Delete actions.
   - Instant two-way synchronization between Admin Portal and Student Resource Hub.

---

## 🚀 Running the Project

From the project directory:

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```
