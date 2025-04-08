 CAD Block Viewer 🧱

A full-stack web app to upload DXF CAD files, extract block data (name, type, coordinates), and view or filter the results with a modern UI. Built with Node.js, Express, PostgreSQL, and React.

---

 🌐 Live Demo

> _Optional: Add your deployed URL or a Loom video demo here._

---

 📄 Features

- Upload `.dxf` files from your machine
    
- Parse block data (name, type, coordinates)
    
- Store and retrieve data from PostgreSQL
    
- Search and filter blocks
    
- View block details with coordinates
    
- React frontend with live updates
    

---

 🎓 Tech Stack

 Backend:

- Node.js
    
- Express.js
    
- PostgreSQL
    
- Sequelize ORM reasone to be used as it is (Abstraction & Simplicity ,Cross-Database Support)
    
- dxf-parser (for CAD parsing)
    

 Frontend:

- React + TypeScript
    
- Vite
    
- CSS Modules / Tailwind CSS (choose one)
    

---

 🚀 Setup Instructions

 Prerequisites

- Node.js
    
- PostgreSQL (v13+)

- .env contains database connection

 Backend

```
cd backend
npm install
npx sequelize db:migrate
npm run dev
```

 Frontend

```
cd frontend
npm install
npm run dev
```

 Database Setup

1. Create a database:
    
    ```
    CREATE DATABASE cad_blocks;
    ```
    
2. Run the SQL from `/db/schema.sql`
    

---

 📂 Database Schema

```
-- Files table
CREATE TABLE files (
  id SERIAL PRIMARY KEY,
  file_name TEXT NOT NULL,
  upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Blocks table
CREATE TABLE blocks (
  id SERIAL PRIMARY KEY,
  block_name TEXT NOT NULL,
  type TEXT,
  coordinates JSONB,
  file_id INTEGER REFERENCES files(id) ON DELETE CASCADE
);


- `blocks.coordinates`: stored as JSONB: `[{ x: 100, y: 200 }, ...]`
    

---

 🔍 API Documentation is implemented here as swagger you can run the backend application and see the documents by http://localhost:5000/docs/

 Upload CAD File

```
POST /api/files
FormData: { file: File }
```

- Parses DXF, stores file and blocks
    

 Get Blocks

```
GET /api/blocks?page=1&limit=10&search=model
```

- Searchable and paginated block list
    

 Get Block by ID

```
GET /api/blocks/:id
```

- Full details of a block
    

---

 🔨 Reasoning Behind Library Choices

- dxf-parser: Lightweight, well-maintained, perfect for DXF block extraction.
    
- Sequelize: Cleaner syntax and robust support for migrations, eager loading, and validations.
    
- React + Vite: Fast dev environment, optimized builds.
    

---

 ❌ Error Handling Strategy

- All routes return proper status codes:
    
    - 400 for validation errors
        
    - 404 if block not found
        
    - 500 for internal server errors
        
- Sequelize `try/catch` wrappers in services/controllers
    
- Centralized error middleware
    

---

 ✉️ Input Validation

- Validates uploaded file type (only `.dxf`)
    
- Uses `express-validator` for query parameters and path variables
    

---

 📊 Unit Tests (Sample)

```
// backend/tests/blockService.test.js
import { parseDxf } from '../services/parser';

test('should extract blocks from sample DXF file', async () => {
  const result = await parseDxf('./__tests__/sample.dxf');
  expect(Array.isArray(result)).toBe(true);
  expect(result[0]).toHaveProperty('name');
});

// backend/tests/api.test.js
import request from 'supertest';
import app from '../index';

test('GET /api/blocks returns blocks', async () => {
  const res = await request(app).get('/api/blocks');
  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body.blocks)).toBe(true);
});
```

---

 🤔 Challenges Faced

- DXF parsing: Incomplete or complex files sometimes lacked block metadata.
    
    > Solved by testing with multiple sample files.
    
- Coordinate mapping: Decided to store as JSON for simplicity and flexibility.
    

---

 🧑‍💻 AI Tools Used

- Used ChatGPT for initial structure planning, validation rules, and code snippets
    
- Used GitHub Copilot for React/Express boilerplate and route handler suggestions
    

---

## 🎬 Demo Video
> _Uploaded a video demonstrating file upload, list view, and block details._

---

## 📦 Deliverables
- [x] GitHub Repo
- [x] `README.md`
- [x] `/db/schema.sql`
- [x] Frontend UI
- [x] Backend API with validation
- [x] Unit tests
- [x] Demo Video