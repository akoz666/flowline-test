# Flowline Backend

Todo REST API skeleton backed by in-memory storage (no database).

## Run

```bash
npm install
npm run dev     # start dev server with auto-reload
npm run build   # compile TypeScript to dist/
npm start       # run compiled server
npm test        # run tests
```

The server listens on `PORT` (default `3001`).

## API

| Method | Path        | Description        |
| ------ | ----------- | ------------------- |
| GET    | /health     | Health check         |
| GET    | /todos      | List all todos       |
| POST   | /todos      | Create a todo         |
| GET    | /todos/:id  | Get a todo by id      |
| PUT    | /todos/:id  | Update a todo by id   |
| DELETE | /todos/:id  | Delete a todo by id   |
