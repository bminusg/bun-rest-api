import { Context } from "hono";
import { createUser, getUsers } from "./user.services";
import errorHandler from "utils/errorHandler";

export const getAllUsers = async (c: Context) => {
  try {
    const { data, error } = await getUsers();
    return c.json({ data, error }, 200);
  } catch (error: any) {
    console.error(error);
    return c.json(
      { data: null, error: { message: error?.message ?? error, status: 500 } },
      500
    );
  }
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
    const errorMessage = errorHandler(error);

    return c.json({ data: null, error: errorMessage }, errorMessage.status);
  }
};
