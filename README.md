# task-manager-assign3
TaskPro is a Vanilla JS dashboard featuring priority sorting, real-time search, and automated timestamps. It uses localStorage for persistence and CSS variables for a seamless Dark Mode. Designed with zero external libraries, it offers a clean, data-driven UI with progress analytics and pointer-optimized interactions

🚀 TaskPro DashboardA high-performance, Vanilla JavaScript task manager featuring a modern "Card" UI, real-time analytics, and data persistence. Built with a focus on clean code and zero external dependencies.🛠 

Key Functionalities:
Priority Intelligence: Automatically sorts tasks by importance (High, Medium, Low).
Persistent Storage: Uses localStorage so your data remains even after closing the browser.
Time Tracking: Every task displays a precise "Created At" timestamp (Date + Time).
Live Analytics: A sidebar progress bar visualizes your completion rate in real-time.Dual 
Theming: Seamless transition between Light and Dark modes via CSS variables.🏗 

System Architecture: The project follows a State-Driven model rather than hard-coded HTML:
1)The State: A single array of objects stores all task data.
2)The Logic: Functions manipulate the array (add/delete/toggle).
3)The UI: The render() function clears and rebuilds the list based on the updated state. 

