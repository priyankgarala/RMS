# 🍽️ Real-Time Restaurant Order System

A full-stack restaurant order system built with **Node.js, PostgreSQL, React (Vite)** featuring **real-time order tracking, background workers, and rate limiting**.

---

## 🚀 Features

* 🔐 **Authentication**

  * JWT-based login & registration
  * Protected routes

* 🛒 **Order System**

  * Place orders with multiple items
  * Order status lifecycle: `pending → cooking → ready`

* ⚙️ **Async Processing**

  * Custom in-memory queue
  * Background workers (kitchen simulation)
  * Multiple workers for parallel processing (load balancing concept)

* ⚡ **Real-Time Updates**

  * WebSockets using Socket.IO
  * Instant status updates without polling

* 🚦 **Rate Limiting**

  * Prevents spam orders (max requests per minute)

---

## 🧠 System Architecture

```
Frontend (React)
        ↓
Backend API (Express)
        ↓
Queue (in-memory)
        ↓
Workers (multiple)
        ↓
PostgreSQL DB
        ↓
WebSocket (real-time updates)
        ↓
Frontend (live tracking)
```

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express
* PostgreSQL
* JWT Authentication
* Socket.IO

### Frontend

* React (Vite)
* React Router
* Axios

---

## 📂 Project Structure

```
server/
├── index.js
├── socket.js
├── db/
├── routes/
├── controllers/
├── middleware/
├── queue/
│   ├── queue.js
│   └── worker.js

client/
├── src/
│   ├── pages/
│   ├── components/
│   ├── api/
│   └── socket.js
```

---

## ⚙️ Setup Instructions

### 1. Clone the repo

```
git clone <your-repo-url>
cd project
```

### 2. Backend setup

```
cd server
npm install
```

Create `.env` file:

```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=restaurant_db
DB_PASSWORD=your_password
DB_PORT=5432

JWT_SECRET=your_secret
JWT_EXPIRES_IN=1d

PORT=5000
```

Run server:

```
npm run dev
```

---

### 3. Frontend setup

```
cd client
npm install
npm run dev
```

---

## 🔥 How It Works

1. User places an order
2. Order is stored in DB and pushed to queue
3. Worker picks order and processes it
4. Status updates (`cooking`, `ready`)
5. WebSocket sends updates to frontend instantly

---

## 📌 API Endpoints

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`

### Orders

* `POST /api/orders`
* `GET /api/orders/:id`

---

## 🚧 Future Improvements

* Redis for caching and queue
* WebSocket scaling
* Admin dashboard
* Order history
* Image upload (S3)

---

## 💡 Learnings

* Event-driven architecture
* Real-time systems using WebSockets
* Background job processing
* Rate limiting strategies
* Full-stack system design

---

## 👨‍💻 Author

**Priyank Garala**

---
