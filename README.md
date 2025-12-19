# HabitForge

**Habits Forge Who You Become**

> Deployed on GitHub Pages

A premium, minimal habit tracking web application designed to help users build their future self through consistent daily habits across four foundational dimensions.

## 🧬 Core Concept

HabitForge uses the metaphor of DNA to represent habit building. Each habit belongs to one of four "strands" that form the DNA of your future self:

- **Mental** (Indigo) - Mind & focus
- **Physical** (Green) - Body & health  
- **Spiritual** (Purple) - Soul & purpose
- **Financial** (Teal) - Wealth & growth

## ✨ Features

### Core Features
- **Habit Tracking**: Create and track daily habits across four categories
- **Progress Visualization**: DNA helix visualization showing consistency across all dimensions
- **Streak Tracking**: Monitor your consistency with streak counters
- **Progress Analytics**: View daily, weekly, and monthly progress with interactive charts
- **Leaderboards**: Compete globally or within groups
- **Groups**: Create or join groups for accountability and friendly competition
- **Dark Mode**: Fully supported dark theme

### Design Philosophy
- **Apple-inspired**: Clean elegance, subtle animations, generous whitespace
- **Premium Feel**: High-contrast sophistication, luxury restraint
- **Frictionless UX**: Intuitive gestures, content-first layouts, bold yet restrained feedback
- **Performance-focused**: Motivational but not excessively gamified

## 🎨 Design System

### Typography
- Primary: SF Pro Display/Text with Inter fallback
- Font Weights: Bold (headings), Medium/Regular (body)
- Responsive sizing optimized for desktop and mobile

### Colors
```
Mental:    #6366F1 (Indigo)
Physical:  #10B981 (Emerald)
Spiritual: #8B5CF6 (Purple)
Financial: #0D9488 (Teal)

Base:      Slate scale (50-950)
Dark Mode: Deep navy (#0F172A) with elevated cards
```

### Components
- Button (Primary, Secondary, Ghost, Danger)
- Input (with label and error states)
- Progress Ring (Apple Health-style)
- DNA Helix (4-strand visualization)
- Habit Card (with drag-to-reorder, streak badge)
- Category Section (collapsible with progress)
- Modal (Add Habit, Create/Join Group)
- Navigation (Header with dark mode toggle, user menu)
- Footer (Minimal links and copyright)

## 📱 Pages

1. **Landing Page**: Hero with tagline, category overview, CTA
2. **Login/Sign Up**: Centered forms with DNA background pattern
3. **Onboarding Flow**: 4-step guided setup
4. **Habits Dashboard**: Today's habits organized by category
5. **Progress Page**: DNA helix hero, stats cards, tabbed analytics
6. **Leaderboard**: Global and group rankings with score tracking
7. **Groups**: Create/join groups, view group DNA
8. **Settings**: Profile, appearance, notifications, data management
9. **Contact**: Simple contact form

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🌐 Deployment

### GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

#### Setup Instructions

1. **Enable GitHub Pages**:
   - Go to your repository settings on GitHub
   - Navigate to "Pages" in the left sidebar
   - Under "Source", select "GitHub Actions"

2. **Update Repository Name** (if needed):
   - If your repository name is different from "Habit-Forge", update the `base` path in `vite.config.ts`
   - Change `/Habit-Forge/` to match your repository name (e.g., `/your-repo-name/`)

3. **Deploy**:
   - Push to the `main` or `master` branch
   - GitHub Actions will automatically build and deploy your site
   - The workflow will run on every push to the main branch

4. **Access Your Site**:
   - Your site will be available at: `https://yourusername.github.io/Habit-Forge/`
   - Or if using a custom domain, configure it in the Pages settings

#### Manual Deployment

If you prefer to deploy manually:

```bash
# Build the project
npm run build

# The dist folder contains the production build
# You can deploy the contents of the dist folder to any static hosting service
```

## 🛠 Tech Stack

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS v4
- **Animation**: Motion (Framer Motion)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📦 Project Structure

```
src/
├── app/
│   ├── App.tsx                 # Main app component
│   └── components/
│       ├── Button.tsx          # Reusable button component
│       ├── Input.tsx           # Form input component
│       ├── CategoryIcon.tsx    # Category icons and colors
│       ├── ProgressRing.tsx    # Apple Health-style ring
│       ├── DNAHelix.tsx        # DNA visualization
│       ├── Header.tsx          # Navigation header
│       ├── Footer.tsx          # Footer component
│       ├── HabitCard.tsx       # Individual habit card
│       ├── CategorySection.tsx # Category container
│       ├── AddHabitModal.tsx   # Add habit modal
│       ├── LandingPage.tsx     # Public landing
│       ├── LoginPage.tsx       # Login form
│       ├── SignUpPage.tsx      # Sign up form
│       ├── OnboardingFlow.tsx  # Multi-step onboarding
│       ├── HabitsDashboard.tsx # Main habits view
│       ├── ProgressPage.tsx    # Analytics and charts
│       ├── LeaderboardPage.tsx # Rankings
│       ├── GroupsPage.tsx      # Group management
│       ├── SettingsPage.tsx    # User settings
│       └── ContactPage.tsx     # Contact form
└── styles/
    ├── fonts.css               # Font imports
    ├── theme.css               # Design tokens
    └── index.css               # Main stylesheet
```

## 🎯 Roadmap

- [ ] Add backend integration (Supabase)
- [ ] Implement real authentication
- [ ] Add habit reminders/notifications
- [ ] Export data functionality
- [ ] More chart types and insights
- [ ] Habit templates library
- [ ] Social features and sharing
- [ ] Mobile native apps (React Native)

## 📄 License

MIT License - feel free to use this for personal or commercial projects.

## 🙏 Credits

Design inspiration:
- Apple (Health app, SF Pro typography)
- American Express (premium sophistication)
- Robinhood (frictionless UX)
- Whoop (leaderboard aesthetics)

---

**Built with Figma Make** - From design to deployment in minutes.
