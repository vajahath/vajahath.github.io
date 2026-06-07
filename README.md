# Faint Signals [![Deploy to GitHub Pages](https://github.com/vajahath/vajahath.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/vajahath/vajahath.github.io/actions/workflows/deploy.yml)

Welcome to **Faint Signals**, a personal blog for capturing wandering thoughts, late discoveries, and probably wrong takes.

**Live site**: [https://vajahath.github.io/](https://vajahath.github.io/)

> [!NOTE]
> This is a personal blog. Opinions are our own (and often subject to change as we learn more).

Built with a high-density, high-contrast "live news" aesthetic, this platform is a playground for exploring the intersection of technology, design, and erratic signals from the noise.

## 🚀 Getting Started

To get the lab running on your local machine:

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/vajahath/vajahath.github.io.git
    cd vajahath.github.io
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Launch the Workspace**:
    ```bash
    npm run dev
    ```
    Open `http://localhost:4321` to see the transmission.


## 🛠 Internals

`faint-signals` is built for speed and visual impact:

- **Framework**: [Astro 5](https://astro.build/) - Content-first fast site generation.
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) - Utilizing the latest `@utility` engine.
- **Design System**: **Material Design 3 (M3)** - Using semantic tonal palettes and high-density layouts.
- **Typography**: **Roboto Flex** - A universal variable font face that adapts its thickness (`XOPQ`), width (`XTRA`), and optical size (`opsz`) for a punchy broadcast look.
- **High Density**: The UI is optimized for information density without sacrificing touch targets or accessibility.

## 📝 How to Add / Submit a Post

We embrace the open-source spirit. If you have a signal you'd like to amplify, feel free to submit a Pull Request.

### Steps to Participate:
1.  **Navigate to content**: Go to `src/content/blog/`.
2.  **Create a file**: Add a new `.md` or `.mdx` file. The filename becomes the URL slug.
3.  **Add Frontmatter**:
    ```markdown
    ---
    title: "Your Explosive Headline"
    description: "A punchy summary of your take."
    pubDate: "Feb 12 2026"
    heroImage: "../../assets/blog-placeholder-2.jpg"
    tags: ["TECH", "UX"]
    ---

    Your story starts here...
    ```
4.  **Submit**: Open a PR with your changes!

## 👩‍💻 Developer Notes

- **Design Tokens**: Centralized in `src/styles/design-system.css`. Use CSS variables for M3 colors (e.g., `--md-sys-color-primary`).
- **Typography Roles**: Avoid hardcoding font sizes. Use `@apply m3-headline-large` or `@apply m3-body-large`.
- **Responsive Handling**: All headlines use `text-wrap: balance` to ensure visual symmetry on mobile screens.

*Signals are faint. Stay tuned. Built with Antigravity and Gemini*

## 📜 License

This project is licensed under the [MIT License](LICENSE).

