# TerraBT SAP BTP Consulting - Design Guidelines

## Design Approach

**Selected Approach**: Design System - Material Design 3 with Enterprise B2B Customization

**Justification**: B2B consulting requires professional credibility, clear information hierarchy, and conversion optimization. Material Design 3 provides the structure needed for information-dense content while allowing customization for the blue-purple brand identity.

**Key Design Principles**:
1. Mobile-first conversion optimization
2. Professional enterprise credibility
3. Scandinavian minimalism meets technical precision
4. Clear hierarchy guiding to CTAs

## Typography System

**Font Families** (Google Fonts via CDN):
- **Primary**: Inter (headings, UI elements, buttons)
- **Secondary**: Inter (body text, descriptions)

**Type Scale**:
- Hero Headline: 3.5rem/4rem (mobile: 2.25rem), weight 700, letter-spacing -0.02em
- Section Headline: 2.5rem/3rem (mobile: 1.875rem), weight 700
- Subsection: 1.5rem/2rem (mobile: 1.25rem), weight 600
- Body Large: 1.125rem, weight 400, line-height 1.75
- Body Regular: 1rem, weight 400, line-height 1.65
- Small/Caption: 0.875rem, weight 500, line-height 1.5
- Button Text: 1rem, weight 600, letter-spacing 0.01em

## Layout System

**Spacing Primitives** (Tailwind units): 2, 4, 6, 8, 12, 16, 20, 24

**Standard spacing patterns**:
- Component internal padding: p-4 (mobile), p-6 to p-8 (desktop)
- Section vertical spacing: py-12 (mobile), py-20 (tablet), py-24 (desktop)
- Grid gaps: gap-4 (mobile), gap-6 to gap-8 (desktop)
- Container padding: px-4 (mobile), px-6 (tablet), px-8 (desktop)

**Containers**:
- Max-width: max-w-7xl for main content
- Max-width: max-w-4xl for text-heavy sections
- Full-width sections with inner containers

**Grid System**:
- Mobile: Single column (grid-cols-1)
- Tablet: 2 columns for cards (md:grid-cols-2)
- Desktop: 3-4 columns for expertise cards (lg:grid-cols-3, lg:grid-cols-4)

## Page Structure & Sections

### 1. Hero Section (Above the Fold - Critical for Google Ads)
- Height: 85vh on mobile, 90vh on desktop
- Layout: Centered content with background gradient treatment
- Elements:
  - Pre-headline badge: "SAP BTP Specialized Consulting"
  - Primary headline (2 lines maximum)
  - Supporting subheadline (1-2 sentences)
  - Dual CTA buttons (Primary: "Get Started" / Secondary: "View Services")
  - Trust indicators below CTAs: "Serving 40+ Countries" + "100% SAP BTP Focused"
- Mobile optimization: Stack vertically, larger touch targets (min-h-12 for buttons)

### 2. Social Proof Band
- Height: Auto, py-8
- Layout: Horizontal scroll on mobile, grid on desktop
- Elements: 6-8 client logos or certification badges, grayscale with hover effect

### 3. Expertise/Services Grid
- Layout: 2x4 grid (mobile: 1 column, tablet: 2 columns, desktop: 4 columns)
- Card structure per expertise area:
  - Icon container (h-12 w-12)
  - Service title (font-semibold, text-lg)
  - 2-3 sentence description
  - Subtle hover elevation effect
- All 8 expertise areas: Fiori App Development, BTP Architecture & Design, Design Thinking, Offline PWA Apps, Database Management, Claude AI Invoice Processing, Integration Suite, Event Mesh

### 4. Value Proposition Section
- Layout: 2-column alternating (image-text, text-image pattern)
- 3 key differentiators:
  - "100% SAP BTP Focus" 
  - "Global Reach, Local Expertise"
  - "Modern Technology Integration (AI, PWA)"
- Each with icon, headline, paragraph, supporting bullet points

### 5. Knowledge/Blog Section
- Section headline: "Knowledge Hub"
- Layout: 3-column grid (mobile: 1 column, tablet: 2, desktop: 3)
- 6 blog post cards with:
  - Featured image placeholder (16:9 aspect ratio)
  - Category tag
  - Article title (2 lines max, text-xl font-semibold)
  - Excerpt (3 lines, text-sm)
  - Read time estimate
  - "Read More" link
