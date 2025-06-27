## 📂 Public Folder (Frontend)

The `public/` directory in the SHOPSMART React frontend contains static assets and the base HTML template used when rendering the application in the browser.

### Key Files and Their Roles:

- **index.html**  
  This is the root HTML file of the application. React injects your components into the `<div id="root"></div>` found in this file.  
  You can update the `<title>`, meta tags, or favicon references here.

- **favicon.ico**  
  The default icon shown in the browser tab.

- **manifest.json**  
  Describes how your app should behave when installed as a Progressive Web App (PWA). It defines name, icons, theme colors, and display mode.

- **robots.txt**  
  Used to give instructions to search engine crawlers on how to index your site. You can prevent or allow crawling of certain paths from here.

- **logo192.png / logo512.png**  
  Default icons used in PWA installation prompts or when the app is saved to a device home screen.

### 💡 Notes:
- All files inside the `public/` folder are served as-is.
- You should place only static files here — things that don’t need to be processed or bundled by Webpack.

---
