# SHOPSMART Frontend 🛒  
Welcome to the frontend of **SHOPSMART: Your Digital Grocery Store Experience** — a React.js application for browsing grocery products, placing orders, and tracking purchases in real-time.

## 🔧 Tech Stack

- **React.js** — UI rendering and component-based architecture  
- **Axios** — HTTP client for connecting to backend APIs  
- **React Router DOM** — Client-side routing and navigation  
- **Material UI & Bootstrap** — Styling and layout components  
- **JS-Cookie** — Handling authentication via stored cookies  

## 📁 Folder Structure

```
Frontend/
├── node_modules/
├── public/
├── src/
│   ├── admin_components/
│   ├── components/
│   ├── context/
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   └── setupTests.js
├── package-lock.json
└── package.json
```

## 📦 Installation

1. Clone the repository and navigate into the frontend folder:
   ```bash
   git clone https://Mcharan07/SHOPSMART-YOUR-DIGITAL-GROCERY-STORE-EXPERIENCE/
   cd shopsmart/Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The app will run at: [http://localhost:3000](http://localhost:3000)

## 🔗 API Integration

- Communicates with backend running at: `http://localhost:5100/`
- Core API endpoints include:
  - `GET /products` — fetch all product listings  
  - `POST /orders` — create a new order  
  - `GET /my-orders/:userId` — fetch orders for a specific user  

## ✨ Features

- View product cards with image, price, and Buy Now option  
- Complete checkout with quantity, address, and payment method  
- Track order history from "My Orders" page  
- Admin dashboard to view and update order statuses  

## 🛠️ Notes

- Backend server must be running before making API requests  
- Ensure user login is handled via cookies or localStorage for authenticated routes  
- App is responsive across desktop and mobile devices  

---

Happy coding! 🎯  
