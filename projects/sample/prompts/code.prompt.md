### **Project Title**: Building a Real-Time Cristiano Ronaldo YouTube Subscriber Count App with AI

---

### **1. Basic Introduction**

**Objective**: Create a real-time web application that displays the live subscriber count for Cristiano Ronaldo's YouTube channel. The application will consist of a client-side interface and a server-side backend that scrapes the subscriber count from a third-party website. The client will fetch data from the server at regular intervals and update the display accordingly.

---

### **2. Tech Stack**

**Frontend:**
- **HTML**: Structure the content of the web page.
- **CSS**: Style the web page, ensuring it is visually appealing and responsive.
- **JavaScript**: Handle the fetching of subscriber data, update the UI, and manage animations.

**Backend:**
- **Node.js**: Run the backend server, managing requests and responses.
- **Express.js**: Create API endpoints and handle HTTP requests.
- **Puppeteer**: Scrape the subscriber count data from the specified third-party website.
- **CORS**: Enable cross-origin requests from the client-side application to the server.

---

### **3. Directory and File Setup**

Create the following directory structure:

1. **client/** (Frontend Directory)
   - **index.html**: The main HTML file that structures the web page.
   - **styles.css**: The CSS file that styles the HTML elements.
   - **script.js**: The JavaScript file that handles API requests and updates the UI.

2. **server/** (Backend Directory)
   - **server.js**: The main server file that handles API requests and data scraping.
   - **dependencies.txt**: A text file that lists the npm dependencies and the command to install them.

**Step-by-Step Directory Setup**:

1. **Create the `client/` directory**:
   - Inside `client/`, create three files: `index.html`, `styles.css`, and `script.js`.

2. **Create the `server/` directory**:
   - Inside `server/`, create two files: `server.js` and `dependencies.txt`.

---


Docs: 


Project Title: Building a Real-Time Cristiano Ronaldo YouTube Subscriber Count App with AI

1. Basic Introduction
Objective: Create a real-time web application that displays the live subscriber count for Cristiano Ronaldo's YouTube channel. The application will consist of a client-side interface and a server-side backend that scrapes the subscriber count from a third-party website. The client will fetch data from the server at regular intervals and update the display accordingly.

2. Tech Stack
Frontend:
HTML: Structure the content of the web page.
CSS: Style the web page, ensuring it is visually appealing and responsive.
JavaScript: Fetch the subscriber data, update the UI, and handle animations.
Backend:
Node.js: Run the backend server, managing requests and responses.
Express.js: Create API endpoints and handle HTTP requests.
Puppeteer: Scrape the subscriber count data from the specified third-party website.
CORS: Enable cross-origin requests from the client-side application to the server.

3. Directory Setup
Create the following directory structure for the project:
live-subscriber-count-app/
│
├── client/
│   ├── index.html
│   ├── styles.css
│   └── script.js
│
├── server/
│   ├── server.js
│   └── package.json
│
└── README.md

Directory Details:
client/: Contains the frontend files (index.html, styles.css, script.js).
server/: Contains the backend server files (server.js and package.json).

4. Client-Side Implementation
HTML Structure (index.html):
Use a <div> with id="count" to display the subscriber count.
Add a <div> with id="loading" to show a loading message while data is being fetched.
CSS Styling (styles.css):
Style the subscriber count to be large, bold, and centered on the page.
Use animations to smoothly transition the digits when the count changes.
Ensure the background is visually appealing, with Ronaldo's image centered and covering the entire viewport.
JavaScript Logic (script.js):
Implement a function fetchSubscriberCount() that sends a GET request to the server endpoint (/api/subscriber-count).
Use setInterval() to fetch data every 5000 milliseconds (5 seconds). This interval ensures that the data is updated frequently without overloading the server.
In fetchSubscriberCount(), use a try-catch block to handle errors gracefully. Display an "Error" message if the request fails.
Only update the UI with new data when it has been successfully fetched. Keep the old data visible until new data is available.

5. Server-Side Implementation
Express Server Setup (server.js):
Set up an Express.js server that listens on port 3000.
Create an API endpoint /api/subscriber-count that the client will call to fetch the subscriber count.
Puppeteer for Web Scraping:
In the server, use Puppeteer to launch a headless browser and navigate to https://socialcounts.org/youtube-live-subscriber-count/UCtxD0x6AuNNqdXO9Wp5GHew.
Extract the subscriber count by selecting the relevant elements in the DOM. The relevant class to target in the DOM, extracted via inspection, is .id_odometer__dDC1d.mainOdometer .odometer-inside .odometer-digit.
Implement a retry mechanism (fetchSubscriberCountWithRetry) that attempts to scrape the data up to three times if the initial attempt fails.
Error Handling:
Wrap the Puppeteer scraping logic in a try-catch block. If an error occurs (e.g., network issues or site changes), the server should log the error and return a 500 status code to the client with a JSON error message.
If the scraping succeeds, return the subscriber count as a JSON response ({ subscriber_count: <count> }).

6. Validations and Reasoning
Client-Side:
5000 ms Interval: The 5-second interval strikes a balance between keeping the data current and reducing the load on both the server and the client’s network. It prevents excessive requests that could lead to rate limiting or server overload.
UI State Management: Display a "Loading..." message while data is being fetched, and only update the subscriber count when new data is successfully retrieved. If an error occurs, show an "Error" message to inform the user.
Server-Side:
Retry Mechanism: The retry logic in fetchSubscriberCountWithRetry allows the server to handle transient errors (e.g., network hiccups) by reattempting the data fetch. This increases the reliability of the API response.
Timeout Handling: Puppeteer is configured with a 60-second timeout to ensure that the server doesn’t hang indefinitely if the page load is delayed. This is a crucial validation to maintain server responsiveness.

7. Full Functional Breakdown
Client-Server Interaction:
The client sends a request to the server every 5 seconds to fetch the latest subscriber count.
The server scrapes the subscriber count from the specified URL using Puppeteer, retries if necessary, and returns the data to the client.
The client updates the UI with the new data, using animations to enhance the visual experience.
UI Experience:
The subscriber count is displayed with smooth animations, providing a dynamic and engaging user experience.
The use of color-coded animations (green for increments, red for decrements) adds a visual cue for changes in the count.

8. Final Considerations
Scalability: If the application grows in usage, consider implementing caching to reduce the frequency of web scraping, or using a more scalable architecture with load balancers.
Security: Ensure CORS is configured correctly to prevent unauthorized cross-origin requests. Additionally, consider rate limiting on the server to protect against abuse.
Testing: Implement unit and integration tests to ensure the robustness of both the client and server components.


