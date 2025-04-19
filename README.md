# Production Floor Digitalization – South Georgia Pecan

At **South Georgia Pecan**, a leading pecan processing and manufacturing company, we're taking a digital step forward to improve operational efficiency and record-keeping on the production floor. This project is part of an internal initiative to **digitalize daily activities**, **reduce reliance on physical paperwork**, and **make historical data easily accessible and exportable**. The goal is to streamline workflows, support a diverse workforce, and provide a clean, modern interface for production staff.

---

### 💡 Current Status

This version showcases the **User Interface prototype** – a visual preview of how the final application will look. Functional features like user authentication, role-based access control (RBAC), and multilingual support will be implemented in future development phases.

---

### 🔧 Tech Stack & Key Libraries

- **Frontend Framework:** ReactJS + TypeScript
- **Authentication & RBAC:** [Clerk](https://clerk.dev/) 
- **Database:** MongoDB (NoSQL)
- **Multi-language Support:** [i18next](https://www.i18next.com/) + [react-i18next](https://react.i18next.js.org/)
- **Notifications:** [React Toastify](https://fkhadra.github.io/react-toastify/)

---

### 🧱 Architecture Decision

Given the scoped nature of this project and its limited intended deployment, we have chosen to adopt a **monolithic architecture**. This approach consolidates both the **frontend** and **backend** within a single codebase, allowing for simplified deployment, reduced overhead, and easier maintenance during internal use.

---

### 🔒 Authentication & Session Management

We've implemented a shift-aligned authentication system using cookies to store user information. For seamless production floor usage:

- Cookies automatically expire at fixed times (3PM, 11PM, and 7AM)
- When a user logs in, their session expiration is set to the next time bracket
- This approach aligns with our production shifts and ensures clean session management across shift changes

This design reduces manual logouts and ensures data security while accommodating our 24/7 production schedule.

---

### 🔜 Coming Features

- ✅ Role-Based Access Control (RBAC) for managing user permissions
- ✅ Multi-language support for accessibility across our diverse team
- ✅ Backend integration for storing and retrieving production data
- ✅ Toast-based notifications for real-time user feedback
- ✅ **Export data to Excel (.xlsx) based on a selected date range** – for seamless reporting and analysis in Microsoft Excel

---

### 🚀 Why This Matters

By bringing digital tools to the factory floor, we aim to:
- Enhance productivity and data accuracy
- Support compliance and traceability
- Empower staff with modern, intuitive tools
- Provide flexible reporting and insights through Excel export

This project reflects our ongoing commitment to innovation and continuous improvement at South Georgia Pecan.

---

Stay tuned for updates as we continue building out this platform!

---

## License

This project is licensed under the [Apache 2.0 License](LICENSE).