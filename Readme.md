# KaamSewa Backend (TypeScript)

**KaamSewa** is a Nepali-first, service-based hiring platform where users can find and book verified technicians. This repository contains the **backend API** written in **Node.js + TypeScript**, using a modern stack: **Express**, **MongoDB**, **Redis**, **BullMQ**, and **Cloudinary**.

---

## 🚀 Features

- ✅ TypeScript-first backend
- ✅ JWT-based auth with refresh tokens
- ✅ Multer + Cloudinary for image uploads
- ✅ BullMQ + Redis for job queues
- ✅ Email job queues with workers
- ✅ Role-based access: customer, technician, admin
- ✅ Modular structure, scalable codebase
- ✅ Real-time notifications (optional with WebSockets)

---

## 🛠️ Stack

| Tool        | Purpose                         |
|-------------|----------------------------------|
| Node.js     | Backend runtime                 |
| TypeScript  | Type-safe development            |
| Express     | API routing                     |
| MongoDB     | Database                        |
| Mongoose    | ODM for MongoDB                 |
| Redis       | Queue & job storage             |
| BullMQ      | Queue processing                |
| Cloudinary  | Media storage                   |
| Zod         | Validation (optional)           |
| JWT         | Authentication                  |

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/kaamsewa-backend.git
cd kaamsewa-backend
```

## 2 Install Dependencies
Install the required packages:

```bash
npm install