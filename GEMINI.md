# Faint Signals: Material Design 3 (M3) Documentation

## Project Vision
`faint-signals` is a high-performance, high-density news platform built with Astro. It utilizes **Material Design 3 (M3)** principles while maintaining a bold, energetic, and "live" news aesthetic. The project prioritizes high-contrast typography, content density, and absolute accessibility.

## Design Foundation: Material Design 3

### Typography: Roboto Pairing (Roboto Slab & Roboto Condensed)
The system uses a high-contrast pairing of a sturdy slab serif with a modern condensed sans-serif to achieve a "live" news aesthetic.

- **Fonts in Use**:
  - **Roboto Slab**: Main body text and ledes (variable weight 100-900).
  - **Roboto Condensed**: Display headlines, section titles, and UI labels (variable weight 100-900).
- **Variable Axes**: Both use the `wght` axis for precise weight control.

### Tonal Color System
The color system follows M3 semantic roles, mapped to high-energy news colors:
- **Primary**: Brand Blue (#3B82F6) - Actions and major highlights.
- **Error**: Live Red (#EF4444) - Breaking news and urgency markers.
- **Tertiary**: Success Green (#10B981) - Secondary status and accents.
- **Surface**: High-contrast Black/White backgrounds.
- **Outline**: High-contrast borders for dense layout separation.

## Design Tokens & Utilities
Styles are managed via tokens in `src/styles/design-system.css` and applied through custom Tailwind utilities.

| Role | Utility Class | M3 Token | Usage |
| :--- | :--- | :--- | :--- |
| **Display** | `.m3-display-large` | `display.large` | Massive home titles / Branding |
| **Headline** | `.m3-headline-large` | `headline.large` | Primary article titles |
| **Focus** | `.m3-focus-title` | `focus.title` | High-emphasis sidebar sections |
| **Title** | `.m3-title-large` | `title.large` | Modal headers / Mid-level titles |
| **Body** | `.m3-body-large` | `body.large` | Main long-form article text (17px) |
| **Label** | `.m3-label-medium` | `label.medium` | Metadata (Author, Date, Category) |

## Layout Guidelines
1. **High Density**: Tighten vertical spacing (`mb-6`, `py-4`) but **never** compromise the 48dp touch target rule for interactive elements (`.m3-touch-target`).
2. **Scanning Hygiene**: Article titles should use `BALANCED` text wrapping. Body text uses `m3-body-large` with a `1.6` line height for maximum readability.
3. **Container Strategy**: Prefer high-contrast outlines (`border-2`) over shadows to maintain the "live news" vibe.

## Technical Implementation Notes

### Tailwind CSS 4 Integration
- **Utility Registration**: Custom typography roles and M3 utilities (like `.m3-display-large`) must be defined using the **`@utility`** directive. This allows the Tailwind 4 engine to recognize them for `@apply` and ensures they are properly optimized during the build process.
- **Theme Variable Strategy**: Use `@theme` for design system tokens but prefer custom properties (`--md-sys-*`) for fine-grained control over variable font axes.

### Typography & Legibility
- **Variable Font Axes (Noto Serif)**: Main body text uses `Noto Serif`. For all-caps headlines (if any used), we relax tracking.
- **Variable Font Axes (Roboto Condensed)**: Display headlines and UI elements use `Roboto Condensed`. High weights (700-900) are used for strong visual impact.
- **Responsive Wrapping**: Large editorial titles must use `text-wrap: balance` to distribute words evenly. Combine this with `overflow-wrap: break-word` to prevent horizontal scrolling on small viewports caused by long headlines.

### Layout & Alignment
- **Baseline Symmetry**: When aligning massive display text with smaller labels (e.g., in the Header), use **`items-baseline`** on the flex container. Ensure the large text has a tight `line-height` (e.g., `leading-[0.8]`) to bring the visual baseline into alignment with smaller UI elements.

---
*Note: This documentation is subject to change as the "signals" evolve.*

