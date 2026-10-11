# quicknotes-app

QuickNotes is a lightweight, responsive web application designed to help users efficiently capture, categorize, search, and manage personal, work, and study notes directly in their browser.

## Features
- **Categorized Notes:** Organize notes into Personal, Work, or Study categories with custom color indicators.
- **Input Validation:** Enforces character limits (up to 200 characters) and prevents empty note submissions with instant error feedback.
- **Real-Time Search:** Instantly filter notes dynamically as you type keywords into the search box.
- **Persistent Storage:** Utilizes browser `localStorage` and `JSON` parsing so your notes survive page refreshes.
- **Responsive Layout:** Clean card design built with CSS Flexbox that adapts seamlessly to desktop and mobile screens.

## How to Run Locally
1. Clone or download this repository to your local machine.
2. Open the repository folder in your code editor (such as VS Code).
3. Open `index.html` directly in your web browser, or launch it using a local development server like Live Server.

## What I Learned
- **DOM Manipulation:** Utilizing `document.createElement` and `.textContent` safely constructs UI components while preventing XSS vulnerabilities.
- **State Persistence:** Managing app data synchronization between runtime JavaScript arrays and browser `localStorage`.
- **Event-Driven Architecture:** Handling form submission workflows, real-time input event listeners, and dynamic list filtering.