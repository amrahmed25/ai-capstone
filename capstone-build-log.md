# Capstone — Freelance Proposal Scout Agent

## 1. MVP Goal

The goal of this MVP is to build a working AI agent that can take a new freelance job post and complete the following process without manual editing in the middle:

**Job Post → Requirement Analysis → Skill Matching → Project Matching → Fit Recommendation → Proposal Draft → Human Verification Notes**

The agent must use my real portfolio and skills as its knowledge source.

It must not submit proposals or contact clients automatically.

---

# 2. Platform

### Platform

**Claude Project**

### Why I chose it

I chose Claude Project because it allows me to keep my agent instructions and portfolio information together without building a complicated backend.

My first MVP does not need automatic job-board access or external APIs. I mainly need the agent to access my real skills and project information while analyzing a new job post.

This keeps the first version within the planned approximately 10-hour build.

---

# 3. Data Connection

I connected my portfolio information to the Claude Project as project knowledge.

### Knowledge files

I added:

* `skills-profile.md`
* `portfolio-projects.md`
* `experience.md`

These files contain only information that I have actually verified.

The agent uses these files to decide whether a job is a good match and which projects can legitimately be mentioned in a proposal.

### Important rule

The agent must never invent experience.

If a technology or project is not present in the knowledge files, it must identify it as unverified rather than claiming experience.

---

# 4. Agent Instructions

The core instructions used by the agent are:

```text
You are my Freelance Proposal Scout.

Your job is to analyze freelance web-development job posts and prepare proposal drafts based only on my verified skills, experience, and projects.

For every new job post:

1. Identify the project type.
2. Extract the main requirements.
3. Identify required technologies.
4. Compare the requirements with my verified skills.
5. Identify relevant projects from my portfolio.
6. Identify any skill gaps or requirements that are not verified.
7. Give the opportunity a fit score from 1–10.
8. Recommend:
   - Apply
   - Apply with caution
   - Do not apply
9. If appropriate, write a short personalized proposal.
10. Clearly list claims that I should verify before submitting.

Never invent:
- Projects
- Clients
- Technologies
- Results
- Testimonials
- Years of experience
- Certifications

Only use information contained in the project knowledge.

Never submit, send, or publish a proposal.

Never contact a client.

Never make a final decision on my behalf.

The final proposal always requires human review.
```

---

# 5. First End-to-End Test

I tested the agent using a new freelance job post.

### Input

The job post requested a modern frontend/web development project with requirements that matched my React and responsive frontend experience.

I pasted the complete job description into the project.

### Agent Process

The agent:

1. Read the job requirements.
2. Identified the required frontend skills.
3. Compared them with my stored skills.
4. Looked for relevant projects in my portfolio knowledge.
5. Calculated a fit assessment.
6. Recommended whether the job was worth applying to.
7. Created a personalized proposal.
8. Listed claims that required human verification.

No information was manually changed between these steps.

---

# 6. Example Output Structure

The successful run produced an output structured approximately like this:

### Project Type

Frontend Web Development

### Main Requirements

* Responsive UI
* Modern frontend development
* React
* JavaScript
* Clean user experience

### Matching Skills

* React.js
* JavaScript
* TypeScript
* HTML
* CSS
* Tailwind CSS

### Relevant Projects

The agent selected projects from my portfolio that were relevant to the job requirements.

### Fit Score

**8/10**

### Recommendation

**Apply**

### Verification

Before submitting, I need to verify that every project and technology mentioned in the proposal accurately represents my actual work.

### Proposal

The agent then generated a concise proposal specifically based on the job requirements.

---

# 7. What Broke During the Build

## Problem 1 — Generic Proposals

My first version produced proposals that sounded too generic.

### Change

I changed the instructions to require the agent to connect the proposal directly to specific requirements from the job post.

---

## Problem 2 — Risk of Unsupported Claims

The agent could potentially make the proposal sound stronger by mentioning experience that was not explicitly stored in its knowledge.

### Change

I added a strict rule:

**If information is not in the verified project knowledge, the agent must not claim it.**

This became one of the main guardrails of the MVP.

---

## Problem 3 — Scope Was Too Large

The original idea included automatically finding freelance jobs and potentially interacting with freelance platforms.

### Change

I removed automatic job searching and proposal submission from the MVP.

The first version only accepts a job post supplied by me.

This reduces technical complexity and prevents the agent from performing irreversible external actions.

---

# 8. What I Cut From the Original Spec

I intentionally removed three features from the first MVP:

### Automatic Job Searching

The agent does not search freelance platforms automatically.

**Reason:** It would require additional integrations and could introduce unnecessary complexity.

### Automatic Proposal Submission

The agent never submits proposals.

**Reason:** Sending a proposal is an external professional action and must remain under human control.

### Automatic Price Negotiation

The agent does not negotiate with clients.

**Reason:** Pricing decisions depend on project scope and personal judgment and should not be delegated to the MVP.

These features may be considered in a future version.

---

# 9. Final MVP Flow

The completed MVP follows:

```text
New Job Post
     ↓
Claude Project
     ↓
Read Portfolio Knowledge
     ↓
Analyze Requirements
     ↓
Match Skills
     ↓
Match Projects
     ↓
Calculate Fit
     ↓
Recommend Action
     ↓
Generate Proposal
     ↓
Verification Notes
     ↓
Human Approval
```

The core job can now be completed from a new job post to a proposal draft without manually editing the agent's output during the run.

---

# 10. Raw Run Capture

I recorded an approximately two-minute, unedited screen capture showing the complete process.

The recording includes:

1. Opening the Claude Project.
2. Providing a new freelance job post.
3. The agent accessing the project knowledge.
4. Requirement analysis.
5. Skill and project matching.
6. Fit recommendation.
7. Proposal generation.
8. Verification notes.

### Evidence

**Raw screen recording:**
[INSERT YOUR SCREEN RECORDING HERE]

---

# 11. MVP Status

**Status: Working MVP**

The agent completes its narrow core task end to end:

**Analyze a freelance opportunity → match it against my real profile → recommend whether to apply → generate a proposal draft.**

It uses a real knowledge connection containing my portfolio and skills.

The agent does not perform irreversible actions and keeps final approval with me.
