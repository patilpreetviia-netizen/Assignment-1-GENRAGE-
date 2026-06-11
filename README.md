# GENRAGE — Luxury Streetwear Archive

A premium, minimal matte-black E-Commerce storefront interface built with React and Vite. Engineered to disrupt traditional fashion layouts with high-impact asymmetric grids, mathematical micro-elements, and raw technical typography alignment.

## 🔗 Project Links
* 👉 **Live Deployment:** [View Live Storefront Deployment](https://assignment-1-genrage.vercel.app)
* 👉 **GitHub Repository:** [patilpreetviia-netizen/Assignment-1-GENRAGE-](https://github.com/patilpreetviia-netizen/Assignment-1-GENRAGE-)

---

## 🚀 New Features & Backend Integration (v2.0)

This platform has been drastically upgraded from a static frontend architecture into a fully functional dynamic web application utilizing **Supabase** (PostgreSQL) for backend services.

### Core Upgrades:
* **Supabase Authentication:** Secure User and Admin Registration/Login using Email/Password and Google OAuth.
* **Live Database Catalog:** The entire product catalog is now fetched dynamically from a live Supabase PostgreSQL database instead of static local files.
* **Dedicated User Dashboard:** Logged-in users can view their active session details and track their full historic order history in real-time.
* **Admin Control Panel:** Secured admin-only routes offering a complete CRUD (Create, Read, Update, Delete) product manager, and a transaction log interface to monitor and update incoming user orders.
* **Checkout Pipeline:** Fully operational shipping detail capture and UPI verification checkout flow that pushes orders directly to the live database and tracks payment status.

---

## 🛠️ Frontend Architecture & Components

The platform still adheres to clean structural layout guidelines, splitting functional views into independent modular files inside the `src/` directory:

* **Authentication & Routing**
  * `AuthContext.jsx` - Global authentication state manager controlling user sessions and role permissions.
  * `ProtectedRoute.jsx` & `AdminRoute.jsx` - Secure navigation guards restricting access to dashboard components.
* **Pages & Dashboards**
  * `AuthPage.jsx` - The central cyber-security login and registration portal.
  * `UserDashboard.jsx` - Personal user hub for viewing past orders and account details.
  * `AdminDashboard.jsx` - Master control panel for store administrators.
* **Storefront Components**
  * `CheckoutPage.jsx` - Multi-step shipping and payment confirmation pipeline.
  * `Navbar.jsx`, `Hero.jsx`, `ProductCards.jsx`, `CartSidebar.jsx` - Core navigation and dynamic merchandising elements.

---

## 🎨 Design References & Assets Used

### Core Aesthetic Reference
* **Visual Direction:** Modeled closely after the premium minimalist wireframe streetwear aesthetics of `genrage.com`.
* **Color Palette:** Absolute Deep Black (`#000000`), Elevation Grey (`#0a0a0a`), and High-Contrast Mechanical White (`#ffffff`).
* **Typography:** Dual pairings of `Syncopate` for display headers and `Space Grotesk` for technical data layers.

### Merchandising Imagery
All visual media elements and product graphics utilized across the storefront grids were curated using high-resolution, open-source architectural garment photography from **Unsplash**, processed into custom greyscale layers to preserve lookbook cohesion.

---

## 🤖 Development Methodology

The original concept, core architecture, and basic foundational code for this platform were completely my own creation. To escalate the interface to a professional, industry-grade storefront standard, I imported my baseline files into **Antigravity AI Workspace** to upgrade the aesthetics, accelerate layout generation, and implement advanced interactive backend features.

The Antigravity AI Agent was directed to refine my original workspace while strictly enforcing all standard React paradigms required by the assignment brief.

---

## 🖥️ Live Application Preview
![Storefront Widescreen Capture](https://api.pikwy.com/web/6a244cebe2333860584a1982.jpg)
