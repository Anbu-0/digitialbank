🏦 BlueVault Digital Banking

A secure full-stack Digital Banking application built using Spring Boot, Spring Security, JWT, MySQL, HTML, CSS, and JavaScript.

BlueVault simulates real-world banking operations including authentication, account management, deposits, withdrawals, and inter-user fund transfers using a secure stateless architecture.

🚀 Project Overview

BlueVault Digital Banking is a REST-based backend system with a dynamic frontend interface.
It focuses on:

Secure JWT authentication

Layered backend architecture

Real-world banking workflows

Persistent transaction management

Secure inter-user fund transfer

The application follows industry best practices for API design and security implementation.

🔐 Security Implementation
🔒 Password Protection

Passwords encrypted using BCrypt hashing

No plain-text password storage

🔑 JWT Authentication

Token generated after successful login

Stateless authentication (no server-side sessions)

Protected endpoints require:

Authorization: Bearer <JWT_TOKEN>

🛡 Secure API Filtering

Spring Security configuration

JWT validation filter

Unauthorized access handling

🏗 System Architecture

BlueVault follows a clean layered architecture:

Frontend (HTML + CSS + JavaScript)
↓
REST Controller Layer
↓
Service Layer (Business Logic)
↓
Repository Layer (JPA/Hibernate)
↓
MySQL Database

This structure ensures:

Separation of concerns

Maintainability

Scalability

Secure request handling

💳 Core Functionalities
👤 User Module (/api/user/)

Base API Path:

/api/user/

Features:

Secure Registration

Login with JWT generation

Auto-generated 7-digit account number

View account details

Deposit funds

Withdraw funds

Transfer money between users

Balance validation before transactions

Transaction persistence

🔄 Fund Transfer Logic

BlueVault supports secure inter-user transfers:

Sender balance validation

Atomic transaction processing

Deduction from sender

Credit to receiver

Transaction record creation

This simulates real-world banking transfer behavior.

🗄 Database Design
User Entity

id (Primary Key)

name

email (Unique)

encrypted password

accountNumber (7-digit unique)

balance

Transaction Entity

id

type (Deposit / Withdraw / Transfer)

amount

timestamp

sender_id

receiver_id (for transfers)

Managed using JPA/Hibernate ORM.

🛠 Tech Stack
Backend

Java 17

Spring Boot

Spring Security

JWT (JSON Web Token)

Hibernate / JPA

MySQL

Frontend

HTML5

CSS3

JavaScript (Fetch API for REST calls)

Tools

Eclipse IDE

Postman

MySQL Workbench

🧪 API Overview

All endpoints are under:

/api/user/


Example operations:

Method	Endpoint	Description
POST	/api/user/register	Register new user
POST	/api/user/login	Authenticate & get JWT
GET	/api/user/details	View account details
POST	/api/user/deposit	Deposit funds
POST	/api/user/withdraw	Withdraw funds
POST	/api/user/transfer	Transfer money to another user

All protected endpoints require JWT authentication.

🎯 Key Highlights

Stateless authentication architecture

JWT-based authorization

BCrypt password encryption

Secure inter-user fund transfer

Clean layered backend structure

Real-world banking flow simulation

JavaScript-integrated frontend consuming REST APIs

📈 Future Enhancements

Role-based access control (Admin/User)

Email/SMS transaction alerts

Transaction PDF receipts

Two-factor authentication (2FA)

Audit logging system

Enhanced UI/UX improvements

👨‍💻 Developer

Anbu Sakthi S
Email : anbusakthiseenivasan@gmail.com
