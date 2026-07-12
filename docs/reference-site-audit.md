# Reference Site Audit — Shubhkamna Events Demo

**Reference site:** https://dynamo-studio.github.io/Shubhkamna-Events-Demo/
**Source repo (used to inspect raw HTML/CSS directly):** https://github.com/Dynamo-Studio/Shubhkamna-Events-Demo
**Audited:** 2026-07-12
**Ticket:** SHU-000

This document treats the reference site as approved client content — a Figma-equivalent. Copy, images, and structure below are recorded verbatim (or as close to verbatim as the source allows) so they can be typed directly into the CMS as the seed content for the first real publish. Where something could not be determined with certainty, that is called out explicitly rather than guessed.

The reference site is a static Tailwind (CDN) demo built with plain HTML/JS — there is no separate CSS file to fetch; all tokens live inline in a `<script id="tailwind-config">` block and a `<style>` block in each page's `<head>`. Raw HTML for all four pages was pulled directly from GitHub (`raw.githubusercontent.com/Dynamo-Studio/Shubhkamna-Events-Demo/main/...`) to get exact markup, class names, and copy rather than relying on a rendered/summarized view.

---

## 1. Page / route inventory

| #   | Page                | URL                                                                   |
| --- | ------------------- | --------------------------------------------------------------------- |
| 1   | Home                | https://dynamo-studio.github.io/Shubhkamna-Events-Demo/ (index.html)  |
| 2   | Services            | https://dynamo-studio.github.io/Shubhkamna-Events-Demo/services.html  |
| 3   | Portfolio (gallery) | https://dynamo-studio.github.io/Shubhkamna-Events-Demo/portfolio.html |
| 4   | Contact             | https://dynamo-studio.github.io/Shubhkamna-Events-Demo/contact.html   |

No other routes are linked from nav, footer, or in-page content on any of the four pages. **There is no standalone About page** — "about" content lives inline as a homepage section (see §2.3). There is likewise **no standalone service/event detail page** — "services.html" is a single page listing all six service categories with in-page anchors (`#weddings`, `#corporate`, `#parties`, `#decor`); it is not a per-service document/detail-page pattern. Both of these are flagged as gaps in §4.

External-only links (not site routes, but referenced everywhere): `tel:+919754455007`, `https://wa.me/919754455007`, `https://www.instagram.com/shubhkamnaevents02/`, Google review search link `https://www.google.com/search?q=shubhkamna+events+indore+reviews`.

---

## 2. Section-by-section seed content

### 2.1 Global — Header / Nav (all pages)

- Logo: Material Symbols icon `celebration` + wordmark "Shubhkamna Events" (uppercase, black weight)
- Nav order: **Home, Services, Portfolio, Contact**
- Header CTA button: "Call Now" → `tel:+919754455007`
- Mobile menu (slide-in sidebar) repeats the same 4 links plus a full-width CTA:
  - On `index.html` mobile menu: "WhatsApp Us" → `https://wa.me/919754455007`
  - On `services.html`/others: "Book Your Event" → `contact.html`
- Floating WhatsApp button (bottom-right, fixed, all pages): green circle, WhatsApp glyph → `https://wa.me/919754455007`

### 2.2 Global — Footer (all pages)

- Tagline (varies slightly per page):
  - Home/Portfolio/Contact: "Indore's top-rated event planning agency. Turning visions into reality. Open 24/7 for all your event needs."
  - Services: "Indore's top-rated 5-star event planning agency. Turning your vision into a stunning atmospheric reality with elite perfection."
- Social: Instagram → `https://www.instagram.com/shubhkamnaevents02/`; WhatsApp → `https://wa.me/919754455007`; Call → `tel:+919754455007`
- **Quick Links / Navigation column:** Home, Services, Portfolio, Contact Us (labelled "Navigation" on services.html, "Quick Links" elsewhere)
- **Services column:**
  - Home footer: Wedding Planning, Corporate Events, Birthday Parties, Destination Wedding (all → `services.html`)
  - Services-page footer ("Core Services"): Wedding Planning (`services.html#weddings`), Corporate Events (`services.html#corporate`), Theme Decoration (`services.html#decor`), Social Events (`services.html#parties`) — note only 4 of the 6 service categories get anchors/links; Entertainment and Special Events have no in-page id and are not footer-linked.
- **Contact Info column:**
  - Address: "Pragati Chember, 34/3, Murai Mohalla, Chhawni, Indore, Madhya Pradesh 452001" (spelled "Chember" — likely a typo for "Chamber"; portfolio.html footer spells it "Pragati Chamber" — inconsistent across pages, reproduce as-is per page or normalize and flag to client)
  - Phone: "097544 55007" (`tel:+919754455007`)
  - Hours badge: "Open 24/7"
- Email address (only appears on contact.html body copy, not in footer): **shubhkamnaevents02@gmail.com**
- Copyright: "© 2026 Shubhkamna Events Indore. All rights reserved." + "Made with ❤️ for beautiful memories" (home/portfolio/contact) or "Made with ❤️ for Indore's best events" (services page)

### 2.3 Home page (index.html)

**Hero**

- Badge: "5.0 ★ Google Rating | 50+ Reviews"
- Headline: "Your Vision, **Our Magic.**" (line break after "Vision,"; "Our Magic." rendered in a primary→magenta gradient)
- Subhead: "Indore's 5-star premier event planner. From grand weddings to high-profile corporate conferences, we handle everything 24/7."
- CTA 1: "Plan Your Event" → `contact.html` (primary filled button)
- CTA 2: "View Portfolio" → `portfolio.html` (secondary outline button)
- Hero images: main `v1.webp` (alt: "Shubhkamna Events luxury wedding planning Indore", 800×1000, aspect ~4:5) with a smaller overlapping video-aspect image `v2.webp` (alt: "Shubhkamna Events decor setup", 256×144, aspect 16:9) and a floating "5/5 Star / Google Rated" stat card.

