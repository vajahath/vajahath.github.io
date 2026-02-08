# **Material Design 3 (M3) Specification: High-Density News Platform**

**Target Audience:** AI Agent / Design System Architect

**Project Context:** High-energy, content-dense news & blog platform.

**Objective:** Create a design system that balances high information density with strict accessibility and Material You personalization.

## **1\. Accessibility (Paramount & Non-Negotiable)**

*The density of a news site must never compromise the ability to interact with it.*

### **1.1 Touch Targets**

* **The 48dp Rule:** All interactive elements (buttons, icons, links, chips) must have a touch target size of at least **48x48dp**, regardless of their visual size.  
* **Exception Handling:** If a visual icon is 24dp, you must apply padding to extend the hit area to 48dp.  
* **Spacing:** Maintain a minimum of **8dp** separation between distinct touch targets to prevent "fat finger" errors.

### **1.2 Visual Contrast (WCAG 2.1 AA)**

* **Standard Text (\< 18pt):** Must maintain a **4.5:1** contrast ratio against its background.  
* **Large Text (≥ 18pt) & Graphics:** Must maintain a **3:1** contrast ratio.  
* **System Token Enforcement:** Use md.sys.color.on-surface for primary text and md.sys.color.surface for backgrounds. The token system is mathematically calculated to meet these ratios; do not manually override hex codes.

### **1.3 Assistive Structure**

* **Landmarks:** Explicitly label regions (\<nav\>, \<main\>, \<aside\>, \<footer\>) to allow screen readers to jump over dense navigation links to the main content.  
* **Headings:** Use H1-H6 strictly for hierarchy, not sizing. The blog title is H1; Section headers are H2.  
* **Alt Text:** All news images require descriptive alt text. Decorative layout images must use alt="".

## **2\. Design Tokens (The DNA)**

*The system acts as a variable map. The Agent must generate code using TOKENS, not hardcoded values.*

### **2.1 Token Hierarchy**

