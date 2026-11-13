# Chamar Williams: Portfolio

![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs)
![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MDX](https://img.shields.io/badge/MDX-1B1F24?style=for-the-badge&logo=mdx)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222222?style=for-the-badge&logo=github)
![License](https://img.shields.io/badge/License-CC_BY--SA_4.0-lightgrey?style=for-the-badge)

A static portfolio for multiplayer netcode, developer tools and AI evaluation work. Every project page has an interactive demo you can use.

**Live site:** https://chamarwilliams.dev

---

## Architecture Overview

```text
        +-------------------------------------------+
        |  MDX project pages + content.js / config.js|
        +---------------------+---------------------+
                              |
                              | next build (static export)
                              v
        +-------------------------------------------+
        |  ./out static site                         |
        |  pages + public/demos (plain HTML/CSS/JS)  |
        +---------------------+---------------------+
                              |
                              | GitHub Actions
                              v
        +-------------------------------------------+
        |  GitHub Pages at chamarwilliams.dev        |
        +-------------------------------------------+
```

Content lives in data files and MDX, so adding a project means adding one file. Demos are self-contained pages embedded into the write-ups.

---

## Projects Featured

| Project | Focus |
| :--- | :--- |
| **Aspirer's Workshop** | Roblox sword combat and netcode: attacker-favoring hit rewind and ping-compensated parries |
| **Trefelle** | Browser-only practice space with bring-your-own-key AI and in-browser code execution |
| **Arboryn** | Local-first three-way merge engine for Roblox object trees, in Phase 0 |
| **VLM Image-Pair Judge** | Rubric-driven judging of AI-generated image pairs with vision-language models |

---

## Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js 14, React 18 | Routing and static export |
| **Template** | [Magic Portfolio](https://github.com/once-ui-system/magic-portfolio) (Once UI) | Layout and components |
| **Content** | MDX, `gray-matter` | Project write-ups |
| **Styling** | SCSS, PostCSS | Theme and effects |
| **Demos** | Plain HTML, CSS and JS | Embedded interactive explanations |
| **Deploy** | GitHub Actions, GitHub Pages | Build on push to `main` |

---

## Quickstart

```bash
git clone https://github.com/ChamarWilliams/personal-website.git
cd personal-website
npm install
npm run dev      # local preview at http://localhost:3000
npm run build    # static export to ./out
```

---

## Where Things Live

```text
src/app/resources/content.js    Site text and links
src/app/resources/config.js     Colors and effects
src/app/work/projects/*.mdx     One file per project page
public/demos/                   Interactive demos embedded in project pages
public/assets/                  Resume PDF
.github/workflows/deploy.yml    Pages deployment
```

To add a project, create an `.mdx` file in `src/app/work/projects/` with `title`, `publishedAt`, `summary`, `images`, `category` and `tags` in its front matter.

---

## License

Released under the [CC BY-SA 4.0 License](LICENSE). The template is by the Once UI team and keeps its own license terms.
