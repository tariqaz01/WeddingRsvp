Introduction:
"I want you to act as a front-end web developer and UI/UX designer. I need to build a single-page, personalized, mobile-first wedding invitation website based exactly on the design, layout, and functionality shown in the provided image (image_33.png). The main intent is dynamic personalization, smooth-scroll interactivity, and cinematic animations."

Project Goal:
"Build a single-page scrolling website with no traditional menu bars. The entire journey is linear and scroll-based. It should ask for a user's name immediately upon opening in a full-screen blurred overlay (Entry Gate Popup), and then dynamically weave that name into the content."

I. Core Style Guide (Reference image_33.png for visual aesthetics):

Design Aesthetic: Minimal, Beautiful, Classic, and highly animated.

Palette: Elegant and muted.

Background: Light cream/Off-white #F9F8F6.

Typography: Classic, high-contrast serif for headings; clean sans-serif for body. (Example: 'Bodoni' or similar serif, 'Inter' sans-serif). Use dark brown or charcoal #333333 for main text and muted gold #B8860B for accents and dynamic fields.

II. Section-by-Section Engineering Breakdown:

Use image_33.png as the layout reference for each section.

1. The Hero Section (Start of Scroll):

Dynamic Component: A full-screen, blurred overlay (Popup Gate) appears over this section first.

Popup Content: Center a white modal card. Reference the popup design from image_26.png. It must ask, "Who do we have the honor of inviting?" with a text input (Your Name) and a "CONTINUE TO INVITATION" submit button.

Interaction: Upon submission, save the entered name (e.g., in React State or simple browser state), fade out the blurred popup, and fade in the main Hero section. The Hero's title and dynamic fields must now use this name.

Static Elements (Post-Submission):

Full-Screen Background: A clean canvas #F9F8F6.

Animated Petals: Integrate a lightweight particle system (like tsParticles) that generates slowly flowing flower petals in soft pinks and creams, drifting downward gently across the full screen. Pause this system when scrolling past this section to save performance.

The Couple: A central, subtly blurred romantic couple image (image_21.png).

Title: Below the image, center dynamic text using the entered guest name (e.g., "[Guest Name], Welcome to the Wedding of..."). Below that, center the main names in elegant gold script: Rohan & Meera.

Timer: Below the names, create a live countdown timer showing Days, Hours, Minutes in the specified font and position.

Scroll Indicator: In the bottom right corner, place a small, dynamic arrow icon (pulsing gently) and text like "SCROLL to Begin the Journey."

2. Story & Timeline Section:

Interaction: A scroll-linked, dynamic timeline.

Layout: Vertical timeline with a gold central spine. Alternating panels slide in from the screen edges (Left/Right) as the user scrolls. Use the specific layouts shown in image_33.png.

Components:

A 'timeline spine' graphic (center or left).

Event cards that alternate:

Day 1 (Slides L): Image Panel (image_22.png) on the left, details text (e.g., "THE WELCOME (Day 1) | Grand Entrance | 11:00 AM") on the right.

Day 1 (Slides R): Image Panel (image_28.png) on the right, details text (e.g., "Sangeet Night | Vibrant Celebrations | 07:00 PM") on the left.

Animation: Panels should slide smoothly on scroll (referencing GSAP ScrollTrigger functionality).

3. Memories & Pre-Wedding Video Section:

Interaction: Smooth transition from timeline to a minimal video showcase.

Static Elements:

Title: "Our Pre-Wedding Story" centered.

Video Embed: Center a YouTube video player, framed in a minimalist gold or cream border. Reference image_33.png for the embedded video presentation and link position.

4. Location & Venue Section (Parallax):

Interaction: Complex layout combining static maps with dynamic venue photos.

Static Elements:

Title: "WHERE WE UNITE" centered.

Map Component: An interactive Google Maps embed with a precise marker.

Venue Photos: A vertical stack of venue photos that parallax or dynamically cycle automatically (fading between image_25.png, image_23.png, and image_24.png) beside the map embed.

5. Dynamic RSVP Section (End of Scroll):

Interaction: A personal closing. Address the user directly.

Component: The final white form card.

Dynamic Title: "[Guest Name], Will you be joining us on our special day?"

Form Fields: Smooth UI toggle (Yes/No) and numeric input (Guests). Symmetrical form buttons (YES, I'M COMING and REGRETFULLY DECLINE) with dynamic interactions. (Data storage logic is for later, focus on UI/UX).

III. Non-Functional Requirements & Performance:

One-Pager: Strict enforcement. Absolutely no navigation bars or external links (except the Map/YouTube ones). The user experience must be a seamless scroll.

Scroll Engine: Implement smooth, momentum-based scrolling. The recommended stack for this exact experience in 2026 includes Next.js and Tailwind CSS, with Lenis for the scroll engine and GSAP (ScrollTrigger) for all complex, pinned, and sequenced scroll animations. Motion for layout transitions.

Petal Particle System: The particles must auto-pause on scroll.

Responsive Scaling: Must be entirely mobile-first. The complex layout in section 4 must scale elegantly from smartphone thumbs to widescreen desktop viewing.