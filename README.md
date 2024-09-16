# PC Registration System

This repository contains the PC Registration System developed for university students. The system aims to register students' PCs for secure usage within the university premises and to monitor when PCs are taken out of the university. This project was developed during our internship program at Kuraz Tech, and we want to extend our heartfelt gratitude to the entire Kuraz Tech team for their support and guidance throughout the development process.

## About Kuraz Tech

Kuraz Tech provided us with an invaluable opportunity to work on this project, offering mentorship, resources, and a collaborative environment that greatly contributed to our learning and development. We are grateful for their dedication to nurturing young talent and supporting our growth as software developers.

## System Overview

The PC Registration System is designed to:

- Register students' PCs when they are brought into the university.
- Generate a QR code for each registered PC.
- Allow admins to scan the QR code when a PC is taken out of the university to ensure proper authorization.
- Include two types of users:
  - **Super Admin**: Manages all students and admins.
  - **Admin**: Registers students' PCs through a mobile app.
- The system comprises a website for the super admin and a mobile app for the admin to facilitate PC registration.

## Features

- **Student PC Registration**: Admins can register PCs brought by students and generate a unique QR code for each registered PC.
- **QR Code Scanning**: When a student takes their PC out of the university, the admin scans the QR code to ensure it's authorized.
- **User Roles**:
  - **Super Admin**: Manages the entire system, including overseeing admins and all registered PCs. Accessed through a website.
  - **Admin**: Registers student PCs and scans QR codes. Admins are registered by the super admin and use a mobile app for their tasks.
  
## Getting Started

To use this repository, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/gt-yordanos/pc-registration-system.git
   ```
2. Navigate to the project directory:
   ```bash
   cd pc-registration-system
```
