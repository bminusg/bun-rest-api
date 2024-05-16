import { Hono } from "hono";
import {
  getOneUser,
  getAllUsers,
  postUser,
} from "api/v1/users/users.controller";

const app = new Hono();

// GET
app.get("/", getAllUsers);
app.get("/:id", getOneUser);

// POST
app.post("/", postUser);

export default app;
