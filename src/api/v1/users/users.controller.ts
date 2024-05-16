import { Context } from "hono";
import { isUserBodyValid } from "./user.valdiator";
import { createUser } from "./user.services";

export const getAllUsers = (c: Context) => {
  return c.json("get all users", 200);
};

export const getOneUser = (c: Context) => {
  const id = c.req.param("id");
  return c.json("get one user:" + id, 200);
};

export const postUser = async (c: Context) => {
  try {
    const body = await c.req.json();
    const { data, error } = await createUser(body);

    return c.json({ data, error }, 201);
  } catch (error: any) {
    console.error(error);
    return c.json(
      { data: null, error: { message: error?.message ?? error, status: 500 } },
      500
    );
  }
};
