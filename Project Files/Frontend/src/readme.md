## 📁 src/ Folder (Frontend)

The `src/` directory is the heart of the SHOPSMART React application. It contains all source code used for rendering the UI, managing app state, and communicating with backend APIs.

### 🗂️ Folder Breakdown

- **admin_components/**  
  Contains components used specifically in the admin dashboard, such as order status panels or admin-level controls.

- **components/**  
  Holds shared UI components reused across pages, like `Header`, `ProductCard`, `Loader`, etc.

- **context/**  
  Manages global application state (e.g. authentication context, theme preferences) using React’s Context API.

### 📄 Root Files

- **App.js**  
  The main app container — sets up all routes using `react-router-dom` and defines overall layout.

- **App.css**  
  Custom CSS styling for global styles or component overrides.

- **index.js**  
  Entry point that mounts the React app to the DOM inside `public/index.html`.

- **index.css**  
  Optional global styles that apply site-wide — often imported in `index.js`.

- **reportWebVitals.js**  
  (Optional) Used for measuring app performance. Can be removed if not in use.

- **setupTests.js**  
  Test configuration file used by Jest for setting up testing environments.

### 💡 Notes

- Only files inside `src/` are compiled by Webpack.
- You can organize additional folders here such as `pages/`, `hooks/`, or `utils/` to separate logic further.
- The structure promotes component reusability and separation of concerns.

---
