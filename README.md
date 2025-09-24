# Kanha Inn - Guest Registration System

A modern, comprehensive, and responsive web application designed to streamline the guest registration process for Kanha Inn. This system provides a clean, user-friendly interface for hotel staff to capture detailed guest information efficiently.

---

## ✨ Key Features

-   **Dynamic Multi-Step Form**: Organizes complex information into logical sections: Booking Details, Primary Guest, and Secondary Guests.
-   **Primary & Secondary Guests**: Easily capture details for the primary guest and add or remove multiple secondary guests as needed.
-   **ID Document Uploads**: Securely upload front and back images of guest identification documents.
-   **Comprehensive Validation**: Robust client-side validation ensures data integrity with clear, user-friendly error messages.
-   **Responsive Design**: A fully responsive layout built with Tailwind CSS, ensuring a seamless experience on desktops, tablets, and mobile devices.
-   **Modern UI/UX**: A clean, aesthetically pleasing interface with smooth transitions and loading states for an enhanced user experience.
-   **Submission Feedback**: Displays a success screen with a unique, system-generated Booking ID upon successful registration.
-   **Type-Safe Code**: Built with TypeScript for improved developer experience and code maintainability.

---

## 🚀 Tech Stack

-   **Frontend**:
    -   [React](https://reactjs.org/)
    -   [TypeScript](https://www.typescriptlang.org/)
-   **Styling**:
    -   [Tailwind CSS](https://tailwindcss.com/)
-   **Tooling**:
    -   Dependencies are loaded via CDN, allowing for a build-free, static setup.

---

## 📂 Project Structure

The project is organized with a focus on modularity and separation of concerns.

```
/
├── components/               # Reusable React components
│   ├── icons/                # SVG icon components
│   │   ├── CheckCircleIcon.tsx
│   │   ├── PlusIcon.tsx
│   │   └── TrashIcon.tsx
│   ├── FileUploadField.tsx
│   ├── Header.tsx
│   ├── InputField.tsx
│   ├── Section.tsx
│   └── SelectField.tsx
│
├── App.tsx                   # Main application component with state and logic
├── constants.ts              # Application-wide constants (e.g., room types)
├── index.html                # HTML entry point, loads Tailwind CSS and React
├── index.tsx                 # React application entry point
├── metadata.json             # Application metadata
└── types.ts                  # TypeScript type definitions and interfaces
```

---

## 🏁 Getting Started

This application is configured to run without a build step, making it incredibly easy to get started.

### Prerequisites

You only need a modern web browser that can run JavaScript.

### Running Locally

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/kanha-inn-registration.git
    cd kanha-inn-registration
    ```

2.  **Open in a browser:**
    Simply open the `index.html` file directly in your web browser.

    *Note: For the best experience, it's recommended to serve the files using a simple local web server to avoid potential issues with browser security policies (like CORS if you were to add API calls).*

3.  **Using a local server (Optional but Recommended):**
    If you have Node.js installed, you can use `serve`:
    ```bash
    # Install serve globally (if you haven't already)
    npm install -g serve

    # Run the server in the project directory
    serve .
    ```
    Then, open your browser and navigate to the URL provided by the server (e.g., `http://localhost:3000`).

---

## 🛠️ How It Works

The application's logic is primarily handled within the `App.tsx` component using React hooks.

-   **State Management**: The entire form's state, including all guest information and uploaded files, is managed using the `useState` hook.
-   **Component-Based Architecture**: The UI is broken down into small, reusable components located in the `src/components` directory. This promotes code reuse and maintainability.
-   **Validation Logic**: The `validateForm` function checks all required fields and data formats before allowing submission. Any validation errors are stored in the state and displayed next to the relevant form fields.
-   **Simulated API Call**: The `handleSubmit` function currently simulates a backend API call using `setTimeout`. In a real-world scenario, this is where you would use `fetch` or `axios` to send the form data to a server.

---

## 🔮 Future Enhancements

This project serves as an excellent foundation. Future improvements could include:

-   **Backend Integration**: Connect the form to a real backend service (e.g., Node.js/Express, Python/Django) to persist registration data in a database (e.g., PostgreSQL, MongoDB).
-   **Cloud Storage for Uploads**: Integrate with a cloud storage service like AWS S3 or Google Cloud Storage for handling file uploads.
-   **Admin Dashboard**: Create a secure dashboard for hotel staff to view, manage, and search guest registrations.
-   **User Authentication**: Implement authentication for hotel staff to ensure secure access.
-   **Email/SMS Notifications**: Automatically send booking confirmation details to guests upon successful registration.
-   **Date Picker with Availability**: Replace the standard date input with an interactive calendar that shows room availability.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
`
