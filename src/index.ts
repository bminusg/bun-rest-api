import { Hono } from "hono";
import userRoutes from "api/v1/users/users.routes";

const app = new Hono();

// ROUTES
app.route("/v1/users", userRoutes);

export default app;
