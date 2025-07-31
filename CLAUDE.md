# Portfolio Website Project

## Project Overview
This is a modern React portfolio website built with Next.js, featuring a dark space theme with interactive 3D elements and immersive user experiences. The site showcases a developer's work through various interactive components including a 3D globe, animated elements, and an innovative scrap book feature.

## Tech Stack
- **Framework**: Next.js (React 18+)
- **Styling**: Tailwind CSS
- **3D Graphics**: React Three Fiber v8.16.8 + Three.js
- **TypeScript**: Full TypeScript support
- **Icons**: SVG icons and React Icons (FaLocationArrow)
- **Animations**: CSS animations with Tailwind classes

## Key Features

### 1. Interactive 3D Globe (`/src/components/Globe.tsx`)
- **Technology**: React Three Fiber with Three.js
- **Lighting System**: Camera-responsive lighting that reacts to user input and auto-rotates
- **Material Properties**: Enhanced colors with deeper greens/blues for realistic earth appearance
- **Controls**: OrbitControls with momentum and damping for smooth interaction
- **Loading**: Proper loading sequence with SSR handling
- **Performance**: Optimized with consistent initial positioning to prevent "skip" effects

### 2. Hero Section (`/src/sections/Hero.tsx`)
- **Theme**: Dark space background with cosmic elements
- **Background**: Space.png image with gradient overlay blending
- **Orbital Elements**: Animated stars and sparkles with cosmic colors (purple, cyan, emerald, blue)
- **Text Animations**: Staggered animation timing (title: no delay, description: 200ms, button: 500ms, badge: 700ms)
- **Layout**: Content positioned to left side with availability badge in top-left corner
- **Globe Integration**: Centered 3D globe with expanded touch area (700px x 700px)

### 3. Interactive Scrap Book (`/src/components/ScrapBook.tsx`)
- **Location**: About section, first bento card
- **Functionality**: Click-to-navigate through 8 curated images
- **Images**: Mix of memoji avatars, project screenshots, and personal moments
- **UX**: Title visible initially, fades out after first click for immersive viewing
- **Navigation**: Dot indicators and smooth transitions (500ms fade + scale effects)
- **Styling**: Full-card image coverage with subtle overlay text
- **Content**: Each image has descriptive captions

### 4. Bento Grid System (`/src/sections/About.tsx`)
- **Interactive Lighting**: Mouse-tracking spotlight effect on bento cards
- **Components**: 
  - ScrapBook (regular card with disabled lighting effect)
  - My Toolbox (BentoCard with animated scrolling tech icons)
  - Map Location (BentoCard with dynamic map component)
  - Beyond the Code (placeholder for future GitHub stats)

### 5. Mouse Lighting Effects (`/src/components/BentoCard.tsx`)
- **Technology**: CSS custom properties (--mouse-x, --mouse-y) + JavaScript
- **Effect**: Radial gradient spotlight that follows mouse movement
- **Implementation**: Mouse event tracking on bento container with real-time CSS property updates
- **Styling**: Cards are dark by default, illuminate on mouse proximity

## Component Architecture

### Core Components
- `Globe.tsx` - 3D earth with responsive lighting system
- `ScrapBook.tsx` - Interactive image gallery with fade transitions
- `BentoCard.tsx` - Interactive card with mouse lighting effects
- `HeroOrbit.tsx` - Animated orbital elements for hero section
- `MagicButton.tsx` - Styled call-to-action button
- `LoadingScreen.tsx` - Smooth loading transition

### Layout Components
- `Hero.tsx` - Main landing section with 3D globe
- `About.tsx` - Bento grid layout with interactive cards
- `SectionHeader.tsx` - Consistent section titles and descriptions

## Styling Guidelines

### Theme Colors
- **Primary**: Dark space theme with black backgrounds
- **Accents**: White text with various opacity levels
- **Orbital Elements**: Cosmic colors (purple-400, cyan-300, emerald-400, blue-400, yellow-200)
- **Interactive**: White lighting effects with subtle opacity

### Animation Patterns
- **Loading**: Staggered text animations (translate-y + opacity)
- **Transitions**: 300-500ms durations for smooth interactions
- **Hover States**: Scale transformations (1.02-1.05) with opacity changes
- **3D Elements**: Momentum-based rotation with damping

## Development Notes

### Performance Optimizations
- **Globe**: Preloaded FBX models and optimized textures
- **Images**: Next.js Image component with proper sizing
- **3D Rendering**: Optimized frameloop and performance settings
- **SSR**: Proper client-side rendering for 3D components

### Key Technical Decisions
1. **Mouse Lighting**: Implemented with CSS custom properties for better performance than React state
2. **Globe Loading**: Delayed visibility to prevent position jumping during initialization
3. **ScrapBook Padding**: Override BentoCard padding using `[&>.card-content]:p-0` for full coverage
4. **Lighting Disable**: ScrapBook uses `before:!opacity-0` to disable mouse lighting for immersion

### Build Commands
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run lint` - ESLint checking
- `npm run typecheck` - TypeScript validation

## File Structure
```
src/
├── components/
│   ├── Globe.tsx (3D earth component)
│   ├── ScrapBook.tsx (interactive image gallery)
│   ├── BentoCard.tsx (mouse lighting effects)
│   ├── HeroOrbit.tsx (animated orbital elements)
│   └── ...
├── sections/
│   ├── Hero.tsx (main landing with globe)
│   ├── About.tsx (bento grid layout)
│   └── ...
├── assets/
│   ├── images/ (memoji avatars, project screenshots)
│   ├── icons/ (SVG icon components)
│   └── ...
└── lib/
    └── utils.ts (utility functions)
```

## Future Enhancements
- GitHub stats integration for "Beyond the Code" card
- Additional scrapbook images
- Mobile responsiveness improvements
- Performance monitoring
- Analytics integration

## Troubleshooting

### Common Issues
1. **Globe not loading**: Check FBX model paths and preloading
2. **Mouse lighting not working**: Verify bento container ID and event listeners
3. **ScrapBook padding**: Ensure BentoCard padding override is applied
4. **Build errors**: Run TypeScript check and fix any type issues

### Browser Compatibility
- Modern browsers with WebGL support required for 3D features
- Tested on Chrome, Firefox, Safari
- Mobile touch interactions optimized for globe controls