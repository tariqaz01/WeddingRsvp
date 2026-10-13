Here is a comprehensive Product Requirements Document (PRD) formatted prompt that you can copy and paste directly to your LLM coding model.

---

### **Prompt for LLM Coding Model**

**Context:**
I am building a web-based, personalized digital wedding invitation. Attached is a reference image of the initial landing state. I need you to generate the front-end code (HTML, CSS, and basic JS) for this UI. Please build this as a responsive web page.

**Objective:**
Recreate the exact layout, typography, and styling of the provided image. The core feature is a centered modal/popup overlaying a blurred/dimmed background showcasing the couple.

---

### **1. Design System & Theming**

Please use the following design specifications to match the image:

| Element | Property | Suggested Value/Reference |
| --- | --- | --- |
| **Primary Font (Headings & Names)** | Font-Family | Elegant Serif (e.g., `Playfair Display`, `Lora`, `Cormorant Garamond`) |
| **Secondary Font (Body & Buttons)** | Font-Family | Clean Sans-Serif (e.g., `Lato`, `Montserrat`, `Inter`) |
| **Primary Color (Accents & Text)** | Hex | Dark Gold / Bronze (approx. `#9c7a52`) |
| **Button Background Color** | Hex | Deep Navy / Charcoal (approx. `#1e293b` or `#202a3a`) |
| **Modal Background Color** | Hex | Pure White (`#ffffff`) |
| **Page Background / Navbar** | Hex | Off-White / Cream (`#f8f5f0`) |
| **Text Color (Body)** | Hex | Dark Grey / Black (`#333333`) |

### **2. Layout Specifications**

#### **A. The Background Layer (Behind the Modal)**

The background represents the main website, which is currently "locked" behind the modal.

* **Top Navigation Bar:**
* Full width, slightly off-white background.
* Flex container with space-between.
* Left & Right text: "October 2024" (Sans-serif, muted grey/blue color).
* Center text: "Rohan & Meera" (Serif, larger, Gold/Bronze color).


* **Hero Image:**
* Full-width background image of a couple (use a placeholder image like `https://via.placeholder.com/1920x1080` if an exact match isn't provided).
* Apply a subtle darkening overlay (e.g., `rgba(0,0,0, 0.2)`) and a slight blur effect to ensure the white modal in the foreground stands out prominently.



#### **B. The Foreground Layer (The Modal)**

* **Positioning:** Absolutely centered on the screen (both horizontally and vertically).
* **Container Styling:**
* Background: White.
* Padding: Generous internal padding (approx. `40px` or `3rem`).
* Border Radius: Rounded corners (approx. `12px` to `16px`).
* Shadow: Soft, diffuse drop shadow to lift it off the background (e.g., `box-shadow: 0 10px 25px rgba(0,0,0,0.15);`).
* Width: Fixed max-width (approx. `450px` - `500px`), responsive on smaller screens.



### **3. Modal Component Details (Top to Bottom)**

1. **Decorative Flourish:**
* At the very top center of the modal, include a decorative vintage/floral flourish SVG icon. Color it to match the Gold/Bronze primary color.


2. **Primary Heading:**
* Text: "Please let us know your name"
* Style: Serif font, centered, Gold/Bronze color, roughly `28px` - `32px` font size. Ensure elegant line spacing.


3. **Subheading:**
* Text: "to unlock your personalized invitation experience."
* Style: Sans-serif, centered, dark grey, smaller font size (approx. `14px` - `16px`), standard font weight.


4. **Form Input Group:**
* **Label:** "Your Name". Left-aligned, sans-serif, small (approx `12px`), dark grey.
* **Input Field:**
* Full width of the modal content area.
* Border: Thin, light grey border with slightly rounded corners (`4px` - `6px`).
* Icon: Include a small "user" outline icon embedded on the left side of the input field.
* Placeholder Text: "E.g., Priya Sharma" (Sans-serif, light grey, styled with appropriate padding to clear the left-aligned user icon).




5. **Submit Button:**
* Text: "CONTINUE TO INVITATION"
* Style: Full width, upper case. Sans-serif, bold, slight letter-spacing (`1px`).
* Colors: Deep Navy background, White text.
* Border: Thin solid border matching the Gold/Bronze color.
* Shape: Fully rounded "pill" shape (`border-radius: 50px`).



### **4. Interaction & State Requirements**

* **Hover States:** The "Continue" button should have a smooth transition on hover (e.g., slightly lighter navy background or an intensified glow/shadow).
* **Focus States:** When the user clicks into the input field, the border color should transition to the Gold/Bronze theme color, and a subtle box-shadow outline should appear for accessibility.
* **Responsiveness:** On mobile devices (screen width < 768px), the modal should take up ~90% of the screen width, and the background image should scale appropriately.

### **5. Deliverables Expected**

Please provide the semantic HTML structure, the required CSS (using modern CSS flexbox/grid and variables for easy theming), and any minimal JavaScript needed to handle the input focus or basic form validation (e.g., ensuring the field is not empty before clicking continue).

---
