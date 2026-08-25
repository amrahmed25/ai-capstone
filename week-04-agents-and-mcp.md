# Week 04 — Agents, Workflows & MCP

## 1. Workflow vs Agent

A workflow and an agent can both use AI models and external tools, but the main difference is who controls the sequence of actions.

A **workflow** follows a predefined path. The developer decides the steps and their order, and the AI performs each step within that structure. For example, my FL-04 pipeline follows:

**Draft → Critique → Revise → Human Review**

The steps are known in advance. A new freelance job post goes through the same general process every time.

An **agent** is more autonomous. Instead of following one fixed path, the AI can decide what steps to take, which tools to use, and when another step is necessary. It can react to the results of its actions and continue working until it reaches a defined goal or needs human input. Anthropic describes workflows as systems with predefined code paths, while agents dynamically direct their own processes and tool usage.

Therefore, my FL-04 pipeline is currently a **workflow**, not an agent.

It uses a fixed sequence of prompts and does not decide its own process. I define when drafting happens, when critique happens, and when revision happens.

This is actually useful for my current task because freelance proposal writing is predictable enough that a fixed workflow gives me consistency without adding unnecessary complexity.

---

# 2. What is MCP?

**MCP stands for Model Context Protocol.**

It is a standard way for AI applications to connect models with external data and capabilities. Instead of keeping the AI limited to the information inside the chat, MCP can give it access to external resources and executable tools.

I think of MCP as a standardized interface between an AI application and external systems.

MCP has three important primitives:

### Tools

Tools are functions that an AI model can invoke to perform actions or retrieve information.

Examples include:

* Reading a file
* Searching a database
* Calling an API
* Writing or modifying data

Tools are model-controlled, meaning the model can discover and invoke them when appropriate.

### Resources

Resources provide information or context to the AI.

Examples include:

* Files
* Database schemas
* Application data
* Git history

Resources allow external information to become part of the model's context.

### Prompts

Prompts are predefined instructions or templates exposed through an MCP server. They can provide reusable ways to guide the model for a specific task.

The three primitives solve different problems: prompts guide the interaction, resources provide context, and tools allow the model to actually interact with external systems.

---

# 3. My MCP Setup

For this assignment, I connected an MCP server/connector to my AI client and used it to access information outside the normal chat context.

The important difference is that these tasks require the AI to interact with an external system rather than simply generate an answer from the conversation.

## Task 1 — Read a Local File

I asked the AI to open and summarize a local project file.

**Example request:**

> Read my `README.md` file and summarize the project structure and main technologies.

**What proves MCP was used:**

The conversation shows a tool call accessing the file before producing the summary.

**Evidence:** Screenshot 1.

---

## Task 2 — Inspect Project Files

I asked the AI to inspect files in my project directory and identify the main source files.

**Example request:**

> Inspect my project directory and tell me which files are responsible for the main React components.

This requires access to my actual project files rather than information already contained in the chat.

**Evidence:** Screenshot 2.

---

## Task 3 — Perform an External Tool Action

I used the connected MCP tool to perform a task against an external resource rather than asking the AI to answer from its own knowledge.

**Example request:**

> Search the connected project resources for the `package.json` file and tell me which dependencies are installed.

The AI first uses the connected tool to access the resource and then analyzes the returned information.

**Evidence:** Screenshot 3.

---

# 4. How My FL-04 Workflow Could Become an Agent

My current proposal pipeline could become an agent by giving the AI more control over the process.

Instead of forcing every proposal through exactly:

**Draft → Critique → Revise**

the agent could receive a job post and decide what it needs to do.

For example:

1. Read the job post.
2. Identify the required technologies.
3. Search my project portfolio for relevant projects.
4. Select the strongest matching project.
5. Draft a proposal.
6. Evaluate whether the proposal contains unsupported claims.
7. Revise it if necessary.
8. Check the length.
9. Stop when the proposal passes the quality criteria.
10. Ask me for approval before submission.

The important upgrade is that the AI would decide which tools and steps are necessary based on what it discovers.

For example, if a job requires WordPress, the agent could search my project information for WordPress-related work. If the job requires React, it could search for React projects instead. If it finds insufficient evidence, it could ask me instead of inventing experience.

This would make the system more flexible than my current fixed workflow.

However, I would still keep a human checkpoint before submitting a proposal. The agent could prepare and improve the proposal, but I should verify factual claims, pricing, project fit, and the final wording.

---

# 5. Final Conclusion

My FL-04 pipeline is currently a **workflow** because its steps are predefined and predictable.

An **agent** would have more autonomy and would decide how to accomplish the goal using tools and feedback from the environment.

MCP does not automatically make something an agent. Instead, MCP provides a standardized way for AI systems to access external resources and tools. The agentic behavior comes from how the AI uses those capabilities and decides what to do next.

For my pipeline, the most useful concrete upgrade would be an agent that can **search my portfolio and project files, select evidence relevant to each job post, draft a proposal, critique it, and revise it before asking me for final approval**.

That would make the system genuinely more autonomous while keeping human judgment where it matters.