**Trust badges strip** (4-up stat row): "50+ Verified Reviews", "5.0★ Google Rating", "24/7 Open All Days", "1000+ Happy Events"

**About section** (homepage section, no dedicated page)

- Eyebrow: "About Shubhkamna Events"
- Heading: "Elite Event Planning Experts in Indore"
- Body para 1: "Based in Chhawni, Indore, Shubhkamna Events is dedicated to creating seamless and visually stunning experiences. We manage everything from corporate conferences to grand weddings with unmatched precision."
- Body para 2: "Our team believes in a helpful nature and clear communication. With 24/7 availability, we ensure your special day—be it an anniversary, baby shower, or religious event—is managed to perfection."
- Checklist: "Corporate & Conference coordination", "Theme party & Decor design", "Destination Wedding planning" (each with a check-circle icon)
- CTA: "Contact Our Team" → `contact.html`
- Images: `v3.webp` (alt "Shubhkamna Events wedding decoration setup"), `v4.webp` (alt "Shubhkamna Events wedding planning Indore") — two-up grid, offset heights (h-64 / h-80)

**Services section**

- Eyebrow: "Our Services"; Heading: "What We Do Best"
- Intro: "From personal celebrations to large-scale professional events, we provide end-to-end management services."
- "See All Services" link → `services.html`
- 4 cards (icon / title / description, each linking to `services.html`):
  1. `favorite` — **Weddings** — "Royal wedding and engagement planning with customized themes, complete decor, and management."
  2. `business_center` — **Corporate** — "Expert conference planning, product launch, concert management, and team building events."
  3. `cake` — **Social Events** — "Birthday parties, baby shower, kitty parties, house warming, and anniversary celebrations."
  4. `temple_hindu` — **Destination & Religious** — "Destination wedding planning, religious ceremonies, emcee & DJ, professional lighting services."
     (Note: homepage shows only 4 summary categories; services.html has 6 — see §4 gap.)

**Portfolio/Gallery section**

- Eyebrow: "Portfolio"; Heading: "Capturing Every Moment"
- Intro: "Take a look at the stunning events we have brought to life across Indore."
- 5 images shown, each with hover-reveal caption overlay (caption only visible on `:hover`, not by default, and not keyboard-accessible — see §5):
  1. `v5.webp` — alt "Shubhkamna Events wedding decor" — caption "Grand Wedding Decor" / "Wedding & Engagement"
  2. `v6.webp` — alt "Shubhkamna Events corporate event" — caption "Corporate Gala" / "Indore Business Center"
  3. `v7.webp` — alt "Shubhkamna Events birthday party" — caption "Themed Birthday" / "Theme party design"
  4. `v3.webp` (reused) — alt "Shubhkamna Events event decor" — caption "Anniversary Setup" / "Private event planning"
  5. `v1.webp` (reused, 2-column span) — alt "Shubhkamna Events luxury planning" — caption "Premium Wedding Reception" / "Chhawni, Indore"
- CTA: "See More Projects" → `portfolio.html`
- All images hosted at `https://cdn.jsdelivr.net/gh/Dynamo-Studio/Shubhkamna-Events-Images@main/v{N}.webp`

**Testimonials section**

- Eyebrow: "Testimonials"; Heading: "What Our Clients Think"
- Intro: "We take pride in our 5-star reputation. Here is what people are saying about Shubhkamna Events."
- "Read 50+ Reviews" → Google reviews search link (opens new tab)
- 4 testimonials, each 5/5 stars, avatar = initials in a colored circle (no photo):
  1. **Jyoti Bansal** — Wedding Client — "They made every event very creative and in pocket of budget. Beautiful wedding decor. Very helpful and clear communication." (initials JB, primary-color avatar)
  2. **Rajesh Khanna** — Wedding Planner — "Excellent service! Shubhkamna Events planned our daughter's wedding perfectly. The decor was stunning and everything was managed professionally. Highly recommended!" (initials RK, magenta avatar)
  3. **Sneha Mehta** — Corporate Event — "Best event planners in Indore! They handled our corporate conference flawlessly. Professional team, amazing decor, and timely execution. Will definitely use their services again." (initials SM, primary avatar)
  4. **Priyanka Verma** — Baby shower — "Amazing experience with Shubhkamna Events for our baby shower. The decoration was beautiful and the team was very supportive throughout. 5 stars from us!" (initials PV, magenta avatar)

**CTA / Contact-teaser section**

- Heading: "Ready to Create **Magical** Moments?" ("Magical" in magenta)
- Body: "Contact the 5-star experts at Shubhkamna Events today. We are open 24/7 to help you plan your next big event in Indore."
- Buttons: "097544 55007" (phone icon, → `tel:+919754455007`) and "WhatsApp Us" (green button → `https://wa.me/919754455007`)
- This is the homepage's only "contact" section — there is no on-page enquiry form on the homepage itself (the form lives solely on contact.html). Note for SHU-014 mapping (§4).

### 2.4 Services page (services.html)

**Hero**

- Eyebrow: "Indore's 5-Star Event Planner"
- Heading: "Our Elite **Services**" ("Services" gradient-styled)
- Subhead: "We handle every detail from concept to completion. Whether it's a corporate summit in Indore or a luxury destination wedding, Shubhkamna Events delivers perfection 24/7 across Indore, Ujjain, Dewas, Khandwa, and beyond."

