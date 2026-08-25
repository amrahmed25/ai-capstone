# Prompt Ladder — React Component

## Goal

This experiment tests how individual prompt improvements affect the quality of AI-generated frontend code.

The task used throughout the ladder is creating a responsive React + TypeScript component.

---

# Run 0 — Weak Baseline

### Prompt

> Build a React component for a product card.

### Output

The AI generated a basic product card with a title, image, price, and button. The code was functional but generic, with little attention to responsiveness, accessibility, or reusable props.

### Notes

**What changed:**
Nothing. This is the intentionally weak baseline.

**What improved in the output:**
This output established a working starting point, but it did not provide enough detail to produce a production-ready component.

**What still failed:**
The component had generic styling, limited accessibility, and no clear reusable data structure.

**What I would try next:**
Define a clearer goal for what the component should accomplish.

---

# Run 1 — Clearer Goal

### Layer Added

**A clearer goal**

### Prompt

> Build a React component for a product card that clearly presents a product's image, name, price, rating, and primary purchase action.

### Output

The generated component included all the requested product information and gave the purchase button more visual importance. The structure was clearer than the baseline.

### Notes

**What changed:**
The prompt now clearly defines the purpose of the component.

**What improved in the output:**
The generated card had a clearer information hierarchy and included the specific content needed by the user.

**What still failed:**
The result was still designed for a generic user and did not consider the technical context of the application.

**What I would try next:**
Define who will use the component and what they need from it.

---

# Run 2 — Defined Audience

### Layer Added

**A defined audience**

### Prompt

> Build a React component for an e-commerce product card for online shoppers. It should clearly present a product's image, name, price, rating, and primary purchase action.

### Output

The component became more focused on shopping behavior. Product information was easier to scan and the purchase action was more prominent.

### Notes

**What changed:**
The prompt now identifies online shoppers as the target audience.

**What improved in the output:**
The card became easier to scan and the purchase action received more attention.

**What still failed:**
The generated code still did not know the actual frontend stack or project conventions.

**What I would try next:**
Provide real project context.

---

# Run 3 — Real Context

### Layer Added

**Real context**

### Prompt

> Build a React + TypeScript product card for an existing e-commerce application that uses Tailwind CSS. The target users are online shoppers. The card should clearly present a product's image, name, price, rating, and primary purchase action.

### Output

The generated code was much closer to something that could actually be added to a project. It used TypeScript props and Tailwind utility classes instead of generic CSS.

### Notes

**What changed:**
The prompt now specifies React, TypeScript, Tailwind CSS, and an existing e-commerce context.

**What improved in the output:**
The code became more directly usable in a real project and the component API became more reusable through typed props.

**What still failed:**
The response format was inconsistent. Sometimes the AI included explanations and sometimes it mixed implementation details with code.

**What I would try next:**
Specify exactly how the answer should be structured.

---

# Run 4 — Specified Output Format

### Layer Added

**Specified output format**

### Prompt

> Build a React + TypeScript product card for an existing e-commerce application that uses Tailwind CSS. The target users are online shoppers. The card should clearly present a product's image, name, price, rating, and primary purchase action.
>
> Return the answer in exactly three sections:
>
> 1. Component code
> 2. Props example
> 3. Short implementation notes

### Output

The response became easier to use because the code, usage example, and explanation were separated. It was much easier to copy the implementation into a project.

### Notes

**What changed:**
The expected response structure was explicitly defined.

**What improved in the output:**
The answer became easier to scan and reuse because the implementation and usage example were separated.

**What still failed:**
The component still produced some unnecessary styling and did not consistently handle accessibility details.

**What I would try next:**
Add explicit constraints for implementation quality and accessibility.

---

# Run 5 — Constraints

### Layer Added

**Constraints**

### Prompt

> Build a React + TypeScript product card for an existing e-commerce application that uses Tailwind CSS. The target users are online shoppers. The card should clearly present a product's image, name, price, rating, and primary purchase action.
>
> Return the answer in exactly three sections:
>
> 1. Component code
> 2. Props example
> 3. Short implementation notes
>
> Constraints:
>
> * Use TypeScript with a typed props interface.
> * Use Tailwind CSS only for styling.
> * Do not use `any`.
> * Make the component responsive.
> * Use semantic HTML.
> * Provide meaningful image alt text.
> * Keep the component reusable and avoid hard-coded product data.

### Output

The generated implementation was significantly closer to production-ready frontend code. It used typed props, avoided `any`, used semantic elements, and separated product data from the component.

### Notes

**What changed:**
Specific technical and accessibility constraints were added.

**What improved in the output:**
The component became more reusable, predictable, and accessible. It was also easier to integrate into an existing TypeScript project.

**What still failed:**
The output was not perfect. The AI still made some assumptions about the rating UI and did not fully explain edge cases such as missing images or unusually long product names.

**What I would try next:**
For a real production prompt, I would add quality criteria and verification requirements rather than simply adding more implementation instructions.

---

# Comparison

| Run | Layer Added      | Main Output Improvement                             |
| --- | ---------------- | --------------------------------------------------- |
| 0   | None             | Basic but generic component                         |
| 1   | Clearer goal     | Better information hierarchy                        |
| 2   | Defined audience | More focused shopping experience                    |
| 3   | Real context     | More usable React/TypeScript/Tailwind code          |
| 4   | Output format    | Easier to read and reuse                            |
| 5   | Constraints      | More production-ready and accessible implementation |

## Honest Observation

The biggest improvement did not come from adding more words to the prompt. The most useful changes were the ones that removed ambiguity about the **project context and technical constraints**.

The audience layer helped the UI become more focused, but its impact was smaller than providing the actual React, TypeScript, and Tailwind context.

---

# Final Reusable Prompt

> Build a reusable React + TypeScript product card for an existing e-commerce application using Tailwind CSS.
>
> **Goal:** Help online shoppers quickly understand a product and take the primary purchase action.
>
> **The component must display:**
>
> * Product image
> * Product name
> * Price
> * Rating
> * Primary purchase button
>
> **Technical constraints:**
>
> * Use React with TypeScript.
> * Define a typed props interface.
> * Do not use `any`.
> * Use Tailwind CSS only for styling.
> * Keep product data outside the component.
> * Make the component responsive.
> * Use semantic HTML.
> * Provide meaningful image alt text.
> * Keep the component reusable.
>
> **Response format:**
>
> 1. Complete component code
> 2. Props/type definition
> 3. Example usage with sample data
> 4. Short implementation notes
>
> Before finalizing, verify that the TypeScript types are valid, no `any` is used, the component is responsive, and the main interactive element is accessible.
