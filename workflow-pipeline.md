# AI Workflow Pipeline — Draft, Critique, Revise

## 1. Pipeline Choice

I chose the **Draft → Critique → Revise** workflow.

I use this workflow to create freelance proposals for frontend development and web development projects.

The goal is to make the proposal-writing process faster while keeping the final decision and quality control with me.

---

# 2. Workflow Diagram

```text
New Job Post
     ↓
STEP 1 — DRAFT
Create a personalized proposal
     ↓
STEP 2 — CRITIQUE
Check relevance, clarity, credibility, and length
     ↓
STEP 3 — REVISE
Apply the critique and produce the final proposal
     ↓
Human Review
     ↓
Final Proposal
```

Each step produces an output that becomes the input for the next step.

---

# 3. Step 1 — Draft

### Prompt

```text
You are a freelance proposal writer helping me apply to web development projects.

Read the job post below and create a short, personalized proposal.

My background:
- Frontend Developer
- React.js
- JavaScript
- TypeScript
- HTML
- CSS
- Tailwind CSS
- Bootstrap
- Experience building responsive websites and web applications
- Experience with freelance web projects

Requirements:
1. Directly address the client's requirements.
2. Mention only skills relevant to this project.
3. Do not invent experience, clients, results, or technologies.
4. Sound natural and human, not like a generic AI proposal.
5. Focus on how I can solve the client's problem.
6. Keep it concise.
7. End with a simple call to action.

JOB POST:
[PASTE JOB POST HERE]
```

### Output

A first draft of the proposal.

---

# 4. Step 2 — Critique

### Prompt

```text
Review the proposal below as a strict freelance client.

Check:

1. Does it directly address the job requirements?
2. Does it sound personalized?
3. Does it contain unnecessary information?
4. Does it make unsupported claims?
5. Is it too generic?
6. Is it too long?
7. Does it clearly communicate the value I can provide?
8. Is the call to action natural?

Give:
- 3 strengths
- 3 weaknesses
- Specific changes that should be made

Do not rewrite the proposal yet.

JOB POST:
[PASTE JOB POST]

PROPOSAL:
[PASTE STEP 1 OUTPUT]
```

### Output

A structured critique that identifies what needs improvement.

---

# 5. Step 3 — Revise

### Prompt

```text
Rewrite the proposal using the critique below.

Rules:
- Keep the proposal concise.
- Keep only claims that are supported by my actual background.
- Make it sound natural and human.
- Directly connect my relevant skills to the client's requirements.
- Remove generic filler.
- Do not add fake experience or results.
- Keep the strongest parts of the original proposal.
- End with a clear but non-pushy call to action.

JOB POST:
[PASTE JOB POST]

ORIGINAL PROPOSAL:
[PASTE STEP 1 OUTPUT]

CRITIQUE:
[PASTE STEP 2 OUTPUT]

Return only the final proposal.
```

### Output

A final proposal ready for human review.

---

# 6. Human Review

The AI does not make the final decision.

Before submitting, I check:

* Is every claim true?
* Did the AI misunderstand the client's requirements?
* Did it mention a technology I don't actually use for the project?
* Does the proposal sound like something I would actually say?
* Is the price and scope appropriate?
* Is the proposal short enough?
* Are there any grammar or formatting issues?

Only after this check do I submit the proposal.

---

# 7. Five Real Runs

## Run 1 — WordPress Website

**Input:** Boutique DJ agency website requiring a custom WordPress design and development.

**Result:**
The workflow created a short proposal focused on custom WordPress development, responsive design, and avoiding pre-made templates.

**Human correction:**
I removed unnecessary claims and made the proposal more focused on the client's requirement for a premium custom website.

**Final status:** Passed after human review.

---

## Run 2 — Electronics E-commerce Store

**Input:** E-commerce store for Arduino, sensors, IoT kits, and electronic components.

**Result:**
The workflow produced a proposal focused on product presentation, responsive UI, and e-commerce functionality.

**Human correction:**
I checked that the proposal did not claim experience that I could not prove.

**Final status:** Passed after human review.

---

## Run 3 — Coffee Brand E-commerce Website

**Input:** New coffee business requiring branding, UI/UX, and an Arabic/English e-commerce store.

**Result:**
The workflow identified multilingual support, e-commerce, and user experience as the main requirements.

**Human correction:**
I reduced the amount of information about unrelated frontend skills and kept the proposal focused on the actual project.

**Final status:** Passed after human review.

---

## Run 4 — Salla Store Redesign

**Input:** Client requesting a redesign of an existing Salla store.

**Result:**
The workflow focused on improving the existing store's visual design, usability, and responsive experience.

**Human correction:**
I made sure the proposal did not imply that I had access to the client's private store information.

**Final status:** Passed after human review.

---

## Run 5 — Landing Page

**Input:** Client requesting a modern landing page for a business.

**Result:**
The workflow created a concise proposal focused on responsive design, modern UI, and conversion-focused structure.

**Human correction:**
I shortened the final version further because the original was more detailed than necessary for a small landing-page project.

**Final status:** Passed after human review.

---

# 8. Time Comparison

## Manual Process

Estimated average time for one proposal:

* Read and understand job: 5 minutes
* Think about structure: 3 minutes
* Write proposal: 7 minutes
* Review and edit: 5 minutes

**Total: approximately 20 minutes per proposal.**

For five proposals:

**20 × 5 = 100 minutes**

---

## Workflow Process

### Initial setup

Creating the prompts and workflow:

**Approximately 30 minutes**

### Per proposal

* Paste job post: 1 minute
* Draft: 1–2 minutes
* Critique: 1–2 minutes
* Revision: 1–2 minutes
* Human review: 3 minutes

**Approximately 8 minutes per proposal.**

Five proposals:

**8 × 5 = 40 minutes**

Including setup:

**30 + 40 = 70 minutes**

### Estimated time saved

Manual: **100 minutes**

Workflow including setup: **70 minutes**

**Time saved during the first five runs: approximately 30 minutes.**

The workflow becomes more valuable after the initial setup because the setup cost is paid once.

---

# 9. Known Failure Points

The workflow can fail when:

### 1. The job post is vague

AI may make assumptions about the project that are not actually stated.

**Human check:** Verify every project requirement.

### 2. The AI invents experience

The model may try to make the proposal sound stronger by adding unsupported claims.

**Human check:** Verify every experience and technology claim.

### 3. The proposal becomes generic

The draft may use common phrases such as "I am the perfect candidate."

**Human check:** Remove generic language and connect the proposal to the actual job.

### 4. The proposal becomes too long

AI may include too many details.

**Human check:** Keep only information that helps the client make a decision.

### 5. The AI misunderstands the scope

A client may request frontend work while the AI assumes a full-stack solution.

**Human check:** Compare the final proposal against the original job post.

---

# 10. Final Assessment

The workflow successfully has three distinct steps:

**Draft → Critique → Revise**

Each step has a defined input and output, and the process can be reused with a completely new freelance job post.

The AI handles repetitive writing and review work, while I remain responsible for factual accuracy, project fit, pricing, and the final decision.

The main benefit is not simply generating proposals faster. It is having a repeatable process that produces a consistent starting point while keeping human judgment in the loop.
