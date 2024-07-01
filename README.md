
---

# Directory Structure

## Client

```
client
│
├── public
│   ├── assets/images
│   │   ├── banner1.jpg
│   │   ├── banner2.jpg
│   │
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   ├── robots.txt
│
├── src
│   ├── components
│   │   ├── Routes
│   │   │   ├── ProtectedRoute.js
│   │   │   ├── PublicRoute.js
│   │   │
│   │   ├── shared
│   │   │   ├── Form
│   │   │   │   ├── Form.js
│   │   │   │   ├── InputType.js
│   │   │   │
│   │   │   ├── Layout
│   │   │   │   ├── Menus
│   │   │   │   │   ├── userMenu.js
│   │   │   │   │
│   │   │   │   ├── Header.js
│   │   │   │   ├── Layout.js
│   │   │   │   ├── Sidebar.js
│   │   │   │
│   │   │   ├── modal
│   │   │   │   ├── Modal.js
│   │   │   │   ├── Spinner.js
│   │   │
│   │   ├── pages
│   │   │   ├── Admin
│   │   │   │   ├── AdminHome.js
│   │   │   │   ├── DonarList.js
│   │   │   │   ├── HospitalList.js
│   │   │   │   ├── OrgList.js
│   │   │   │
│   │   │   ├── Dashboard
│   │   │   │   ├── Analytics.js
│   │   │   │   ├── Consumer.js
│   │   │   │   ├── Donar.js
│   │   │   │   ├── Hospitals.js
│   │   │   │   ├── OrganisationPage.js
│   │   │   │
│   │   │   ├── auth
│   │   │   │   ├── Login.js
│   │   │   │   ├── Register.js
│   │   │   │
│   │   │   ├── Donation.js
│   │   │   ├── HomePage.js
│   │
│   ├── redux
│   │   ├── features/auth
│   │   │   ├── authActions.js
│   │   │   ├── authSlice.js
│   │
│   │   ├── store.js
│   │
│   ├── services
│   │   ├── API.js
│   │   ├── authService.js
│   │
│   ├── styles
│   │   ├── Layout.css
│   │   ├── App.css
│   │
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   ├── setupTests.js
│
├── .gitignore
├── README.md
├── package-lock.json
├── package.json
```

### Explanation

- **public**: Contains static assets.
  - `assets/images`: Images used in the app.
  - `favicon.ico`: The favicon for the app.
  - `index.html`: The main HTML file that serves the React app.
  - `manifest.json`: Metadata for the web app.
  - `robots.txt`: Instructions for web crawlers.

- **src**: Contains the source code for the React app.
  - **components**: Reusable components used throughout the app.
    - **Routes**: Custom route components.
      - `ProtectedRoute.js`: Handles routes that require authentication.
      - `PublicRoute.js`: Handles routes accessible without authentication.
    - **shared**: Shared components.
      - **Form**: Form components.
        - `Form.js`: A form component.
        - `InputType.js`: Custom input types.
      - **Layout**: Layout components.
        - **Menus**: Menu components.
          - `userMenu.js`: User-specific menu.
        - `Header.js`: The header component.
        - `Layout.js`: The main layout component.
        - `Sidebar.js`: The sidebar component.
      - **modal**: Modal components.
        - `Modal.js`: A modal component.
        - `Spinner.js`: A loading spinner component.
  - **pages**: Components for different pages.
    - **Admin**: Admin-related pages.
      - `AdminHome.js`: Admin home page.
      - `DonarList.js`: List of donors.
      - `HospitalList.js`: List of hospitals.
      - `OrgList.js`: List of organizations.
    - **Dashboard**: Dashboard pages.
      - `Analytics.js`: Analytics page.
      - `Consumer.js`: Consumer page.
      - `Donar.js`: Donor page.
      - `Hospitals.js`: Hospitals page.
      - `OrganisationPage.js`: Organization page.
    - **auth**: Authentication pages.
      - `Login.js`: Login page.
      - `Register.js`: Registration page.
    - `Donation.js`: Donation page.
    - `HomePage.js`: Home page.
  - **redux**: Redux-related files.
    - **features/auth**: Auth feature.
      - `authActions.js`: Auth-related actions.
      - `authSlice.js`: Auth slice.
    - `store.js`: Redux store configuration.
  - **services**: Services for API calls.
    - `API.js`: API utility.
    - `authService.js`: Authentication service.
  - **styles**: CSS files.
    - `Layout.css`: Styles for layout.
    - `App.css`: Styles for the app.
  - `App.js`: Main app component.
  - `App.test.js`: Tests for the app.
  - `index.css`: Global styles.
  - `index.js`: Entry point for the React app.
  - `logo.svg`: Logo file.
  - `reportWebVitals.js`: For measuring app performance.
  - `setupTests.js`: Setup for tests.

- **.gitignore**: Specifies files to ignore in version control.
- **README.md**: Documentation for the project.
- **package-lock.json**: Automatically generated file that locks the version of dependencies.
- **package.json**: Lists the project’s dependencies and scripts.

---

## Server

```
config
├── db.js
│
controllers
├── adminController.js
├── analyticsController.js
├── authController.js
├── inventoryController.js
├── testController.js
│
middlewares
├── adminMiddleware.js
├── authMiddleware.js
│
models
├── inventoryModel.js
├── userModel.js
│
routes
├── adminRoutes.js
├── analyticsRoutes.js
├── authRoutes.js
├── inventoryRoutes.js
├── testRoutes.js
│
README.md
package-lock.json
package.json
server.js
```

### Explanation

- **config**: Configuration files.
  - `db.js`: Database connection setup.
  
- **controllers**: Handle the business logic for the routes.
  - `adminController.js`: Handles admin-related requests.
  - `analyticsController.js`: Handles analytics-related requests.
  - `authController.js`: Handles authentication-related requests.
  - `inventoryController.js`: Handles inventory-related requests.
  - `testController.js`: Handles test-related requests.
  
- **middlewares**: Middleware functions to process requests.
  - `adminMiddleware.js`: Middleware for admin routes.
  - `authMiddleware.js`: Middleware for authentication.
  
- **models**: Mongoose models defining the schema for MongoDB.
  - `inventoryModel.js`: Model for inventory items.
  - `userModel.js`: Model for users.
  
- **routes**: API routes.
  - `adminRoutes.js`: Routes for admin operations.
  - `analyticsRoutes.js`: Routes for analytics operations.
  - `authRoutes.js`: Routes for authentication.
  - `inventoryRoutes.js`: Routes for inventory operations.
  - `testRoutes.js`: Routes for testing purposes.
  
- **server.js**: Entry point for the Node.js server.

---

This structure keeps the client and server code separate, making the project easier to manage and maintain. Each part of the project is organized into directories based on its function, promoting modularity and reusability.
