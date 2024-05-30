import { Hono } from "hono";
import { getOneUser, getAllUsers } from "api/v1/users/users.controller";

const app = new Hono();

// GET
app.get("/", getAllUsers);
app.get("/:id", getOneUser);

export default app;