1. **Reference Tokens:** Primitive values (e.g., \#6750A4). **Do not use directly.**  
2. **System Tokens:** Semantic decisions (e.g., md.sys.color.primary). **USE THESE.**  
3. **Component Tokens:** Specific overrides (e.g., md.comp.fab.container.color).

### **2.2 Naming Convention**

Follow this structure: {system}.{category}.{concept}.{property}

* **Correct:** md.sys.color.primary.main  
* **Incorrect:** \#FF0000 or red-500

### **2.3 Typography Tokens (Detailed Scale)**

*Implement the full 15-point type scale. Use "Emphasized" tokens (font-weight 500/700) for contrast without size changes.*

**Naming Pattern:** md.sys.typescale.{role}.{size}

| Role | Size | Token | Specs (Size / Line Height) | Usage Context in News Site |
| :---- | :---- | :---- | :---- | :---- |
| **Display** | Large | display.large | 57sp / 64dp | Homepage Feature / Hero Section (Use sparingly) |
|  | Medium | display.medium | 45sp / 52dp | Category Landing Pages |
|  | Small | display.small | 36sp / 44dp | Breaking News Banner |
| **Headline** | Large | headline.large | 32sp / 40dp | **Primary Article Title (H1)** |
|  | Medium | headline.medium | 28sp / 36dp | Sub-feature Titles |
|  | Small | headline.small | 24sp / 32dp | Section Headers (H2) |
| **Title** | Large | title.large | 22sp / 28dp | H3 / Modal Titles / Dialog Headers |
|  | Medium | title.medium | 16sp / 24dp | Card Titles / Widget Headers (Medium Emphasis) |
|  | Small | title.small | 14sp / 20dp | Subtitles / List Group Headers |
| **Body** | Large | body.large | 16sp / 24dp | **Main Article Text** (Optimized for long-form reading) |
|  | Medium | body.medium | 14sp / 20dp | Feed Snippets / Summaries / Secondary text |
|  | Small | body.small | 12sp / 16dp | Legal / Copyright / Footnotes (Avoid for content) |
| **Label** | Large | label.large | 14sp / 20dp | Call-to-Action Buttons / Tabs (Caps allowed) |
|  | Medium | label.medium | 12sp / 16dp | **Metadata** (Author, Date, Read Time) / Chips |
|  | Small | label.small | 11sp / 16dp | Captions / Tiny Tags / Over-image text |

**Note on Weight:**

* Standard tokens use Regular (400) weight.  
* **Emphasized** tokens (e.g., body.large.emphasized) use Medium (500) or Bold (700). Use these for bolded keywords within the text or selected states in navigation.

## **3\. Layout & Density**

*High energy content requires a structured grid to prevent chaos.*

### **3.1 Canonical Layouts**

Implement these standard M3 layouts adapted for news:

1. **Feed (Mobile/Compact):** A vertical stream of cards. Use "List" or "Image" cards.  
2. **List-Detail (Tablet/Medium):** Left pane shows the article list; Right pane shows the full article content.  
3. **Supporting Pane (Desktop/Expanded):** Main content takes 66% width; Sidebar (Trending, Ads, Related) takes 33%.

### **3.2 Applying Density**

* **Concept:** "Density" in M3 means tightening vertical spacing (padding/margins) to show more content, *without* shrinking text size or touch targets.  
* **Scale:** 0 (Default), \-1 (Compact), \-2 (High Density).  
* **Action:** For lists and data tables (e.g., stock tickers, latest headlines), use Density \-1 or \-2.  
  * *Example:* Standard List Item height \= 56dp. Density \-1 height \= 48dp.  
* **Grid System:**  
  * **Compact (\< 600dp):** 4 Columns. Margin 16dp. Gutter 16dp.  
  * **Medium (600-840dp):** 8 Columns. Margin 24dp. Gutter 24dp.  
  * **Expanded (\> 840dp):** 12 Columns. Margin 24dp. Gutter 24dp. max-width 1200dp (centered).

## **4\. Color System (Material You)**

*Enable dynamic personalization while maintaining news readability.*

### **4.1 Key Roles**

* **Primary:** High emphasis (Subscribe buttons, Breaking News tags).  
* **Secondary:** Medium emphasis (Filter chips, Section headers).  
* **Tertiary:** Accents (Links within text, charts).  
* **Surface:** The "paper" of the blog.  
* **Outline:** Critical for dense layouts. Use md.sys.color.outline to separate cards without heavy shadows.

### **4.2 Dynamic Logic**

* **Source:** The system must accept a single "Seed Color."  
* **Generation:** Algorithmically generate 5 tonal palettes (0 to 100 lightness).  
* **Theme Mode:** Automatically map tokens for Light and Dark modes.  
  * *Light Mode:* Uses Tones 40 (Primary) and 100 (Surface).  
  * *Dark Mode:* Uses Tones 80 (Primary) and 10 (Surface).

## **5\. Content Design**

*Writing for scanning.*

* **Front-Loading:** Place crucial keywords at the start of headlines.  
* **Scannability:** Use Body Large (16sp) for main articles. Limit line length to **60 characters** (approx. 600dp max-width) to reduce eye fatigue.  
* **Microcopy:** Avoid "Click Here." Use descriptive actions like "Read Analysis" or "View Gallery."

## **6\. Glossary (Agent Vocabulary)**

*Ensure the AI Agent correctly interprets these specific M3 terms:*

* **Affordance:** Visual cues (shadow, border, color change) that tell a user "I am clickable."  
* **Container:** A closed shape (Card, Dialog). In dense sites, prefer **Outlined** or **Filled (Low Elevation)** containers over high-shadow containers to reduce visual noise.  
* **Elevation:** Depth along the Z-axis.  
  * *Level 0:* Background/Surface.  
  * *Level 1:* Standard Cards.  
  * *Level 3:* Sticky Navigation / Top App Bar.  
* **Scrim:** A darkened overlay behind a modal/dialog that de-emphasizes the background content.  
* **State Layer:** A semi-transparent overlay (8-12% opacity) indicating interaction status (Hover, Focus, Press, Drag).  
* **Surface Tones:** Variations of the background color (Surface 1 through Surface 5\) used to distinguish component groups without adding borders.