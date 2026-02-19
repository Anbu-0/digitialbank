🏦 BlueVault Digital Banking

A secure full-stack Digital Banking application built using Java 21, Spring Boot, Spring Security, JWT, MySQL, HTML, CSS, and JavaScript.

BlueVault simulates real-world banking operations including authentication, account management, deposits, withdrawals, and inter-user fund transfers using a secure stateless architecture.

🚀 Project Overview

BlueVault Digital Banking is a REST-based backend system integrated with a dynamic frontend interface.

The project focuses on:

Secure JWT-based authentication

Clean layered backend architecture

Real-world banking workflows

Secure inter-user fund transfer

Persistent relational database integration

The application follows modern backend engineering practices with emphasis on security, scalability, and maintainability.

🔐 Security Implementation
🔒 Password Security

Passwords encrypted using BCrypt hashing

No plain-text password storage

🔑 JWT Authentication

Token generated upon successful login

Stateless authentication (no server-side sessions)

All protected endpoints require:

Authorization: Bearer <JWT_TOKEN>

🛡 Spring Security Configuration

Custom authentication filter

Token validation per request

Unauthorized request handling

🏗 System Architecture

BlueVault follows a structured layered architecture:

Frontend (HTML + CSS + JavaScript)
↓
Controller Layer (REST APIs)
↓
Service Layer (Business Logic)
↓
Repository Layer (JPA / Hibernate)
↓
MySQL Database

This ensures:

Clear separation of concerns

Maintainable codebase

Scalable backend structure

Secure request processing

💳 Core Functionalities
👤 User Module (/api/user/)

Base API Path:

/api/user/

Implemented Features

Secure User Registration

Login with JWT generation

Auto-generated 7-digit account number

View account details

Deposit funds

Withdraw funds

Transfer money between users

Balance validation before processing transactions

Persistent transaction tracking

🔄 Fund Transfer System

BlueVault supports secure inter-user money transfers:

Sender balance verification

Atomic transaction execution

Debit from sender account

Credit to receiver account

Transfer record stored in database

This simulates a real-world banking transaction workflow.

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

ORM handled via Hibernate (JPA).

🛠 Technology Stack
Backend

Java 21 (LTS)

Spring Boot

Spring Security

JWT (JSON Web Token)

Hibernate / JPA

MySQL

Frontend

HTML5

CSS3

JavaScript (Fetch API for REST integration)

Development Tools

Eclipse IDE

Postman

MySQL Workbench

🧪 API Overview

All endpoints are under:

/api/user/

Method	Endpoint	Description
POST	/api/user/register	Register new user
POST	/api/user/login	Authenticate & receive JWT
GET	/api/user/details	View account details
POST	/api/user/deposit	Deposit funds
POST	/api/user/withdraw	Withdraw funds
POST	/api/user/transfer	Transfer money to another user

All banking operations require JWT authentication.

🎯 Key Highlights

Built using Java 21 (Latest LTS)

Stateless JWT authentication system

Secure BCrypt password encryption

Real-world fund transfer logic

Clean layered backend architecture

RESTful API design

JavaScript-powered frontend integration

📈 Future Improvements

Role-based access control (Admin/User)

Email/SMS transaction alerts

PDF transaction receipts

Two-factor authentication (2FA)

Audit logging system

UI/UX enhancements

👨‍💻 Developer

Anbu Sakthi S
Email : anbusakthiseenivasan@gmail.com
