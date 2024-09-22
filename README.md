# PC Registration System

This repository contains the **PC Registration System** developed for university students. The system aims to register students' PCs for secure usage within the university premises and to monitor when PCs are taken out of the university. This project was developed during our internship program at **Kuraz Tech**, and we want to extend our heartfelt gratitude to the entire Kuraz Tech team for their support and guidance throughout the development process.

## About Kuraz Tech

Kuraz Tech provided us with an invaluable opportunity to work on this project, offering mentorship, resources, and a collaborative environment that greatly contributed to our learning and development. We are grateful for their dedication to nurturing young talent and supporting our growth as software developers.

## Table of Contents

- [System Overview](#system-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Acknowledgments](#acknowledgments)

## System Overview

The **PC Registration System** is designed to:

- Register students' PCs when they are brought into the university.
- Generate a QR code for each registered PC.
- Allow admins to scan the QR code when a PC is taken out of the university to ensure proper authorization.
- Include two types of users:
  - **Super Admin**: Manages all students and admins via a web application.
  - **Admin**: Registers students' PCs and scans QR codes using a mobile app.

## Features

- **Student PC Registration**: Admins can register PCs brought by students and generate a unique QR code for each registered PC.
- **QR Code Scanning**: When a student takes their PC out of the university, the admin scans the QR code to ensure it's authorized.
- **User Roles**:
  - **Super Admin**: Manages the entire system, including overseeing admins and all registered PCs. Accessed through a web application.
  - **Admin**: Registers student PCs and scans QR codes. Admins are registered by the super admin and use a mobile app for their tasks.

## Technologies Used

- **Backend**: PHP (Laravel)
- **Frontend**: JavaScript (React, Tailwind CSS)
- **Mobile App**: [Specify technology, e.g., React Native or Flutter]
  
### Languages:
- PHP: 45.7%
- JavaScript: 20.8%
- C++: 11.6%
- CMake: 9.5%
- Blade: 9.5%
- Swift: 0.8%
- Other: 2.1%

## Folder Structure

The project has a well-organized folder structure separating the backend, frontend, and mobile app components:

```lua
pc-registration-system/
├── backend/
│   ├── app/
│   ├── bootstrap/
│   ├── config/
│   ├── database/
│   ├── lang/
│   ├── public/
│   ├── resources/
│   ├── routes/
│   ├── storage/
│   ├── tests/
│   ├── .env.example
│   ├── artisan
│   ├── composer.json
│   ├── composer.lock
│   ├── package.json
│   ├── phpunit.xml
│   ├── README.md
│   └── vite.config.js
├── frontend/
│   ├── dist/
│   ├── public/
│   ├── src/
│   ├── .gitignore
│   ├── README.md
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── mobile/
│   ├── [Mobile app folders and files]
│   ├── README.md
│   └── [Additional configuration files]
├── node_modules/
├── README.md
├── package-lock.json
└── package.json
```
## Getting Started

To set up the project locally, follow these steps:

### Prerequisites

- PHP >= 7.3
- Composer
- Node.js and npm
- Laravel
- React
## Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```
2. Install dependencies:

   ```bash
   composer install
   ```
3. Copy the example environment file and configure it:
   ```bash
   cp .env.example .env
   ```
4. Generate an application key:

   ```bash
   php artisan key:generate
   ```
5. Run database migrations:

   ```bash
   php artisan migrate
   ```
6. Start the development server:

   ```bash
   php artisan serve
   ```
## Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd ../frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the development server:

   ```bash
   npm run dev
   ```
## Mobile App Setup

1. Navigate to the mobile directory:

   ```bash
   cd ../mobile
   ```
2. Install dependencies:

   [Instructions specific to the mobile app technology used, e.g., React Native or Flutter.]

3. Run the mobile app:

   [Instructions on how to run the mobile app on an emulator or device.]

## Acknowledgments

We would like to express our sincere gratitude to **Kuraz Tech** for their unwavering support and guidance throughout this project.
# Contact

For any inquiries or feedback, please contact:

- [gt-yordanos](https://github.com/gt-yordanos)
- [Yabe12](https://github.com/Yabe12)
- [Yordito](https://github.com/Yordito)
- [bezawitsebsibe](https://github.com/bezawitsebsibe)
- [maki-max](https://github.com/maki-max)
- [edenzewdu](https://github.com/edenzewdu)
- [Elsabeth721](https://github.com/Elsabeth721)
- [YetuAb](https://github.com/YetuAb)
- [eteaby](https://github.com/eteaby)

Feel free to explore, contribute, or raise issues to help us improve the system.

