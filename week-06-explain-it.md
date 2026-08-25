# Week 06 — Explain It Like I Built It

## How My React Portfolio Is Structured

One part of my portfolio that I wanted to understand better was how the different React components work together to create the website.

At first, I thought of a React website as one big file containing everything. After working with components, I understood that it is better to break the website into smaller pieces, where each component has a specific responsibility.

For example, my portfolio can have components such as a Navbar, Hero section, Projects section, About section, and Footer.

The main application brings these components together.

I think of it like building a house. Instead of building the entire house as one object, I build separate parts such as the doors, windows, rooms, and roof, then put them together to create the final house.

The same idea applies to React.

The Navbar is responsible for navigation. The Hero introduces me and explains what I do. The Projects section displays my work, and the Footer contains additional information and links.

This makes the code easier to understand and maintain because I can work on one part without having to search through one huge file.

## How the Navigation Works

The navigation is another part I wanted to understand.

When I click a navigation item, the browser needs to know where I want to go. Depending on how the portfolio is structured, this can be done using links or React routing.

A link basically tells the browser:

**"When the user clicks this, take them to this location."**

For example, a Projects link can take the visitor to the Projects section or Projects page.

If I use React Router, the application can change the displayed page without completely reloading the website. The router looks at the current URL and decides which React component should be displayed.

So instead of thinking about routing as something complicated, I understand it as a system that connects URLs with the correct parts of my React application.

## Why This Matters

Understanding this changed how I look at my own code.

I am no longer just copying components or asking AI to create a page for me. I understand that each component has a purpose and that the application combines these components into the final interface.

If I need to change the navigation, I know where to look.

If I need to change the projects section, I know that I can work on the Projects component instead of searching through the entire application.

If I add another project, I can update the project data and let the component display it using the same structure.

That makes the project easier for me to maintain and explain to someone else.

## What I Learned

The main thing I learned is that React is not magic. It is a way of organizing a user interface into reusable pieces.

My portfolio may look like one website to the visitor, but internally it is made of smaller components that each have a specific job.

Now, if someone asks me how my portfolio is structured, I can explain it without saying that "AI generated it."

**I built the structure, and I understand how the pieces work together.**
