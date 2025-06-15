
# LockInOnce - Serious Relationship Matching Platform

LockInOnce is a sophisticated relationship matching platform designed exclusively for individuals seeking deep, lasting love. Built on proven relationship science, our platform uses comprehensive compatibility assessments to create meaningful connections for long-term partnerships.

## 🎯 Project Mission

**For Serious Relationships Only** - No casual dating. We focus on true compatibility for long-term partnerships through science-based matching.

## 🏗️ Project Architecture

### Directory Structure

```
src/
├── components/
│   ├── assessments/
│   │   ├── AttachmentStyleAssessment.tsx     # Attachment style evaluation
│   │   ├── BirthOrderAssessment.tsx          # Family dynamics assessment  
│   │   ├── ValuesAssessment.tsx              # Core values & priorities
│   │   └── ProximityIntimacyAssessment.tsx   # Physical & emotional closeness
│   └── ui/                                   # Shadcn UI components
│       ├── alert.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── progress.tsx
│       └── [other shadcn components...]
├── pages/
│   ├── Index.tsx                             # Landing page
│   ├── Onboarding.tsx                        # Multi-step assessment flow
│   ├── Dashboard.tsx                         # User dashboard
│   └── NotFound.tsx                          # 404 page
├── hooks/
│   ├── use-mobile.tsx                        # Mobile detection
│   └── use-toast.ts                          # Toast notifications
├── lib/
│   └── utils.ts                              # Utility functions
├── App.tsx                                   # Main app component & routing
├── main.tsx                                  # Application entry point
└── index.css                                 # Global styles
```

### Assessment Flow Architecture

The onboarding process consists of 7 carefully designed steps:

1. **Welcome & Introduction** - Platform explanation and expectations
2. **Attachment Style Assessment** - How users connect and handle relationships
3. **Birth Order Assessment** - Family dynamics impact on personality
4. **Values Assessment** - Core values, priorities, and deal breakers
5. **Proximity & Intimacy Assessment** - Physical and emotional closeness preferences
6. **Profile Summary** - Review of all assessment results
7. **Completion** - Ready for matching

### Data Models

#### Assessment Result Types

```typescript
// Attachment Style Results
interface AttachmentStyleResults {
  dominantStyle: 'secure' | 'anxious' | 'avoidant' | 'disorganized';
  scores: {
    secure: number;
    anxious: number;
    avoidant: number;
    disorganized: number;
  };
}

// Birth Order Results  
interface BirthOrderResults {
  birthOrder: 'oldest' | 'middle' | 'youngest' | 'only';
  familySize: number;
  traits: string[];
}

// Values Results
interface ValuesResults {
  coreValues: string[];
  relationshipPriorities: string[];
  dealBreakers: string[];
}

// Proximity & Intimacy Results
interface ProximityIntimacyResults {
  physicalAffection: 'low' | 'moderate' | 'high';
  emotionalIntimacy: 'gradual_opening' | 'quick_connection' | 'deep_sharing';
  communicationStyle: 'direct' | 'gentle' | 'expressive';
  conflictResolution: 'discuss_immediately' | 'cool_down_first' | 'avoid_conflict';
  personalSpace: 'together_time' | 'balanced' | 'independent_time';
  activitySharing: 'separate_interests' | 'some_shared' | 'most_together';
  vulnerabilityComfort: 'gradual' | 'moderate' | 'open_book';
}
```

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI
- **Routing**: React Router DOM
- **State Management**: React Query (TanStack Query)
- **Icons**: Lucide React
- **Charts**: Recharts (for future analytics)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Design System

### Color Scheme
- **Primary**: Sophisticated blues and purples for trust and depth
- **Accent**: Warm gold/amber for highlights and call-to-actions
- **Background**: Clean whites with subtle gradients
- **Glass Effect**: Frosted glass cards for modern, elegant UI

### Typography
- **Headings**: Playfair Display for elegance
- **Body**: System fonts for readability
- **Weights**: Strategic use of font weights for hierarchy

### Components
- Responsive design mobile-first approach
- Consistent spacing using Tailwind's scale
- Accessible color contrasts and focus states
- Smooth transitions and hover effects

## 🧪 Assessment Methodology

### Scientific Foundation

Our compatibility assessments are based on established psychological research:

1. **Attachment Theory** - Bowlby & Ainsworth's attachment styles research
2. **Family Systems Theory** - Birth order impact on personality development  
3. **Values Alignment** - Rokeach's theory of values in relationships
4. **Intimacy Models** - Sternberg's Triangular Theory of Love components

### Scoring & Matching Algorithm

Each assessment generates weighted scores that contribute to overall compatibility:
- Attachment style compatibility matrix
- Complementary birth order pairings
- Values alignment scoring
- Intimacy preference matching

## 📱 Responsive Design

The platform is designed mobile-first with breakpoints:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px+

## 🔒 Privacy & Security

- All assessment data is handled with strict privacy standards
- No casual dating features to maintain serious relationship focus
- Transparent data usage for compatibility matching only

## 🚧 Future Development

### Planned Features
- Advanced matching algorithm implementation
- User dashboard with match recommendations
- Secure messaging system
- Video call integration for verified connections
- Compatibility score detailed breakdowns
- Relationship coaching resources

### Technical Roadmap
- Backend integration with Supabase
- Real-time matching updates
- Advanced analytics dashboard
- Mobile app development
- Enhanced security features

## 📞 Support & Contact

For technical issues or questions about the platform, please refer to the project documentation or contact the development team.

## 📄 License

This project is proprietary software designed for serious relationship matching. All rights reserved.

---

*Built with ❤️ for meaningful connections and lasting love.*