- CTA: "View All Articles" button centered below grid

### 6. Geographic Reach Section
- Interactive world map visualization or region cards
- Headline: "Serving SAP BTP Markets Worldwide"
- 3-4 region highlights in card format
- Emphasis on underserved markets messaging

### 7. Contact/CTA Section
- Background: Gradient panel treatment
- Layout: 2-column (mobile: stacked)
- Left: Contact form (Name, Email, Company, Message, Submit CTA)
- Right: 
  - Contact information
  - Response time promise
  - Alternative contact methods
- Form optimization: Minimal fields, large inputs, clear labels, prominent submit button

### 8. Footer
- 4-column layout (mobile: stacked)
  - Column 1: Logo + tagline
  - Column 2: Services quick links
  - Column 3: Knowledge/Resources
  - Column 4: Contact + Social links
- Newsletter signup inline
- Copyright + "Deployed on Cloudflare" badge

## Component Library

### Navigation
- Mobile: Hamburger menu (right-aligned), slide-in drawer
- Desktop: Horizontal nav (Logo left, Links center, CTA button right)
- Sticky on scroll with backdrop blur
- Links: Home, Services, Knowledge, About, Contact
- Primary CTA button in nav: "Schedule Consultation"

### Buttons
**Primary CTA**: px-8 py-3 (mobile: py-4), rounded-lg, font-semibold, w-full on mobile
**Secondary CTA**: px-6 py-3, border-2, rounded-lg, font-semibold
**Text Links**: Underline offset, font-medium, hover state

### Cards
**Service Cards**: p-6, rounded-xl, border treatment, hover shadow elevation
**Blog Cards**: Overflow hidden, rounded-xl, image + content padding p-6
**Stat Cards**: Centered content, p-8, large number display, label below

### Forms
- Input fields: h-12, px-4, rounded-lg, border, focus ring treatment
- Textarea: min-h-32, px-4 py-3
- Labels: font-medium, mb-2, text-sm
- Submit button: w-full on mobile, auto on desktop, h-12 minimum

### Icons
**Library**: Heroicons (via CDN)
**Usage**:
- Service cards: 24x24px
- Navigation: 20x20px  
- Footer social: 20x20px
- Feature highlights: 32x32px

## Images

**Hero Section**: 
- Full-width background image showing modern office/technology environment with subtle overlay
- Alternative: Abstract geometric pattern representing SAP BTP architecture/connectivity
- Dimensions: 1920x1080, optimized WebP format

**Value Proposition Images**: 
- 3 supporting images (600x400):
  - Image 1: Team collaboration/consulting scene
  - Image 2: Global connectivity/world map visualization
  - Image 3: Modern technology stack/AI integration concept

**Blog Post Featured Images**: 
- 6 placeholder images (800x450) representing SAP BTP topics
- Technical yet approachable aesthetic

**Image Treatment**: All images should have subtle gradient overlays when text overlays are present, ensuring WCAG contrast compliance

## Accessibility

- Minimum touch target: 44x44px (mobile)
- Focus indicators on all interactive elements (2px ring offset)
- Form labels always visible (no placeholder-only inputs)
- Semantic HTML structure (nav, main, section, article)
- Skip to content link
- Alt text for all images
- ARIA labels for icon-only buttons

## Performance Optimization (Cloudflare Deployment)

- Lazy load all images below fold
- Inline critical CSS for above-fold content
- Defer non-critical JavaScript
- Use WebP for all images with fallbacks
- Minified HTML/CSS/JS
- Leverage Cloudflare CDN caching headers

## Mobile-First Breakpoints

- Mobile: 0-767px (base styles)
- Tablet: 768-1023px (md:)
- Desktop: 1024px+ (lg:)
- Large Desktop: 1280px+ (xl:)

## Animation & Interactions

**Minimal, purposeful animations only**:
- Scroll-triggered fade-in for sections (subtle, fast)
- Hover elevation on cards (transform translateY)
- Button hover states (built-in)
- Navigation menu slide-in (mobile)
- No parallax, no excessive motion