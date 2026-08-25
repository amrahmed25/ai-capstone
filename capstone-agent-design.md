# Capstone — Freelance Proposal Scout Agent

## 1. Agent Overview

### Agent Name

**Freelance Proposal Scout**

### Job to Be Done

The agent helps me evaluate freelance web development job posts and prepare a strong starting point for a proposal.

Its job is not to automatically apply for jobs. Instead, it analyzes a job post, compares the requirements with my real skills and projects, identifies whether the opportunity is a good match, and creates a concise proposal draft for me to review.

The main goal is to reduce the repetitive work involved in evaluating freelance jobs and writing proposals while keeping me responsible for the final decision.

---

# 2. User and Usage Frequency

### User

The only user is me, a freelance/frontend developer looking for web development projects.

### Expected Usage

I expect to use the agent several times per week, depending on the number of relevant freelance opportunities I find.

A typical session would involve giving the agent one new job post and asking it to evaluate and prepare a proposal.

---

# 3. Agent Workflow

The agent should follow this general process:

```text
Job Post
   ↓
Analyze Requirements
   ↓
Identify Required Skills
   ↓
Compare With My Skills
   ↓
Find Relevant Projects
   ↓
Estimate Fit
   ↓
Identify Missing Information
   ↓
Draft Proposal
   ↓
Show Risks / Claims to Verify
   ↓
Human Review
```

The agent should be able to adapt its reasoning based on the job post instead of blindly producing the same proposal structure every time.

---

# 4. Tools and Data Needed

## A. My Skills Profile

The agent needs access to my current skills.

Current skills include:

* HTML
* CSS
* JavaScript
* TypeScript
* React.js
* Tailwind CSS
* Bootstrap
* Responsive Web Design
* Frontend Development

### Access Plan

Store this information in the agent's project knowledge/instructions.

---

## B. Portfolio Projects

The agent needs information about my real projects, including:

* Project name
* Project description
* Technologies used
* My actual contribution
* Live demo, if available
* GitHub repository, if available

### Access Plan

Store project information as reference documents inside the selected AI project.

The agent must only use projects that are actually present in this knowledge base.

---

## C. Freelance Job Post

The job post will be provided manually by me.

The agent should analyze:

* Required technologies
* Project type
* Client requirements
* Expected deliverables
* Experience requirements
* Potential red flags

No external job-board access is required for the first version.

---

## D. Proposal Template

The agent should have a basic proposal structure:

1. Personalized opening
2. Relevant skills/experience
3. How I can help
4. Relevant project evidence
5. Short call to action

The exact wording should change based on the job.

---

# 5. Draft Agent Instructions

The agent should follow these instructions:

```text
You are my Freelance Proposal Scout.

Your job is to help me evaluate freelance web-development opportunities and prepare proposal drafts.

Always analyze the job post before writing anything.

First identify:
- Project type
- Required technologies
- Main client requirements
- Important deliverables
- Required experience

Then compare those requirements with my actual skills and projects.

Never invent:
- Clients
- Projects
- Technologies
- Results
- Testimonials
- Years of experience
- Professional achievements

If the job requires something that is not present in my skills or project information, clearly identify it as a gap.

Give the opportunity a fit score from 1–10 and explain the main reason.

Then recommend:
- Apply
- Apply with caution
- Do not apply

If the opportunity is suitable, create a short personalized proposal.

The proposal should:
- Be concise
- Sound natural
- Directly address the client's requirements
- Mention only relevant experience
- Avoid generic AI language
- Never make unsupported claims

Before the proposal, identify any claims or details I should manually verify.

Never submit a proposal, contact a client, accept an offer, negotiate a contract, or spend money without explicit human approval.
```

---

# 6. Evaluation Cases

I will test the agent with at least five different job posts before considering the agent successful.

## Eval 1 — React Website

**Input:** A client wants a responsive React website.

### Expected Behavior

The agent should identify React, responsive design, and frontend development as strong matches.

**Expected decision:** Apply.

---

