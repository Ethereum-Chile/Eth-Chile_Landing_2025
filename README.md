# ETH Chile 2025 Landing Page

A modern, responsive landing page for ETH Chile 2025, Latin America's premier Ethereum event. Built with Astro, React, and TypeScript.

## Features

- Responsive design optimized for all devices
- Interactive sponsorship tiers with progressive blur effects and hover animations
- Animated testimonials from the ETH Chile team with auto-playing carousel
- Modern UI with Framer Motion and GSAP animations
- 3D graphics and visual effects with Three.js
- Web3 wallet integration with Privy authentication
- SEO optimized with OpenGraph metadata
- Performance optimized with Astro's static site generation
- Custom scroll animations and parallax effects
- Magnetic hover effects and interactive cards

## Tech Stack

- **Framework**: Astro 4.0
- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS 3.3
- **Animations**: Framer Motion, GSAP, Custom CSS animations
- **3D Graphics**: Three.js with PostProcessing
- **Authentication**: Privy React Auth
- **UI Components**: Radix UI, Flowbite
- **Fonts**: Open Sans Variable, Raleway Variable
- **Deployment**: Vercel

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Build for production: `npm run build`

## Project Structure

- `src/components/` - React and Astro components
- `src/pages/` - Astro pages and routes
- `src/layouts/` - Astro layout components
- `src/utils/` - Utility functions and helpers
- `src/lib/` - Library configurations and shared code
- `src/assets/` - Static assets and images
- `public/` - Public static files
- `src/icons/` - Icon components and assets

## Deployment Strategy

### Branch Management

This project uses a two-branch strategy for development and deployment:

- **`main`**: Development branch for active development and testing
  - All new features, bug fixes, and improvements are developed here
  - Does NOT trigger Vercel deployments
  - Used for code review and testing before production

- **`prod`**: Production deployment branch
  - Contains the latest stable version of the application
  - ONLY branch that triggers Vercel deployments
  - Automatically updated from `main` when ready for production

### Deployment Workflow

1. **Development**: Work on features in the `main` branch
2. **Testing**: Test changes locally and in development environment
3. **Production Update**: Merge `main` into `prod` branch
4. **Deployment**: Vercel automatically deploys from `prod` branch
5. **Sync**: Keep both branches in sync by regularly updating `prod`

### Vercel Configuration

The project includes a `vercel.json` configuration that ensures:
- Only the `prod` branch triggers deployments
- `main` branch changes do not affect production
- Consistent build and deployment settings

## Sponsorship Tiers

The landing page features an interactive sponsorship section with:

- Progressive blur effects on hover
- Dynamic tier information display
- Responsive card layouts
- Smooth hover animations

## Team Section

Showcases the ETH Chile team with:

- Animated testimonials
- Professional headshots
- Role descriptions
- Auto-playing carousel

## Contributing

This project is maintained by the ETH Chile team. For questions or contributions, please contact the development team.

## License

All rights reserved. ETH Chile 2025.