**Services grid — 6 categories** (this page has 6, not the 4 shown on the homepage summary):

| #   | Title          | Icon             | Description                                                                                                                                   | Image                                                              | Features (bullet list)                                                                                                                  | CTA label             |
| --- | -------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| 1   | Weddings       | `favorite`       | "Complete wedding planning and engagement coordination with customized themes. We create royal atmospheric experiences for your special day." | v1.webp (alt "Wedding Planning by Shubhkamna Events")              | Wedding & Engagement planning; Royal Theme Decor Design; Destination Wedding planning; Mandap & Aisle Styling; Wedding florist services | "Enquire for Wedding" |
| 2   | Corporate      | `corporate_fare` | "Professional corporate event planning, conference coordination, product launches, and team building events."                                 | v6.webp (alt "Corporate Conference Planning by Shubhkamna Events") | Conference planning & coordination; Product launch & concert management; Professional lighting & sound; Stage & Tech Management         | "Corporate Solutions" |
| 3   | Social Events  | `celebration`    | "From birthday parties to baby showers, kitty parties, and house warming ceremonies, we manage your personal celebrations with flair."        | v7.webp (alt "Birthday Party Planning by Shubhkamna Events")       | Birthday & Anniversary parties; Baby shower & Kitty parties; House warming ceremonies; Theme parties (Custom Concepts)                  | "Book a Party"        |
| 4   | Decorations    | `palette`        | "Expert event decor design and styling. We transform venues into visually aesthetic and stunning magical environments."                       | v10.webp (alt "Event Decor Design by Shubhkamna Events")           | Custom Event decor design; Religious event planning & decor; Wedding florist services; Theme party specialized decor                    | "Explore Decor"       |
| 5   | Entertainment  | `music_note`     | "Complete entertainment solutions including emcee & DJ, professional lighting, live concerts, and fashion shows."                             | v14.webp (alt "Entertainment & DJ Services by Shubhkamna Events")  | Emcee & DJ services; Professional lighting & sound; Live concerts & fashion shows; DJ night events                                      | "Book Entertainment"  |
| 6   | Special Events | `auto_awesome`   | "Specialized planning for religious ceremonies, cultural events, charity fundraisers, and wellness events."                                   | v5.webp (alt "Special Event Management by Shubhkamna Events")      | Religious ceremony planning; Cultural & entertainment events; Charity & fundraiser events; Wellness & hybrid events                     | "Book Special Event"  |

All 6 CTAs → `contact.html`. Only cards 1–4 have in-page anchor `id`s (`weddings`, `corporate`, `parties`, `decor`) that the footer links to; cards 5 (Entertainment) and 6 (Special Events) have no anchor id.

**"Our Process" section** — heading "Shubhkamna Events Roadmap", 4 steps:

1. `chat` — **Consultation** — "24/7 availability to discuss your vision and requirements."
2. `architecture` — **Design** — "Bespoke theme decor design tailored to your event type."
3. `edit_calendar` — **Coordination** — "Full planning, staffing and vendor management by experts."
4. `celebration` — **Execution** — "Flawless execution for a magical atmospheric reality."

**FAQ section** — heading "Common Inquiries", subhead "Helping you understand our service excellence better."

1. Q: "What is the starting price for wedding planning?" A: "Our luxury wedding and engagement planning packages are customized based on your requirements. We offer comprehensive design, coordination, and execution for a premier event experience. Contact us for a personalized quote."
2. Q: "Do you provide 24/7 service in Indore?" A: "Yes, Shubhkamna Events is open 24 hours every day. Whether it's a religious ceremony, a corporate summit, or an anniversary party, we are always ready to manage your event logistics."
3. Q: "What locations do you serve?" A: "We are based in Chhawni, Indore and serve all across Indore, Ujjain, Dewas, Khandwa, Mandsaur, Pithampur, Rau, Sendhwa, Dr. Ambedkar Nagar, Khalghat, and Shamgarh for all types of private and corporate event planning."
4. Q: "Do you handle destination weddings?" A: "Yes, we specialize in destination wedding planning. Our team manages everything from travel coordination to venue decor, religious wedding planning, and complete wedding management across India."

**CTA section** — Heading: "Start Your Journey with Shubhkamna Events"; Body: "Indore's top-rated planners are just a click away. Book your free consultation today."; Buttons: "097544 55007" (`tel:`) and "Our Past Work" → `portfolio.html`

### 2.5 Portfolio page (portfolio.html)

**Hero**

- Eyebrow: "Gallery"
- Heading: "Shubhkamna Events **Masterpieces**"
- Intro: "A visual showcase of our elite event planning and luxury decor across Indore and beyond. Witness how we transform your special moments into unforgettable memories. 1000+ happy events delivered."

**Gallery grid — 20 images**, CSS-grid "masonry" layout (`grid-template-columns: repeat(auto-fill, minmax(300px,1fr))`, `grid-auto-rows: 250px`, first item spans 2 rows). No filter/category tabs — all 20 shown at once, no lightbox/modal on click (images are not wrapped in a link or given a click handler; clicking does nothing). Every image has descriptive alt text.

