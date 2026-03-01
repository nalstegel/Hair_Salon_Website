# 💇‍♀️ Salon Management & Booking System

A full-stack web application built for a premium hair salon. It features a client-facing multilingual booking system and a secure admin dashboard for managing appointments and publishing blog posts.

## ✨ Features

**For Clients:**
* 📅 **Smart Booking System:** Dynamic availability calculation based on service duration and staff schedules.
* 🌍 **Multilingual:** Full support for Slovenian and Italian languages (UI & Content).
* 📖 **Blog & Pricing:** Dynamically fetched pricing lists and articles.

**For Admins (CMS):**
* 🔒 **Secure Dashboard:** JWT-based authentication for salon managers.
* 📝 **Appointment Management:** View, edit, and delete client bookings.
* ✍️ **Blog Editor:** Custom CMS to write, edit, and publish dual-language blog posts with HTML support.
* 🏆 **Loyalty program:** View, add, edit loyal customers & their sum of money spent.

## 🛠️ Tech Stack

* **Frontend:** React.js, React Router, Context API (for localization), CSS3
* **Backend:** Node.js, Express.js
* **Database:** MySQL (mysql2)
* **Security:** JWT (JSON Web Tokens), bcryptjs for password hashing

## 🚀 Getting Started (Local Development)

### Prerequisites
* Node.js (v16+)
* MySQL server

### 1. Clone & Install
```bash
git clone [https://github.com/nalstegel/Hair_Salon_Website.git](https://github.com/nalstegel/Hair_Salon_Website.git)
cd Hair_Salon_Website

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
