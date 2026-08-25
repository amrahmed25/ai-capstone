# Week 04 — Three Roads: Choosing My Stack

## 1. My Constraints

Before choosing the stack, I gave AI the real constraints of my portfolio.

### Budget

**Free only.**

I want to build and host the portfolio without paying for hosting, a domain, or backend infrastructure.

### My Current Skill Level

I am a **Frontend Developer** with practical experience in:

* HTML
* CSS
* JavaScript
* TypeScript
* React.js
* Tailwind CSS
* Bootstrap

I am comfortable building responsive interfaces and React applications, but I want to avoid unnecessary backend complexity for this portfolio.

### What My Portfolio Needs to Do

The portfolio needs to:

* Introduce me as a frontend developer.
* Present my strongest projects.
* Show real project screenshots.
* Provide live demo links.
* Link to GitHub repositories.
* Explain projects through case studies.
* Show my skills and technologies.
* Provide a clear way for potential clients or recruiters to contact me.

### How My Work Must Be Displayed

My projects need:

* Image galleries and screenshots.
* Project descriptions and case studies.
* Live demo links.
* GitHub repository links.
* Responsive presentation.
* Long-form project information when necessary.

### Dynamic Requirements

**No backend is required yet.**

The portfolio content can initially be static. A contact form can use a third-party service or mail link instead of requiring my own backend.

---

# 2. Three Stack Options

## Option 1 — Simplest: HTML + CSS + JavaScript

### How I Would Build It

I would create the portfolio using plain HTML, CSS, and JavaScript, then organize the pages and project content manually.

### Free Hosting

**GitHub Pages**

### Backend

**No backend required.**

### Advantages

* Very simple.
* Completely free.
* Fast and lightweight.
* Easy to deploy.
* Very little maintenance.

### Trade-off

Managing a larger portfolio manually would become less convenient. Reusable components and repeated project structures would require more manual work.

---

# Option 2 — Balanced: React + Vite + Tailwind CSS

### How I Would Build It

I would build the portfolio as a React application using Vite, with reusable components for projects, sections, navigation, and case studies.

### Free Hosting

**Vercel**

### Backend

**No backend required.**

### Advantages

* Matches my current frontend skills.
* Reusable React components make the portfolio easier to maintain.
* Easy to create project cards, galleries, animations, and case studies.
* Good performance.
* Easy deployment through GitHub and Vercel.
* Gives me enough flexibility without unnecessary complexity.

### Trade-off

It is more complex than plain HTML/CSS/JavaScript and requires maintaining dependencies and the React project structure.

---

# Option 3 — Most Powerful: Next.js + TypeScript + Tailwind CSS

### How I Would Build It

I would use Next.js with TypeScript and Tailwind CSS to build a more advanced portfolio with dynamic routing, optimized images, metadata, and potentially server-side functionality.

### Free Hosting

**Vercel**

### Backend

**Not required initially**, although Next.js could support server-side functionality and API routes later.

### Advantages

* More powerful architecture.
* Excellent support for SEO and routing.
* Dynamic project pages are easier to organize.
* Image optimization and performance features.
* Easier path toward adding backend/server functionality later.

### Trade-off

It introduces more concepts and configuration than I currently need. It would also create more things to maintain while the portfolio itself does not require backend functionality.

---

# 3. Pressure Test

## What Breaks If I Pick the Simplest Option?

If I choose plain HTML/CSS/JavaScript, nothing important would break.

The main problem would be **maintainability**.

As I add more projects and case studies, I would have more repeated HTML structures and more manual updates. This is manageable for a small portfolio but less convenient as it grows.

---

## What Would I Maintain If I Pick the Most Powerful Option?

With Next.js, I would need to maintain:

* More framework concepts.
* More project configuration.
* Dependencies.
* Routing structure.
* Potential server-side functionality.
* A more complex architecture than the portfolio actually needs.

The additional power would be useful, but much of it would not provide enough value for the first version of my portfolio.

---

## Can I Finish It in Two Weeks?

### HTML/CSS/JavaScript

**Yes.**

### React + Vite

**Yes.**

### Next.js

**Yes, but with more unnecessary complexity and a higher risk of spending time on architecture instead of the actual portfolio.**

The React + Vite option gives me the best balance between speed and quality.

---

## Does It Show My Work Well?

**Yes.**

React gives me everything I need to display:

* Project screenshots.
* Image galleries.
* Case studies.
* Live demos.
* GitHub links.
* Responsive layouts.
* Interactive UI.
* Reusable project components.

There is no need for a backend just to display this content.

---

# 4. My Decision

## Chosen Stack

**React.js + Vite + Tailwind CSS + Vercel**

I chose React with Vite because it matches my current skills and the kind of work I want to show. My portfolio is mainly about demonstrating frontend development, so I want the technology behind it to reflect the skills I actually use.

React also makes it easy for me to create reusable components and keep multiple project sections consistent.

I will use Vercel for free hosting and GitHub for version control.

**Backend: Not yet.**

I don't need a custom backend because the portfolio content is mostly static. If I need a contact form, I can use a third-party form service or another simple solution instead of building a backend that I don't currently need.

---

# 5. Why I Didn't Choose the Other Two

### Why not HTML + CSS + JavaScript?

It would be the simplest option and completely sufficient technically, but React is a better fit for my current skills and will make the portfolio easier to scale and maintain as I add more projects.

### Why not Next.js?

Next.js is more powerful, but I don't currently need its additional capabilities. My portfolio does not require server-side functionality or a backend.

Using it now would add complexity without enough practical benefit.

---

# 6. Final Rationale

I chose **React + Vite + Tailwind CSS hosted on Vercel** because it is free, matches my current skill level, and gives me enough flexibility to present my work professionally.

Most importantly, **I can maintain this stack myself**. I understand the technologies I'm using, and I can update projects, screenshots, case studies, and links without introducing unnecessary complexity.

It also shows my work well because React gives me the flexibility to build clean project galleries, detailed case studies, responsive layouts, and interactive sections.

For this portfolio, I don't need a backend yet. I would rather keep the architecture simple and focus my time on presenting strong evidence of my frontend skills.
