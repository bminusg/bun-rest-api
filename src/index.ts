import { Hono } from "hono";
import { secureHeaders } from "hono/secure-headers";
import limiter from "middlewares/limiter";
import userRoutes from "api/v1/users/users.routes";

const app = new Hono();

// MIDDLEWARES
app.use(secureHeaders());
app.use(limiter);

// ROUTES
app.route("/v1/users", userRoutes);

export default app;
