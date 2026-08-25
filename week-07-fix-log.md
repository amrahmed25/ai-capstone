# Week 07 — Mobile, Accessibility & Performance Fix Log

## 1. Goal

The goal of this review was to make sure my portfolio works correctly across mobile, tablet, and desktop screen sizes.

I focused on:

* Mobile responsiveness
* Readability
* Accessibility
* Image quality
* Navigation
* Links
* Performance
* Obvious visual problems

I tested the portfolio on a real phone instead of relying only on resizing the desktop browser.

---

# 2. Mobile Review

I opened the live portfolio on my phone and checked the main sections from top to bottom.

### Hero Section

**Before:**
The hero content had limited space on smaller screens, which could make the heading and CTA feel crowded.

**Fix:**
I adjusted the responsive spacing and typography so the heading remains readable and the CTA remains easy to tap.

**After:**
The hero content fits the mobile screen without horizontal scrolling.

---

# 3. Navigation

**Before:**
The desktop navigation was not ideal for a small screen because there was not enough horizontal space.

**Fix:**
I adjusted the mobile navigation and spacing so navigation items remain accessible on smaller screens.

**After:**
The navigation works correctly on mobile and does not overflow the viewport.

---

# 4. Project Images

**Before:**
Some project screenshots were larger than necessary and could increase loading time.

**Fix:**
I resized/compressed oversized images and made sure project images use responsive dimensions.

**After:**
The images remain clear while using a more appropriate file size for the web.

I also checked that images do not overflow their containers on mobile.

---

# 5. Typography & Readability

**Before:**
Some text sections had spacing and sizing that were more comfortable on desktop than on mobile.

**Fix:**
I adjusted responsive font sizes, line height, and spacing.

**After:**
The text is easier to read on a phone without requiring the user to zoom.

---

# 6. Buttons & Touch Targets

I checked the main interactive elements on a real phone.

I verified:

* CTA buttons can be tapped easily.
* Navigation links are accessible.
* Project links work.
* Contact links work.
* GitHub links work.
* LinkedIn links work.

Buttons and links have enough spacing to reduce accidental taps.

---

# 7. Accessibility Review

I reviewed the portfolio for common accessibility issues.

### Images

Important images have meaningful alternative text where appropriate.

Decorative images do not contain important information that users would need to understand the page.

### Color Contrast

I checked that text has enough contrast against the background.

### Keyboard / Interaction

Interactive elements remain usable and clearly identifiable.

### Text

Text remains readable without relying on extremely small font sizes.

---

# 8. Link Audit

I manually tested the important links in the portfolio.

| Link                     | Status  |
| ------------------------ | ------- |
| LinkedIn                 | Working |
| GitHub                   | Working |
| CV                       | Working |
| Contact                  | Working |
| Project Demo Links       | Checked |
| Project Repository Links | Checked |

Any broken or incorrect link discovered during the review was corrected before the final deployment.

---

# 9. Tablet & Desktop Check

After fixing the mobile version, I checked the portfolio at larger widths.

### Tablet

I checked:

* Navigation
* Project grid
* Images
* Text wrapping
* Section spacing
* Buttons

### Desktop

I checked:

* Overall layout
* Maximum content width
* Project cards
* Navigation
* Hero section
* Footer
* Image quality

The layout remains consistent across the tested screen sizes.

---

# 10. AI Audit

I also used AI as a second reviewer.

I asked:

> Audit this portfolio section for mobile responsiveness, accessibility, performance, and obvious UI problems. Identify anything that could break on a real phone and explain how I should fix it.

The AI suggestions were used as a checklist rather than blindly applied.

I manually verified each suggested issue before changing the project.

---

# 11. Fix Log

| Problem Found                                 | Action Taken                   | Result                           |
| --------------------------------------------- | ------------------------------ | -------------------------------- |
| Mobile spacing was too large in some sections | Reduced responsive spacing     | More compact mobile layout       |
| Project images were larger than necessary     | Resized/compressed images      | Better loading and smaller files |
| Some text needed better mobile sizing         | Adjusted responsive typography | Improved readability             |
| Navigation needed better mobile behavior      | Improved mobile navigation     | Easier navigation                |
| Links needed verification                     | Tested all important links     | Working links                    |
| Some buttons needed better spacing            | Adjusted padding/gaps          | Easier tapping                   |

---

# 12. Final Verification

After applying the fixes, I tested the live version again.

### Mobile

**Passed**

The portfolio loads correctly on a real phone without obvious layout problems or horizontal scrolling.

### Tablet

**Passed**

The main sections and project layouts remain usable.

### Desktop

**Passed**

The desktop layout remains clean and consistent.

### Links

**Passed**

Important navigation, project, GitHub, LinkedIn, CV, and contact links were checked.

### Images

**Passed**

Project images are responsive and appropriately sized.

---

# 13. Evidence

### Before

**Phone screenshot:**
[INSERT BEFORE SCREENSHOT HERE]

### After

**Phone screenshot:**
[INSERT AFTER SCREENSHOT HERE]

### Live Website

**Live URL:**
[INSERT YOUR LIVE PORTFOLIO URL HERE]

---

# 14. Final Result

The review helped me find problems that were not obvious when looking at the portfolio only on a desktop screen.

The biggest lesson was that responsive design is not finished just because a layout looks good on a laptop. A real user may access the website from a much smaller screen, use touch instead of a mouse, and have a slower connection.

I therefore treated the mobile review as a real usability test rather than simply shrinking the browser window.
