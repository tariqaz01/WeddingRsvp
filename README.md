# Digital Wedding Invitation

**Digital Wedding Invitation** is an AI-assisted, personalized wedding experience designed as a cinematic single-page website. It combines guest personalization, animated storytelling, event information, venue media, and RSVP collection in one mobile-friendly journey.

**[View the live experience](https://wedding-invitation-one-gamma.vercel.app/)**

## What the experience includes

- Guest-name personalization from the opening screen through the RSVP section
- A wedding countdown and animated hero experience
- A scroll-based timeline for the day’s ceremonies
- Event images, timings, and celebration details
- An embedded pre-wedding video
- Venue information and an embedded Google Map
- RSVP choices, guest count, and an optional message
- Responsive presentation for mobile and desktop visitors

## Guest journey

```text
Enter guest name
        ↓
Open the personalized invitation
        ↓
View the countdown and couple introduction
        ↓
Explore the ceremony timeline
        ↓
Watch the video and view the venue
        ↓
Submit an RSVP and optional message
```

## Product approach

The project turns a traditional invitation into an interactive event experience. Rather than presenting all information as a static card, it guides each guest through the celebration using personalization, motion, imagery, and a clear response flow.

The repository also includes the original [product requirements](./PRD_Wedding_Invitation.md), [event information](./Wedding_info.md), and design notes used to shape the experience.

## RSVP and privacy

The guest name is used in the browser to personalize the invitation. When an RSVP is submitted, the configured Google Form receives the guest name, attendance choice, guest count, and any optional message entered by the visitor.

The embedded YouTube video, Google Map, Google Form, and deployed hosting platform are external services with their own privacy practices.

## AI-assisted development

This project was built through an AI-assisted development workflow. The work focused on defining the experience, shaping the visual journey, supplying event requirements and assets, validating the interactions, and refining the final result into a working invitation.

## Technology

React · Vite · Tailwind CSS · Framer Motion · GSAP · Lenis · Vercel

## Run locally

```bash
git clone https://github.com/stharesh/digital-wedding-invitation.git
cd digital-wedding-invitation
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

## Current status

This is a completed portfolio project based on a configured wedding experience dated 24 June 2026. The date has passed, so the live deployment is retained as a demonstration of the invitation workflow and visual product experience.

The repository does not currently grant an open-source license.
