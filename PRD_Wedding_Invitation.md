---

## Product Requirements Document (PRD): Personalized Wedding Invitation

### 1. Objective

To develop a minimal, classic, single-page wedding invitation web application. The core hook is immediate user personalization: capturing the guest's name upon entry and dynamically weaving it throughout the site’s narrative. The experience must be completely driven by smooth, cinematic scroll animations.

### 2. Target Audience

Wedding guests accessing the invitation primarily via mobile devices, with full compatibility for desktop viewing.

### 3. Recommended Tech Stack (2026 Standards)

To achieve the exact fluid animations and clean architecture you are looking for, here are the industry-standard tools your developer (or you) should use:

| Component | Recommended Technology | Rationale |
| --- | --- | --- |
| **Framework** | Next.js (React) or Vite | The standard for fast, state-driven, single-page applications. Perfect for managing the "Guest Name" dynamically across the site. |
| **Styling** | Tailwind CSS v4 | Utility-first styling for rapid, clean, and highly responsive mobile-first layouts without heavy CSS files. |
| **Scroll Engine** | Lenis | The absolute industry standard in 2026 for hijacking native scroll and turning it into a silky-smooth momentum scroll experience. |
| **Animations** | GSAP (ScrollTrigger) | Unmatched performance for pinning sections, sliding photos on scroll, and fading in your timeline elements. |
| **UI Transitions** | Motion (formerly Framer Motion) | Ideal for handling the initial popup modal fade-out and simple layout transitions. |
| **Particle Effects** | tsParticles | A lightweight canvas renderer to generate the slowly flowing flower petals without causing the scrolling to lag. |

### 4. User Flow & Core Sections

* **The Entry Gate (Popup):** A full-screen, elegantly blurred overlay immediately prompts the user: "Who do we have the honor of inviting?". Contains a single text input and a submit button.
* **Dynamic Personalization State:** Once the name is submitted, it is saved in the local browser state. The site instantly unblurs, and the user's name is dynamically injected into headings, timeline descriptions, and the final RSVP form.
* **Hero Section:** A full-screen view featuring a subtly blurred background image of the couple. The couple's names are centered. Falling petal animations flow gently downward. A live countdown timer tracks the days, hours, and minutes until the wedding.
* **Story & Timeline Section:** A scroll-linked vertical timeline. As the guest scrolls down, venue photos slide in smoothly from the left, while the corresponding event details (times, dress code) slide in from the right.
* **Memories Section:** A clean, minimal embedded YouTube video block showcasing the pre-wedding shoot, framed beautifully without standard harsh YouTube borders.
* **Venue & Location Section:** An interactive Google Maps embed flanked by dynamic photos of the venue that slowly crossfade or parallax as the user scrolls past.
* **Dynamic RSVP Section:** The culmination of the page. It addresses the user directly (e.g., *"Will you be joining us, [Guest Name]?"*). It includes a smooth toggle for "Yes/No" and a simple number counter for the total amount of guests they are bringing.

### 5. Non-Functional Constraints

* **Strict One-Pager:** Absolutely no navigation bars, hamburger menus, or external page routing. The entire journey is linear and scroll-based.
* **Performance:** The petal particle system must automatically pause when the user scrolls past the Hero section to maintain a strict 60fps scroll performance.
* **Mobile-First:** Touch interactions and vertical spacing must be optimized for thumb scrolling on smartphones before adapting to wider desktop screens.

---