| #   | File     | Alt text                                         | Caption/title             | Location/sub-caption          | Category tag  |
| --- | -------- | ------------------------------------------------ | ------------------------- | ----------------------------- | ------------- |
| 1   | v1.webp  | Luxury Wedding Decor Indore by Shubhkamna Events | Luxury Reception Decor    | Indore \| 500+ Guests         | Wedding       |
| 2   | v2.webp  | Corporate Event Planning by Shubhkamna Events    | Corporate Gala            | Product Launch                | Corporate     |
| 3   | v3.webp  | Birthday Party Decoration Indore                 | Theme Birthday            | Cocomelon Theme               | Birthday      |
| 4   | v4.webp  | Stage Decoration by Shubhkamna Events            | Elite Stage Setup         | Chhawni Premium Venue         | Stage         |
| 5   | v5.webp  | Engagement Decor by Shubhkamna Events            | Ring Ceremony Grandeur    | Royal Theme Setup             | Engagement    |
| 6   | v6.webp  | Anniversary Planning by Shubhkamna Events        | Silver Jubilee            | 25 Years Celebration          | Anniversary   |
| 7   | v7.webp  | Baby Shower Decor by Shubhkamna Events           | Baby Shower Theme         | Pastel Floral Setup           | Baby Shower   |
| 8   | v8.webp  | Destination Wedding Shubhkamna Events            | Destination Wedding       | Ujjain Venue                  | Destination   |
| 9   | v9.webp  | House Warming Ceremony                           | House Warming             | Traditional Decor             | House Warming |
| 10  | v10.webp | Concert Event Management                         | Live Concert Setup        | DJ Night & Entertainment      | Concert       |
| 11  | v11.webp | Wedding Florist Services                         | Floral Wedding Decor      | Fresh Flower Setup            | Florals       |
| 12  | v12.webp | Kitty Party Decoration                           | Kitty Party               | Themed Gathering              | Social        |
| 13  | v13.webp | Religious Wedding Planning                       | Religious Ceremony        | Traditional Rituals           | Religious     |
| 14  | v14.webp | Fashion Show Event                               | Fashion Show              | Runway Management             | Fashion       |
| 15  | v15.webp | Wedding Makeup Services                          | Wedding Hair & Makeup     | Professional Styling          | Services      |
| 16  | v16.webp | Corporate Conference Setup                       | Business Conference       | Professional Lighting & Sound | Corporate     |
| 17  | v17.webp | Charity Event Planning                           | Charity Gala              | Fundraiser Event              | Charity       |
| 18  | v18.webp | Cultural Event Management                        | Cultural Festival         | Entertainment Event           | Cultural      |
| 19  | v19.webp | Wedding Decoration Complete Solution             | Wedding Complete Solution | End to End Management         | Wedding       |
| 20  | v20.webp | Hybrid Event Planning                            | Hybrid Event              | Virtual + Physical Setup      | Hybrid        |

All images at `https://cdn.jsdelivr.net/gh/Dynamo-Studio/Shubhkamna-Events-Images@main/v{1..20}.webp`.

**Trust badges strip:** "50+ Verified Reviews", "5.0★ Google Rating", "24/7 Always Open", "1000+ Happy Events"

**Single testimonial callout:** "They made every event very creative and in pocket of budget. Beautiful wedding decor..." — Jyoti Bansal, "Verified Wedding Client"

**CTA section:** "Inspired by our work? Let Shubhkamna Events bring this same level of perfection to your next celebration. Our experts in Indore are ready to start planning." Buttons: "Get a Free Quote" → `contact.html`, "View Services" → `services.html`

### 2.6 Contact page (contact.html)

**Hero**

- Eyebrow: "5-Star Rated Indore Agency"
- Heading: "Let's Create Magic Together"
- Body: "Bespoke planning tailored to your unique vision. Our dedicated team in Chhawni, Indore is ready to bring your dream celebration to life."
- Background image: v5.webp (alt "Shubhkamna Events Setup Background"), dark overlay gradient

**Enquiry form** ("Event Inquiry", icon `edit_note`) — fields, in order:

1. Full Name * — text input, placeholder "Your Name"
2. Email Address — email input, placeholder "you@example.com" (optional — no `required`)
3. Phone Number * — tel input, placeholder "+91 XXXXX XXXXX"
4. Event Type * — select dropdown, default disabled option "Select an option"; options: Wedding, Corporate Event, Birthday Party, Anniversary, Baby Shower, Religious Event, Theme Decoration, Destination Wedding, Kitty Party, House Warming, Concert
5. Event Date * — date input
6. Expected Guests — number input, placeholder "e.g. 150" (optional)
7. Message / Vision — textarea, placeholder "Tell us about the theme, location, or requirements..." (marked `required` in markup despite no asterisk in the label)
8. Submit button: "Submit Inquiry via WhatsApp" (send icon)

**Important behavioral note:** this form does **not** submit to a backend or show an in-page success/confirmation message. On submit, JS builds a formatted WhatsApp message from the field values and calls `window.open()` on a `https://wa.me/919754455007?text=...` deep link — i.e. the "form" is really a WhatsApp message-composer. There is no thank-you state, no email/CRM integration, and no server-side validation. See §4/§5 gap notes for SHU-014.

**"Reach Out Directly" panel**

- Intro: "Need an immediate quote? Connect with Shubhkamna Events team directly. We are open 24/7 for our clients."
- WhatsApp Chat card: "097544 55007" → `https://wa.me/919754455007`
- Call Us Anytime card: "097544 55007" → `tel:+919754455007`
- "Registered Office": "Chhawni, Indore" / "Pragati Chember, 34/3, Murai Mohalla, Chhawni, Indore, Madhya Pradesh 452001"
- "Areas Served" tag list: Indore, Ujjain, Dewas, Khandwa, Mandsaur, Pithampur, Rau, Sendhwa

