# Week 08 — Make It Do Something

## 1. Dynamic Feature

The one dynamic feature I chose for my portfolio is a **working contact form**.

I chose this feature because a portfolio should not only show my work; it should also give recruiters and potential clients a simple way to contact me.

The form contains:

* Name
* Email
* Message
* Submit button

The feature is connected to a form-handling service so that submitted messages can actually reach me.

I intentionally chose only one dynamic feature instead of adding several features that would make the portfolio more complicated.

---

# 2. How the Feature Works

The user starts by opening the Contact section of my portfolio.

They enter:

**Name → Email → Message**

Then they click **Send Message**.

The browser sends the form data to the form-handling service.

The service processes the submission and forwards/stores the message so I can receive it.

The basic flow is:

```text
Visitor
   ↓
Contact Form
   ↓
HTTPS Request
   ↓
Form Service
   ↓
My Email / Submission Inbox
```

The important part is that the message does not just disappear after the user clicks the button. A real submission is processed by the external service and becomes available to me.

---

# 3. What Is a Backend?

A backend is the part of a web application that runs behind the interface.

The frontend is what the visitor sees and interacts with, such as:

* Buttons
* Forms
* Text
* Images
* Navigation

The backend handles things that should not happen only inside the user's browser, such as:

* Processing data
* Communicating with databases
* Authentication
* Sending or storing information
* Connecting different services

For this portfolio feature, I did not build my own backend server.

Instead, I used a free external form service to handle the submission.

This is useful because building a complete backend just for a contact form would add unnecessary complexity to my portfolio.

---

# 4. Data Flow

When a visitor submits the form, the process is approximately:

### Step 1 — User Enters Information

The visitor enters their name, email, and message.

### Step 2 — Form Submission

When they click the submit button, the browser sends the form data through an HTTPS request.

### Step 3 — Form Service Receives the Data

The external form service receives the submitted information and processes it.

### Step 4 — Submission Reaches Me

The submission becomes available to me through the configured notification/inbox.

### Step 5 — I Respond

I can then read the message and respond to the person directly.

The important concept is that the frontend is not responsible for everything.

The frontend collects the information, while the external service handles the server-side processing.

---

# 5. Why I Used a Third-Party Service

For this portfolio, I decided not to build a custom backend because I only need one simple feature.

A custom backend would require me to manage:

* A server
* API endpoints
* Request handling
* Security
* Email delivery
* Hosting
* Maintenance

That would be unnecessary for the current portfolio.

Using a free form service lets me focus on understanding the data flow while keeping the project simple and maintainable.

---

# 6. Live Test

I tested the feature using a real submission.

### Test data

**Name:** Test User

**Email:** My test email

**Message:** Portfolio contact form test.

### Expected result

The submitted message should reach my configured destination.

### Evidence

**Screenshot 1:** Completed contact form before submission.

**Screenshot 2:** Successful submission/confirmation.

**Screenshot 3:** Received message or submission inside the configured form service/email inbox.

---

# 7. What I Learned

The main thing I learned is that a form is more than just HTML inputs and a button.

The frontend collects the user's information, but something has to receive and process that information after the user submits it.

I also learned that I do not always need to build a complete backend myself. For a small portfolio feature, using an appropriate external service can be simpler and easier to maintain.

The important part is understanding what happens to the data instead of treating the integration as a black box.

My final flow is:

**User → Frontend Form → HTTPS Request → Form Service → My Inbox → Response**
