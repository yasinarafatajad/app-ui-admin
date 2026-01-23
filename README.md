# Next.js Application

A production-ready Next.js web application admin panel built for scalability, performance, and modern web development workflows.

---

# GitHub Badges

![GitHub last commit](https://img.shields.io/github/last-commit/yasinarafatajad/app-ui-admin)
![GitHub repo size](https://img.shields.io/github/repo-size/yasinarafatajad/app-ui-admin)


---

# Project Overview

This project is built with **Next.js**, a React-based framework that enables server-side rendering, static generation, API routes, and modern frontend tooling.  
The structure is optimized for clean code, scalability, and deployment on platforms such as Vercel, Netlify, and cloud servers.

---



## Project Structure

- `CLIENT/` - Frontend React application (Dashboard & future Public site)
- `SERVER/` - Backend Node.js/Express API with MongoDB and Mongoose

---
# [FRONTENT]
## Dashboard Features

- Products page
- Product Details page
- Add New Product page
- Edit Product page

- Orders page
- Order Details page
- Add New Order page

- Customers page
- Customer Details page
- Add New Customer page
- Edit Customer page

- Weekly, Monthly, and Yearly Report Analytics page


# [BACKEND]
## Backend Features

- Add Product API (`POST /products`) using Node.js, Express, and Mongoose


---

# System Requirements

Make sure the following are installed:

* Node.js version 18 or later  
* npm or yarn  or pnp
* Git  

Verify by running:

```bash
node -v
npm -v
git --version
```

---

# Deployed
this website is deployed to cpanel. also intigrated CI/CD model for automation and utilise time of deployment process in update and upgrade.

**Deployment flow:**

Developer
↓ (push to main)
GitHub Actions
↓ (install dependencies & build)
Static Build Artifacts
↓ (FTP upload)
cPanel Hosting
↓ (serve static files)
End User (Browser)


---

# Installation

## Step 1: Clone the app-ui-admin

```bash
git clone git@github.com:YasinArafatAjad/app-ui-admin.git
cd app-ui-admin

```

---

## Step 2: Install Dependencies

Using npm:

```bash
npm install
```

Using yarn:

```bash
yarn install
```

---

# Environment Variables

Only variables prefixed with `NEXT_PUBLIC_` are accessible in the browser.

---

# Run the Development Server

```bash
npm run dev
```

or

```bash
yarn dev
```

The application will be available at:

```
http://localhost:3000
```

---

# Build for Production

```bash
npm run build
```

or

```bash
yarn build
```

---

# Run Production Server

After building:

```bash
npm run start
```

or

```bash
yarn start
```

---

# Project Structure

```text
/
├── src/app/            Application routes
├── components/         Reusable UI components
├── public/             Static assets
├── .env.local          Environment variables
├── package.json
└── README.md
```


# License

This project is licensed under the **MIT License**.
