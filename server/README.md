# Server (Express + MongoDB)

## Setup
1. Copy `.env.example` to `.env` and set `MONGO_URI`, `PORT`, `FRONTEND_URL`, `BASE_URL`.
2. Install dependencies:
   ```
   cd server
   npm install
   ```
3. Run:
   ```
   npm run dev
   ```
4. POST /api/sessions/start will create a new session (type=admin) and return the session document.
5. GET /api/sessions/:unique_id will fetch session details.

The server implements an auto-increment `id` using a `counters` collection (Counter model).
