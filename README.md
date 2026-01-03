 # Bill Wise - Utility Bill Management System

**Server Side Repository:** [https://github.com/SamiunAuntor/PH-Assignment-10_Bill-Wise_Server](https://github.com/SamiunAuntor/PH-Assignment-10_Bill-Wise_Server)

A modern, secure MERN Stack web application for managing monthly utility bills. Users can view, pay, and update bills for Electricity, Gas, Water, and Internet, with responsive UI, advanced search, PDF report downloads, and more.

## 🌐 Live Demo

**🔗 [View Live Application](https://billwise-375a5.web.app/)**

**📦 [GitHub Repository](https://github.com/SamiunAuntor/PH-Assignment-10_Bill-Wise_Client)**

## 📋 Table of Contents
- [Live Demo](#-live-demo)
- [Project Overview](#-project-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Running the Project](#-running-the-project)
- [Project Structure](#-project-structure)
- [Key Features](#-key-features)
- [Data Management](#-data-management)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Future Scope](#-future-scope)

## 🎯 Project Overview

Bill Wise is a single-page application (SPA) for managing utility bills. Users can securely log in, view, pay, and update bills, with features like category filtering, PDF report downloads, and responsive design. The app ensures secure access, dynamic routing, and a seamless user experience.

## ✨ Features

- **Authentication**: Secure login/register with email/password and Google OAuth
- **Admin Dashboard**: Manage users, manage all bills, and view analytics
- **User Dashboard**: Add public bills, view personal dashboard
- **Bill Management**: View, pay, and update bills for Electricity, Gas, Water, Internet
- **Dynamic Routing**: React Router for public/private and admin routes
- **PDF Report Download**: Export paid bills as PDF (jsPDF + jsPDF-AutoTable)
- **Category Filtering**: Filter bills by category with backend query support
- **Responsive UI**: Mobile, tablet, and desktop support
- **Toast/SweetAlert**: Modern notifications for all actions
- **Loading Spinner**: Shown during API calls
- **Dark/Light Theme Toggle**: Switch themes on Home page
- **Extra Pages**: Profile, About, Contact Us, Privacy Policy, 404 Not Found
- **Animations**: Home page animations (Lottie/React Awesome Reveal/Typewriter)
- **Visualizations**: Charts and graphs using Recharts
- **Axios Interceptors**: Secure API requests

## 🛠 Tech Stack

### Core Technologies
- **React 19.x**
- **Vite 7.x**
- **JavaScript (ES6+)**
- **React Router 7.x**
- **MongoDB** (server-side)
- **Express.js** (server-side)
- **Node.js** (server-side)

### Styling & UI
- **Tailwind CSS 4.x**
- **DaisyUI 5.x**
- **SweetAlert2**
- **react-hot-toast**
- **Lottie React / React Awesome Reveal**

### Utilities & Packages
- **Axios** (with interceptors)
- **jsPDF & jsPDF-AutoTable**
- **Firebase** (authentication)
- **ESLint**

## 📦 Prerequisites

- **Node.js** (v16.x or higher)
- **npm** (v7.x or higher) or **yarn**
- Modern web browser

## 🚀 Installation

1. **Clone the repository**
	 ```bash
	 git clone https://github.com/SamiunAuntor/PH-Assignment-10_Bill-Wise_Client.git
	 cd PH-Assignment-10_Bill-Wise_Client
	 ```
2. **Install dependencies**
	 ```bash
	 npm install
	 ```
	 or
	 ```bash
	 yarn install
	 ```

## 🏃 Running the Project

### Development Mode
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

### Build for Production
```bash
npm run build
```
Output in the `dist` directory.

### Preview Production Build
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

## 📁 Project Structure

```
Bill-Wise-Client/
├── public/
│   └── ...assets
├── src/
│   ├── assets/                # Images, icons
│   ├── AuthProvider/          # Firebase auth context
│   ├── Components/            # UI components
│   │   ├── Banner.jsx         # Home banner
│   │   ├── BillDetails.jsx    # Bill details card
│   │   ├── CategoryCard.jsx   # Category card
│   │   ├── CategorySection.jsx# Category section
│   │   ├── FAQ.jsx            # FAQ section
│   │   ├── Footer.jsx         # Footer
│   │   ├── NavBar.jsx         # Navigation bar
│   │   ├── WhatOurUsersSay.jsx# Extra section
│   │   ├── WhyChooseBillWise.jsx # Extra section
│   │   └── RecentBills/       # Recent bills components
│   ├── Layouts/               # Layouts
│   │   ├── MainLayout.jsx     # Main layout
│   │   └── DashboardLayout.jsx# Dashboard layout
│   ├── Pages/                 # Route pages
│   │   ├── Dashboard/         # Dashboard pages
│   │   │   ├── AddPublicBill.jsx
│   │   │   ├── AdminDashboardHome.jsx
│   │   │   ├── DashboardHome.jsx
│   │   │   ├── ManageAllBills.jsx
│   │   │   ├── ManageUsers.jsx
│   │   │   └── UserDashboard.jsx
│   │   ├── AboutPage.jsx      # About page
│   │   ├── BillDetailsPage.jsx# Bill details page
│   │   ├── BillsPage.jsx      # Bills listing
│   │   ├── ContactUsPage.jsx  # Contact Us page
│   │   ├── Error404Page.jsx   # 404 page
│   │   ├── HomePage.jsx       # Home page
│   │   ├── LoginPage.jsx      # Login page
│   │   ├── MyPayBillsPage.jsx # User bills page
│   │   ├── MyProfilePage.jsx  # Profile page
│   │   ├── PrivicyPolicyPage.jsx # Privacy Policy page
│   │   └── RegisterPage.jsx   # Register page
│   ├── PrivateRoute/          # Private route logic
│   │   ├── AdminRoute.jsx     # Admin route protection
│   │   └── PrivateRoute.jsx   # User route protection
│   ├── Router/                # Router config
│   ├── App.jsx                # Main App
│   ├── main.jsx               # Entry point
│   ├── App.css                # Global styles
│   └── index.css              # Base styles
├── eslint.config.js           # ESLint config
├── index.html                 # HTML template
├── package.json               # Dependencies
├── vite.config.js             # Vite config
└── README.md                  # Documentation
```

## 🎨 Key Features

- **Secure Authentication**: Email/password & Google login
- **Admin Dashboard**: Comprehensive admin controls and analytics
- **User Dashboard**: Personal bill management and public bill submission
- **Bill CRUD**: Add, view, update, delete bills
- **Category Filtering**: Dynamic filter by bill type
- **PDF Export**: Download paid bills as PDF
- **Responsive Design**: Works on all devices
- **Toast/SweetAlert**: Modern notifications
- **Dark/Light Theme**: Toggle on Home page
- **Extra Sections**: User testimonials, FAQ, Privacy Policy, Contact Us
- **Animations**: Engaging UI with Lottie, Typewriter, and Reveal effects
- **Visualizations**: Interactive charts for data analysis
- **404 Page**: Custom not found page
- **Loading Spinner**: During API calls
- **Axios Interceptors**: Secure API requests

## 💾 Data Management

### MongoDB Collections

#### bills
```json
{
	"title": "Frequent Power Outage in Mirpur",
	"category": "Electricity",
	"email": "creator@gmail.com",
	"location": "Mirpur-10, Dhaka",
	"description": "Power cuts occur daily in the evening.",
	"image": "https://example.com/power.jpg",
	"date": "2025-10-26",
	"amount": 260
}
```
#### myBills
```json
{
	"billsId": "abc123",
	"username": "Mr. X",
	"Phone": "017XXXXXXX",
	"Address": "Dhaka",
	"email": "mrx@gmail.com",
	"amount": 260,
	"date": "2025-10-26"
}
```

## 🚀 Deployment

- **Client**: Hosted on Netlify/Surge/Firebase
- **Server**: Hosted on Vercel
- **SPA Routing**: All routes work on reload
- **Firebase Auth**: Add your domain for authorization

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit changes (`git commit -m 'Add YourFeature'`)
4. Push to branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## 🔮 Future Scope
- Add payment gateway integration
- Advanced analytics dashboard
- Push notifications for bill reminders
- Multi-language support
- More utility categories

## 📝 Notes

- No Lorem Ipsum or default alerts used
- SPA routing ensures no errors on reload
- All CRUD actions use toast/SweetAlert
- Responsive and modern UI

## 📄 License

This project is private and not licensed for public use.

## 👤 Author

**Samiun Auntor**
- GitHub: [@SamiunAuntor](https://github.com/SamiunAuntor)

---

Built with ❤️ using React, Vite, and MongoDB