## Eval 2 — WordPress Website

**Input:** A client needs a custom WordPress website.

### Expected Behavior

The agent should recognize that this is related to web development but check whether my WordPress experience is actually documented.

It must not invent WordPress experience.

**Expected decision:** Apply with caution or ask for clarification depending on the available project evidence.

---

## Eval 3 — Advanced Backend Platform

**Input:** A client needs a complex backend system using technologies that are not part of my current skill profile.

### Expected Behavior

The agent should identify the skill gap instead of pretending I can complete the project.

**Expected decision:** Do not apply.

---

## Eval 4 — Landing Page

**Input:** A client wants a modern responsive landing page.

### Expected Behavior

The agent should recognize this as a strong match with my frontend skills.

It should focus the proposal on responsive UI, frontend development, and relevant projects.

**Expected decision:** Apply.

---

## Eval 5 — Full-Stack E-commerce Website

**Input:** A client wants a full-stack e-commerce website.

### Expected Behavior

The agent should identify both frontend and backend requirements and compare them against my documented experience.

It should not automatically claim that I have experience with technologies that are not documented.

**Expected decision:** Apply with caution or ask for clarification depending on the requirements.

---

# 7. Risks and Guardrails

## Risk 1 — Hallucinated Experience

The biggest risk is the agent claiming that I have experience with a technology or project that I do not actually have.

### Guardrail

The agent must only use information contained in my approved skills and project data.

If information is missing, it must say:

**"Not verified in my profile."**

---

## Risk 2 — Applying to Bad Jobs

The agent could incorrectly classify an opportunity as a good match.

### Guardrail

The agent only recommends whether I should consider applying.

I make the final decision.

---

## Risk 3 — Automatic Client Communication

Sending a proposal is an external action that could have professional consequences.

### Guardrail

The agent must never automatically submit, send, or publish a proposal.

It can only prepare the draft.

**Human approval is required before any external communication.**

---

## Risk 4 — Incorrect Pricing

The agent could recommend a price that does not fit the project.

### Guardrail

The agent should not automatically negotiate or commit to a price.

If pricing is requested, it should provide a suggestion clearly labeled as a recommendation that requires my review.

---

## Risk 5 — Sensitive Information

Job posts may contain client information.

### Guardrail

The agent should use only the information required to evaluate the project and should not unnecessarily expose or reproduce private information.

---

# 8. Platform Choice

## Chosen Platform: Claude Project

I chose a **Claude Project with structured instructions and project knowledge** for the first version.

The main reason is simplicity.

My agent needs to work with my own skills, portfolio projects, and manually provided job posts. I do not need a complicated backend or automation system to achieve the first version.

A Claude Project allows me to keep the agent instructions and reference information together while making it easy to test the agent with new job posts.

---

# 9. Alternative Considered — n8n

I also considered using **n8n**.

n8n would be more powerful if I wanted the agent to automatically monitor job sources, trigger workflows, store results, or connect multiple external services.

However, that would add setup and maintenance that I don't need for the first version.

For a roughly 10-hour build, Claude Project is more realistic.

I can always move to n8n later if I need automation.

---

# 10. What Success Looks Like

The agent will be considered successful if it can take a completely new freelance job post and:

1. Correctly identify the main requirements.
2. Compare them against my actual skills.
3. Identify relevant portfolio evidence.
4. Detect important skill gaps.
5. Give a reasonable fit recommendation.
6. Produce a concise personalized proposal.
7. Clearly identify claims that require human verification.
8. Never submit anything without my approval.

---

# 11. Final Scope

The first version deliberately has a narrow scope.

It will **not**:

* Automatically search freelance platforms.
* Automatically contact clients.
* Automatically submit proposals.
* Negotiate contracts.
* Accept jobs.
* Spend money.
* Make final career decisions for me.

Its only job is:

**Analyze a freelance opportunity, determine how well it matches my real profile, and prepare a proposal draft for my review.**

This keeps the agent achievable within approximately 10 build hours while still solving a real problem that I encounter regularly.
