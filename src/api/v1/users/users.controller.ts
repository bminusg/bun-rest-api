import { Context } from "hono";

export const getAllUsers = (c: Context) => {
  return c.json("get all users", 200);
};

export const getOneUser = (c: Context) => {
  const id = c.req.param("id");
  return c.json("get one user:" + id, 200);
};
