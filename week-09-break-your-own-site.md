# Week 09 – Break Your Own Site

## 1. Where It Breaks

I tested my portfolio beyond the normal happy path to find possible issues and edge cases.

### Tests Performed

* Submitted forms with empty inputs.
* Submitted forms with invalid or unexpected data.
* Opened the portfolio in a different browser.
* Tested the website on a mobile device.
* Clicked all navigation links and buttons.
* Tested project demo links.
* Tested GitHub/repository links.
* Submitted forms twice quickly.
* Checked the website loading speed.
* Checked the portfolio's visibility and basic SEO information.

## 2. Findings

### Fixed Issues

* Fixed broken or incorrect navigation links.
* Fixed missing or incorrect project links.
* Improved form validation for empty and invalid inputs.
* Checked the website responsiveness on different screen sizes.
* Added a proper page title.
* Added a meta description.
* Added social sharing metadata.
* Fixed any visual or layout issues discovered during testing.

### Known Limitations

* Some external demo links may depend on third-party hosting and can become unavailable.
* The portfolio depends on an internet connection for externally hosted assets and services.
* Some advanced SEO improvements may require more time and are outside the scope of this checkpoint.

## 3. SEO / Meta

I added the following basic SEO elements:

* Page title
* Meta description
* Open Graph title
* Open Graph description
* Open Graph image
* Responsive viewport metadata

Example:

```html
<title>Amr Ahmed | Frontend Developer</title>
<meta
  name="description"
  content="Frontend Developer specializing in React.js, JavaScript, TypeScript, and modern responsive web applications."
/>

<meta property="og:title" content="Amr Ahmed | Frontend Developer" />
<meta
  property="og:description"
  content="Frontend Developer specializing in React.js and modern web development."
/>
<meta property="og:type" content="website" />
```

## 4. Speed Check

I tested the portfolio using a free website speed/performance checker.

The main goal was to identify:

* Slow-loading assets
* Large images
* Unnecessary JavaScript
* Layout shifts
* Performance issues on mobile

After the check, I optimized the main issues that were identified.

## 5. Triage

| Finding                       | Status           | Action                          |
| ----------------------------- | ---------------- | ------------------------------- |
| Empty form submission         | Fixed            | Added validation                |
| Invalid input                 | Fixed            | Added input validation          |
| Broken navigation             | Fixed            | Corrected links                 |
| Project/demo links            | Fixed            | Tested and corrected links      |
| Mobile responsiveness         | Fixed            | Adjusted responsive styling     |
| Missing page title            | Fixed            | Added SEO title                 |
| Missing meta description      | Fixed            | Added description               |
| Social sharing metadata       | Fixed            | Added Open Graph metadata       |
| Third-party demo availability | Known limitation | Depends on external hosting     |
| Internet dependency           | Known limitation | Required for external resources |

## 6. Hardening Review

I submitted my portfolio for a hardening review and asked for feedback specifically about:

* Broken functionality
* Navigation problems
* Responsive issues
* Missing information
* Performance
* SEO
* Project/demo links

The feedback was reviewed and the required must-fix issues were addressed.

## Final Result

I tested my portfolio using real edge cases instead of only testing the normal user flow. The findings were separated into fixed issues and known limitations. The fix-now issues were addressed, basic SEO/meta information was added, and the portfolio was checked for performance and usability.

The portfolio is now ready for the launch checkpoint.
