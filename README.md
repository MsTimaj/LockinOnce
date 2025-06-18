
# LockInOnce - Serious Relationship Matching Platform (MVP)

LockInOnce is a sophisticated AI-powered relationship matching platform designed exclusively for individuals seeking deep, lasting love, no swipes, no games.. Built on proven relationship science, our platform uses comprehensive compatibility assessments to create meaningful connections for long-term partnerships. 

🛠️ **Built for the [Lovable.dev](https://lovable.dev) June 2025 Hackathon.**  
🚀 Submission: [[Project Page Link](https://lock-in-once.lovable.app/)] 

## 🎯 MVP Mission

**Demo-Ready Relationship Matching Platform** - Showcase the core value proposition through a fully functional assessment-to-matching flow without enterprise complexity. Focus on proving the concept with real compatibility intelligence.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm install
npm run dev
```

Open your browser and navigate to `http://localhost:5173`

## 📱 MVP User Journey

```
Landing Page → 14-Step Assessment → AI Analysis → Match Dashboard → Match Details
```

**Current MVP Features:**
- ✅ Complete 14-step compatibility assessment (18-22 minutes)
- ✅ Science-based readiness scoring and analysis
- ✅ AI-powered results summary with Love-vee coach
- ✅ Compatibility-based match generation
- ✅ Professional, relationship-focused UI/UX

## 🏗️ MVP Architecture

```
src/
├── components/
│   ├── assessments/          # 14 comprehensive compatibility assessments
│   ├── matches/              # Match display and interaction components
│   ├── ai/                   # Love-vee AI coach interface
│   ├── dashboard/            # User dashboard and navigation
│   └── ui/                   # Shadcn UI components
├── pages/
│   ├── Index.tsx             # Landing page with value proposition
│   ├── Onboarding.tsx        # Multi-phase assessment flow
│   ├── AIResultsSummary.tsx  # Assessment analysis and readiness scoring
│   └── Dashboard.tsx         # Match dashboard and profile management
├── utils/
│   ├── compatibilityCalculator.ts  # Match generation and scoring
│   ├── assessmentScoring.ts         # Assessment result calculations
│   └── userStateManager.ts         # Local state persistence
```

## 🎯 MVP Completion Status

**Phase 1: Foundation (COMPLETE)**
- ✅ Landing page with clear value proposition
- ✅ Complete assessment flow (14 steps)
- ✅ Professional UI/UX with mobile responsiveness
- ✅ Progress tracking and state management

**Phase 2: Intelligence (IN PROGRESS)**
- 🔄 Real compatibility calculation algorithms
- 🔄 Enhanced match detail views with compatibility breakdowns
- 🔄 Improved Love-vee contextual responses
- ❌ Simple connection/interest system

**Phase 3: Polish (PLANNED)**
- ❌ Comprehensive error handling
- ❌ Enhanced match profile diversity
- ❌ User profile insights and education
- ❌ Final demo polish

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript, Vite
- **Styling**: Tailwind CSS with glass morphism design
- **UI Components**: Shadcn/UI
- **Routing**: React Router DOM
- **State Management**: React Query + Local Storage
- **Data Persistence**: localStorage (no authentication needed for MVP)

## 📊 MVP Scope Decisions

**INCLUDED in MVP:**
- Complete assessment and matching flow
- AI coaching companion (Love-vee)
- Compatibility intelligence and explanations
- Professional relationship-focused design
- Local data persistence

**EXCLUDED from MVP:**
- User authentication system
- Real-time messaging between matches
- Payment processing
- Advanced matching algorithms
- Multi-device synchronization

## 🚀 Demo Readiness Checklist

- [x] User can complete full assessment journey
- [x] Assessment results are calculated and meaningful
- [x] Matches are generated based on real compatibility data
- [ ] Match details show clear compatibility explanations
- [ ] Users can express interest in matches
- [ ] Love-vee provides contextual relationship advice
- [ ] All error cases are handled gracefully

## 📞 Support & Contact

For technical issues or questions about the MVP, please refer to the development documentation in `/docs/DEVELOPMENT.md`.

## 📄 License

This project is proprietary software designed for serious relationship matching. All rights reserved.

---

*Building meaningful connections through science-based compatibility - MVP Version*
