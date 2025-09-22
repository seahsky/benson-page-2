# Hero Logo Animation - Context

**Task**: Make the right part (the logo) at the hero section interactive with hover and drag animation. Leverage anime.js to achieve the animated visual effect.

**Repo path**: /Users/kyseah/Documents/GitHub/benson-page-2
**Desired parallelism**: 2 (1 for anime.js integration, 1 for interaction handlers)
**Target Score**: 90

## Project Context
- **Tech Stack**: React 18 + shadcn/ui + Tailwind CSS + Vite
- **Deployment**: Wix Platform Compatible
- **Performance Requirements**: <500KB bundle, <2.5s LCP
- **Current Hero Section**: Located in src/components/sections/ (needs analysis)

## Requirements
1. **Interactive Logo**: Logo should respond to hover states
2. **Drag Animation**: Logo should be draggable with smooth animations
3. **anime.js Integration**: Use anime.js library for smooth animations
4. **Performance**: Must not impact Core Web Vitals
5. **Responsive**: Work across all breakpoints
6. **Accessibility**: Maintain accessibility standards

## Technical Constraints
- Must work with existing shadcn/ui components
- Bundle size impact should be minimal
- Compatible with Wix deployment requirements
- No breaking changes to existing hero section functionality

## Success Criteria
- Smooth hover animations (scale, rotation, or glow effects)
- Intuitive drag behavior with physics-based animations
- No performance degradation
- Cross-browser compatibility
- Responsive behavior on mobile devices

## Files to Analyze/Modify
- src/components/sections/ (hero section components)
- package.json (for anime.js dependency)
- Existing logo implementation
- Animation utilities/hooks if any exist