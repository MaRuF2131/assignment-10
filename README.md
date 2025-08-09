# Hobby Hub - Connect Through Shared Interests

## Project Overview
Hobby Hub is a web application that allows users to create, join, and manage hobby groups. It provides a platform for people with similar interests to connect, organize activities, and share their passion for various hobbies.

## Live Project Link
[Visit Hobby Hub](https://appstore-ac701.web.app)

## Technologies Used
- React 19
- React Router DOM 7
- Tailwind CSS 4
- Firebase (Authentication & Hosting)
- Framer Motion
- SweetAlert2
- React Hot Toast
- React Slideshow Image

## Core Features

1. **User Authentication**
   - Email/Password login and registration
   - Google authentication
   - Secure user sessions

2. **Protected Routes**
   - Secure access to authenticated features
   - Redirects unauthenticated users to login

3. **Data Management**
   - MongoDB integration for data storage
   - RESTful API implementation

4. **CRUD Operations**
   - Create hobby groups
   - Read group information
   - Update group details
   - Delete groups

5. **User Experience**
   - Responsive design for all devices
   - Dark/Light theme toggle
   - Loading animations
   - Toast notifications


## Installation and Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/hobby-hub.git
   cd hobby-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a Firebase project
   - Enable Authentication (Email/Password and Google)
   - Update the Firebase configuration in `src/mytools/firabase/firebase.init.js`

4. **Set up MongoDB**
   - Create a MongoDB database
   - Configure your connection string in your backend API

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Build for production**
   ```bash
   npm run build
   ```

## Dependencies

```json
"dependencies": {
  "@tailwindcss/vite": "^4.1.7",
  "firebase": "^11.8.1",
  "framer-motion": "^12.12.2",
  "localforage": "^1.10.0",
  "lucide-react": "^0.511.0",
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-hot-toast": "^2.5.2",
  "react-router-dom": "^7.6.0",
  "react-slideshow-image": "^4.3.2",
  "react-tooltip": "^5.28.1",
  "sweetalert2": "^11.21.2",
  "tailwindcss": "^4.1.7"
}
```

## Contact

Maruf Ahmmed - CSE Student

---

© 2023 Hobby Hub. All rights reserved.