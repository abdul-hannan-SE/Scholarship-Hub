# Scholarship Hub

Scholarship Hub is a **MERN-based full-stack web application** that centralizes scholarship opportunities. It scrapes scholarship data from external sources, stores it in a backend database, and provides a user-friendly frontend for browsing, filtering, and saving scholarships.

---

## 🚀 Live Demo

 Click → [Scholarship Hub Live](https://scholarship-hub-seven.vercel.app)

---

## 📖 Overview

Scholarship Hub aims to help students discover and track scholarship opportunities with ease. The system consists of:

* A **scraper** that automatically collects scholarship listings.
* A **backend API** that manages and serves the data.
* A **frontend application** that allows users to search, filter, and bookmark scholarships.

---

## ✨ Features

* 🔍 Search & filter scholarships by category, deadline, and eligibility.
* 💾 Save/bookmark scholarships for quick access.
* ⚡ Automated data scraping to keep listings up-to-date.
* 📱 Responsive UI built for all screen sizes.

---

## 🛠 Tech Stack

* **Frontend**: React, HTML, CSS (Tailwind CSS if added)
* **Backend**: Node.js, Express, MongoDB
* **Scraper**: Puppeteer (or other scraping tools)
* **Deployment**: Vercel / Heroku (optional)

---

## 📂 Project Structure

```
Scholarship-Hub/
├── frontend/     # React app for users
├── backend/      # Express server and APIs
└── scrapper/     # Web scraper to fetch scholarships
```

---

## ⚙️ Installation

Clone the repository and run the following steps:

```bash
# Clone repository
git clone https://github.com/abdul-hannan-SE/Scholarship-Hub.git
cd Scholarship-Hub

# Backend setup
cd backend
npm install
# Configure environment variables (e.g., DB connection string)
npm start

# Frontend setup
cd ../frontend
npm install
npm start

# Scraper setup
cd ../scrapper
npm install
node scrapper.js
```

---

## ▶️ Usage

1. Run the **scraper** to fetch new scholarship data.
2. Start the **backend server**.
3. Start the **frontend app**.
4. Open your browser at `http://localhost:3000` and explore scholarships.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork this repo
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📬 Contact

👤 **Abdul Hannan**
GitHub: [@abdul-hannan-SE](https://github.com/abdul-hannan-SE)
Email: *contact.hannan100@gmail.com*
