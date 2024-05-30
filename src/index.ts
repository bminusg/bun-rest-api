import { Hono } from "hono";
import { secureHeaders } from "hono/secure-headers";
import userRoutes from "api/v1/users/users.routes";

const app = new Hono();

// MIDDLEWARES
app.use(secureHeaders());

// ROUTES
app.route("/v1/users", userRoutes);

export default app;