**Email address** (only found here, in generated content/body — not linked as `mailto:`): **shubhkamnaevents02@gmail.com**

**"5-Star Excellence" banner:** Heading "5-Star Excellence"; badge "100% Satisfaction | Available 24/7"; body "We treat every event like our own family celebration. Your inquiries are handled promptly to ensure every detail is planned to perfection."

**FAQ section** — heading "Common Inquiries", eyebrow "Got Questions?", subhead "Everything you need to know about booking with Shubhkamna Events."

1. Q: "How early should we book for a wedding?" A: "For grand weddings, we recommend booking at least 3-6 months in advance. This allows us to secure premium vendors and design customized luxury decor for your big day. We also offer complete wedding management services including emcee & DJ, professional lighting, and florist services."
2. Q: "Do you provide 24/7 event support?" A: "Yes! Shubhkamna Events is open 24 hours a day, 7 days a week. We understand that planning an event can be stressful, so our team is always available to answer your questions and manage logistics, from corporate conferences to birthday parties and baby showers."
3. Q: "Are your themes customizable?" A: "Absolutely. Customization is our strength. From religious events to corporate conferences, destination weddings to kitty parties, we design every detail based on your color palette, aesthetic preferences, and budget. We also provide wedding florist services and hair & make-up coordination."
4. Q: "Do you handle destination weddings?" A: (same substance as services-page FAQ #4 — travel coordination, venue decor, religious wedding planning, full management across India)

Note: contact.html's FAQ content overlaps heavily with services.html's FAQ (2 near-duplicate questions: "24/7?" and "destination weddings?") but with different wording — see §4 gap (duplicated/unreconciled FAQ content, no single FAQ content type).

---

## 3. Concrete design tokens

Source: inline `tailwind.config` script block, identical across all 4 pages (verified in `index.html`, `services.html`, `portfolio.html`, `contact.html` raw source).

### Colors (exact hex, taken from `tailwind.config.theme.extend.colors`)

| Token              | Hex                                 | Usage observed                                                                                                     |
| ------------------ | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `primary`          | **#1a227f** (deep indigo/navy-blue) | Header CTA bg, headline gradient start, primary buttons, link color, icon accents                                  |
| `accent-magenta`   | **#d81b60** (magenta/pink-red)      | Headline gradient end, eyebrow labels, hover states, CTA-section highlight word, secondary buttons, avatar circles |
| `background-light` | **#f6f6f8** (near-white cool grey)  | Light-mode section background, body bg                                                                             |
| `background-dark`  | **#121320** (near-black navy)       | Dark-mode body/footer background                                                                                   |

Additional colors used ad hoc in markup (not tokenized in the Tailwind config, but consistently reused — worth promoting to real tokens):

- WhatsApp green **#25d366** — floating WhatsApp button, WhatsApp CTA buttons, WhatsApp-chat card accent (secondary "success/whatsapp" color — not one of primary/secondary/accent per the ticket's color slots, flagged as an extra brand color, not fabricated: it is literally in the markup as `bg-[#25d366]` / `bg-[#25D366]`)
- Standard Tailwind slate scale (`slate-50`...`slate-900`) for body text/surfaces/borders — acts as the de facto "text"/"surface" tokens (no custom hex given; e.g. body text is `text-slate-900` / dark mode `text-slate-100`, muted text `text-slate-600`/`slate-400`, borders `slate-100`/`slate-200`/`slate-700`/`slate-800`)
- `yellow-400` for star ratings, `green-100`/`green-500`/`green-600` for "Open 24/7" and rating badges

**Recommended `siteTheme` mapping** (best-available literal read, not invented):

- primary: `#1a227f`
- accent: `#d81b60`
- background: `#f6f6f8` (light) / `#121320` (dark)
- surface: no custom hex on reference site — it uses plain white (`#ffffff`) cards on light bg and `slate-800`-ish (~`#1e293b`, standard Tailwind slate-800) on dark bg. **Approximate, not exact** — reference never defines a custom "surface" hex, it relies on Tailwind's default `slate` palette.
- text: no custom hex — uses Tailwind default `slate-900` (~~`#0f172a`) for primary text and `slate-600` (~~`#475569`) for muted/body text. **Approximate**, since these are Tailwind's stock values, not custom-defined in this project's config.
- secondary: not explicitly defined by the reference (only `primary` + `accent-magenta` are named token colors); if the CMS schema needs a distinct "secondary," the closest literal candidate is the WhatsApp green `#25d366`, which is used repeatedly as a de facto tertiary/CTA color, or Tailwind's default slate for a neutral secondary.

### Fonts

- `<link>` tags load Google Fonts: **Inter** (weights 400,500,600,700,800) and **Montserrat** (weights 700,800,900), plus **Material Symbols Outlined** for icons.
- Tailwind config: `fontFamily.display = ["Inter","sans-serif"]` (body/default font, applied via `font-display` on `<body>`), `fontFamily.heading = ["Montserrat","sans-serif"]` (applied via `font-heading` on all `h1`–`h4` headings, always at heavy weight — `font-black` (900) or `font-bold` (700)).
- So: **heading font = Montserrat** (very heavy weights, 800–900, tight tracking, often uppercase for the logo), **body font = Inter** (400–600, relaxed leading).
- Icons are **Material Symbols Outlined** (Google's icon font), referenced by name as text content inside `<span class="material-symbols-outlined">` (e.g. `favorite`, `celebration`, `business_center`) — not SVG icon components.

### Type scale (approximate, from Tailwind utility classes actually used)

| Role                    | Class(es) seen                                 | Approx. size                            |
| ----------------------- | ---------------------------------------------- | --------------------------------------- |
| H1 (hero)               | `text-5xl sm:text-6xl lg:text-7xl font-black`  | ~48px → 60px → 72px                     |
| H2 (section heading)    | `text-3xl`–`text-5xl md:text-5xl font-black`   | ~30px–48px, up to 60px on some sections |
| H3                      | `text-3xl font-black` (e.g. form card heading) | ~30px                                   |
| H4 (eyebrow/card title) | `text-lg`–`text-2xl font-bold`                 | ~18px–24px                              |
| Body (intro/lede)       | `text-lg sm:text-xl`                           | ~18px–20px                              |
| Body (default)          | base (`text-sm`–`text-base`)                   | ~14px–16px                              |
| Small/label             | `text-xs`–`text-sm`                            | ~12px–14px                              |

Headings consistently use tight tracking (`tracking-tight`/`tracking-tighter`) and heavy weight; eyebrow labels use `tracking-widest uppercase text-xs/sm font-bold` in the accent-magenta color.

### Spacing rhythm

- Section vertical padding is consistently large: `py-16`, `py-20`, `py-24` (most common), occasionally `py-32` for a hero. Section horizontal gutter: `px-4 sm:px-6 lg:px-8` inside a `max-w-7xl mx-auto` (or `max-w-4xl`/`max-w-2xl` for narrower content like FAQ). This produces one dominant "section rhythm": ~96px (`py-24`) top/bottom padding on desktop, generous whitespace between sections, no section uses less than `py-12`.
- Card/grid gaps: `gap-6`–`gap-8` (cards), `gap-12`–`gap-16` (two-column layouts).
- Border radius is a strong part of the visual language: cards/images consistently use `rounded-3xl` (1.5rem) or `rounded-[2rem]`, buttons `rounded-xl`/`rounded-2xl`/`rounded-full`.

### Image aspect ratios by section type

| Section type                         | Aspect ratio observed                                                                                                                              | Notes                                                                       |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Hero primary image (home)            | `aspect-[4/5]` (portrait, explicit width=800 height=1000)                                                                                          | Large hero image, portrait orientation                                      |
| Hero secondary/floating image (home) | `aspect-video` (16:9, 256×144)                                                                                                                     | Small floating accent image over the hero                                   |
| About section images                 | fixed heights `h-64` / `h-80` (no explicit aspect class; ratio depends on rendered image, `object-cover`)                                          | Two-up, staggered heights                                                   |
| Homepage gallery cards               | fixed height `h-80` (20rem), full width, `object-cover` — effectively landscape/square depending on container width                                | One card spans 2 columns (wider landscape treatment)                        |
| Portfolio masonry grid               | CSS grid `grid-auto-rows: 250px`, first item `grid-row: span 2` (tall card), rest single row — ratio is container-driven, not a fixed aspect class | No consistent single aspect ratio; masonry-style, `object-cover` throughout |
| Service cards (services.html)        | fixed card image area (approx square/landscape band above text, `object-cover`, no explicit aspect utility found)                                  | Not a strictly defined aspect ratio in markup — approximate only            |
| Contact hero background              | full-bleed `w-full h-full object-cover` behind dark overlay                                                                                        | No fixed aspect, covers section                                             |

All images are served pre-optimized as `.webp` from a third-party CDN (jsDelivr pointing at a GitHub-hosted image repo `Dynamo-Studio/Shubhkamna-Events-Images`), not from the project's own asset pipeline.

---

## 4. Reference section → ticket mapping (with gaps)

| Reference section                                                              | Planned ticket                                            | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------------------------------------------------------------ | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Header / nav (Home, Services, Portfolio, Contact + Call Now CTA)               | SHU-006                                                   | Straightforward 4-item nav; include the "Call Now" header CTA and floating WhatsApp button as configurable header/global elements.                                                                                                                                                                                                                                                                                                                                                                          |
| Footer (tagline, quick links, services links, contact info, social, copyright) | SHU-007                                                   | Needs to model: tagline text, link groups (nav links + "services" shortcut links), contact block (address/phone/hours), social links, copyright string.                                                                                                                                                                                                                                                                                                                                                     |
| Home — Hero                                                                    | SHU-010 `heroSection`                                     | Headline "Your Vision, Our Magic.", subhead, 2 CTAs (not 1) — **gap:** ticket schema describes a single CTA button; reference has a primary + secondary CTA pair. Also has a floating stat badge and secondary accent image not just one background image — richer than a single hero image/video.                                                                                                                                                                                                          |
| Home — About                                                                   | **no ticket currently covers this as a homepage section** | See gap below — homepage has a distinct "About" block (heading, 2 paragraphs, checklist, CTA, 2 images) separate from services/testimonials. Not explicitly one of SHU-009's listed section types.                                                                                                                                                                                                                                                                                                          |
| Home — Services/offerings                                                      | SHU-011 `servicesSection`                                 | Homepage shows a 4-item subset (Weddings, Corporate, Social Events, Destination & Religious); full 6-item catalog lives on services.html. Matches "heading + array of items with icon/title/description/optional link" shape well.                                                                                                                                                                                                                                                                          |
| Home — Gallery                                                                 | SHU-012 `gallerySection`                                  | 5 images with title+category captions, hover-only reveal. Maps cleanly to "heading + image array with alt text," but captions (title/category per image) are an extra field not explicitly named in the ticket shape — recommend adding optional `caption`/`category` per image.                                                                                                                                                                                                                            |
| Home — Testimonials                                                            | SHU-013 `testimonialsSection`                             | 4 testimonials, quote + author + role, initials-avatar (no photos) + external "read more reviews" link + star rating (5/5 fixed). Ticket's "optional photo" is unused on reference; "role" maps to event type here. Static grid, not a carousel, on this reference.                                                                                                                                                                                                                                         |
| Home — Contact/enquiry                                                         | SHU-014 `contactSection`                                  | **Gap:** homepage itself has no enquiry form — only a phone/WhatsApp CTA banner. The actual form (with all fields) lives on contact.html only. Ticket may need to clarify whether SHU-009's homepage "contact" section is this CTA-banner pattern (heading + intro + phone/WhatsApp buttons) rather than a full form, with the full form reserved for the dedicated Contact page.                                                                                                                           |
| About page                                                                     | SHU-016 `aboutPage`                                       | **Gap:** reference site has no dedicated About page/route at all. The founder-bio/detailed-about content this ticket expects does not exist on the reference — there is no founder name, no founder photo, no bio. This ticket's content will need fresh client input; nothing on the reference site can seed a founder bio.                                                                                                                                                                                |
| Service/event detail pages                                                     | SHU-017 `service` document                                | **Gap:** reference has no per-service detail pages — `services.html` is one page with 6 in-page card sections (4 of which have anchor IDs), each already containing description + feature bullets + image + CTA. If SHU-017 intends one document/detail-page per service, the reference content (6 services) can seed 6 `service` documents, but the reference itself never link out to individual URLs per service — every "Enquire"/"Learn more" CTA goes straight to contact.html, not to a detail page. |

**Additional gaps found on the reference site with no corresponding ticket above:**

1. **FAQ section** (services.html: 4 Q&As; contact.html: 4 different Q&As, 2 of which are near-duplicates in substance). No ticket in the list models an FAQ content type. Recommend a new `faqSection` (heading + question/answer array), reusable on both Services and Contact pages, and reconciling the duplicate "24/7?"/"destination wedding?" questions into one canonical FAQ set.
2. **"Our Process" / roadmap section** (services.html: 4-step Consultation → Design → Coordination → Execution, each with icon+title+description). No ticket covers a "process/how it works" content type. Recommend either folding it into SHU-017/services as an optional sub-section, or a small `processSection` type.
   2b. **Trust-badge / stats strip** (repeated on Home and Portfolio: "50+ Verified Reviews", "5.0★ Google Rating", "24/7 Open All Days", "1000+ Happy Events"). Appears as a distinct homepage section between hero and About, and again on portfolio.html. No ticket currently models a reusable "stats/trust badges" block; likely belongs as an optional sub-block of SHU-010 (hero) or its own small section type.
3. **Portfolio/Gallery page as a full standalone page**, separate from the homepage gallery teaser, with 20 images and per-image category tags. SHU-012 as scoped covers a homepage gallery _section_; there is no ticket for a dedicated Gallery _page_ with all 20 images and categorization. Recommend either extending SHU-012 to also power a `/gallery` page, or a new ticket for a Gallery page.
4. **WhatsApp-first contact pattern**: floating WhatsApp button (global, all pages), header WhatsApp/Call CTA, and the contact form itself submits via a WhatsApp deep link rather than a real backend/email submission. No ticket currently accounts for "WhatsApp integration" as a first-class pattern — worth an explicit decision (real form backend vs. WhatsApp-link submission) rather than silently carrying over the current no-backend behavior.
5. **Area-served tag list** ("Indore, Ujjain, Dewas, Khandwa, Mandsaur, Pithampur, Rau, Sendhwa" on contact.html; a slightly different, longer list appears in the FAQ text on services.html/contact.html: "...Dr. Ambedkar Nagar, Khalghat, and Shamgarh"). Not modeled by any ticket; likely a small array field on the Contact page (or site settings) rather than invented copy — the two lists disagree slightly and should be reconciled with the client.
6. **Google Reviews link / review count / rating** used as a recurring trust element (5.0★, 50+ reviews, "Read 50+ Reviews" external link). Not modeled by any ticket as structured data; could be a `siteTheme`/settings-level field (external review URL + rating + count) reused across hero, testimonials, and CTA sections.

---

## 5. Implementation gap notes (anti-patterns to avoid reproducing)

Each item was confirmed by reading the raw HTML source (via `raw.githubusercontent.com`), not just the rendered page.

1. **FAQ accordions are not real disclosure widgets.** Both services.html and contact.html implement FAQs as `<div class="faq-item">` with a `cursor-pointer` and a `click` JS listener toggling an `.active` class — no `<button>`, no `aria-expanded`, no `aria-controls`, not keyboard operable (no `Enter`/`Space` handling, not focusable at all since it's a plain div). **Avoid in:** SHU-014 (contact FAQ) and any future FAQ/services ticket — implement as native `<button aria-expanded>` + `<div role="region">` or a `<details>/<summary>` pattern instead.
2. **Zero ARIA attributes anywhere in the codebase.** A repo-wide grep across all 4 HTML files found `aria-` used 0 times. Icon-only buttons (mobile hamburger toggle, mobile close button) have no accessible name (`aria-label`) at all — a screen reader announces them as unlabeled buttons. **Avoid in:** SHU-006 (header/nav) — the mobile menu toggle/close buttons need `aria-label` and `aria-expanded`/`aria-controls` wired to the panel they control.
3. **Form labels are not programmatically associated with inputs.** Every `<label>` on contact.html is a bare `<label class="...">Full Name *</label>` with no `for` attribute, and inputs use only `id` — the two are never linked via `for`/`id` matching, and there's no `<label for="formName">` wrapping either. Screen readers cannot reliably associate the label text with its field. **Avoid in:** SHU-014 — use proper `<label for>` / `id` pairing (or wrap the input in the label).
4. **The enquiry form has no real submission or success state.** `contact.html`'s form (`#waForm`) calls `e.preventDefault()` and opens a `wa.me` deep link with a pre-filled message — there is no POST to a backend, no email delivery, no server-side validation, and critically **no in-page success/thank-you message is ever shown** (the ticket's `contactSection.successMessage` field has nothing to model itself on here). **Avoid in:** SHU-014 — implement a real submission path (API route / email service) with an actual on-page success state, since the reference's WhatsApp-redirect pattern is a stopgap, not a pattern to faithfully copy.
5. **Hover-only gallery captions with no keyboard/focus equivalent.** Homepage gallery card captions (title + category) are only revealed via `group-hover:opacity-100` — there is no `:focus`/`:focus-within` equivalent, so keyboard users tabbing through gallery links never see the caption text at all (it's also not duplicated as visually-hidden text for screen readers). **Avoid in:** SHU-012 — captions/alt content must be visible or accessible without requiring hover.
6. **Portfolio gallery has no lightbox and no click affordance despite being described as a "showcase."** The 20 images in portfolio.html are plain `<img>` tags inside `<div>`s with no `<a>`/`<button>` wrapper, no click handler, and no way to view a larger version or navigate between images — clicking an image does nothing. **Avoid in:** SHU-012 — ticket explicitly calls for "accessible lightbox," which correctly targets this gap; make sure the lightbox is keyboard-operable (focus trap, Escape to close, arrow-key navigation) since the reference has none of that to copy from.
7. **No heading hierarchy discipline.** Multiple sections jump from `<h2>` section headings straight to `<h4>` card/subsection titles with no `<h3>` in between (e.g., homepage Services section: `<h2>What We Do Best</h2>` → cards use `<h4>Weddings</h4>` etc.), and eyebrow labels are marked up as `<h4>` purely for their bold-uppercase styling rather than genuine heading semantics (e.g. "About Shubhkamna Events" eyebrow is an `<h4>` sitting immediately before the real `<h2>` heading). **Avoid in:** all page-builder tickets (SHU-009/010/011/012/013/016/017) — pick heading level by document outline, not by desired font size; use CSS classes for eyebrow styling, not real heading tags.
8. **Icons are a webfont icon-name string, not an accessible SVG/icon component.** All icons render via `<span class="material-symbols-outlined">favorite</span>` — decorative in most cases (fine) but occasionally the _only_ content of an interactive element (e.g., some CTA icons), with no `aria-hidden="true"` set to explicitly mark them decorative, and no guarantee the icon font loads (no fallback). **Avoid in:** any organism ticket using icons (SHU-010/011) — use `aria-hidden="true"` on purely decorative icon glyphs and prefer inline SVG or a proper icon component over a remotely-hosted icon webfont dependency.
9. **Images are hot-linked to a third-party CDN with no responsive `srcset`/`sizes`, no `loading="lazy"` on below-the-fold images, and inconsistent width/height attributes** (only the two homepage hero images specify `width`/`height`; all other 30+ `<img>` tags across the site — including the entire 20-image portfolio grid — omit width/height, so the browser cannot reserve layout space, causing layout shift as images load). **Avoid in:** SHU-012/SHU-017 and anywhere images render — use Sanity's image pipeline (hotspot + `next/image` with defined dimensions and lazy loading) rather than raw hot-linked `<img>` tags.
10. **Hardcoded copy and contact details repeated verbatim across all 4 pages instead of coming from a single source of truth** (phone number, address, footer tagline, copyright string are each duplicated by hand in every HTML file, and already show drift — see the "Chember" vs "Chamber" address-spelling inconsistency and the two different footer taglines/"Made with ❤️" lines noted in §2.2, plus two different area-served lists noted in §4 item 5). **Avoid in:** SHU-002/SHU-007 — site-wide contact info, address, and copyright should be single-sourced from `siteTheme`/site settings, not hardcoded per-page/per-component.
11. **No `lang`-sensitive or semantic distinction for phone/WhatsApp links beyond `tel:`/`https://wa.me/` hrefs** — acceptable as a baseline, but multiple near-identical WhatsApp/inline SVG icon blocks are copy-pasted per page (same 20-line SVG path repeated 3+ times per file) rather than componentized, indicating no shared component layer in the reference build. Not a user-facing a11y bug, but confirms the reference is a flat static-HTML demo, not a pattern to mirror architecturally — component-ize icons/buttons/cards in the real Next.js build instead of copy-pasting markup blocks.
12. **`<script>`-injected Tailwind config and inline `<style>` blocks per page** (no shared stylesheet/design-token file at all — every page redefines the same `tailwind.config` and keyframes inline). Confirms the color/font tokens in §3 are the closest thing to a "design system" the reference has; SHU-002's `siteTheme` singleton is a genuine improvement over the reference's copy-pasted-per-page config and should be the single source of truth going forward.

---

_All content above was read directly from the reference site's rendered pages and raw HTML source (via `raw.githubusercontent.com/Dynamo-Studio/Shubhkamna-Events-Demo/main/{index,services,portfolio,contact}.html`) on 2026-07-12. No copy or values were invented; where a design token could not be pinned to an exact hex from the reference's own config, this is called out explicitly in §3 rather than presented as precise._
