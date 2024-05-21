import { Context } from "hono";
import { createUser, findManyUsers, findOneUser } from "./user.services";
import errorHandler from "utils/errorHandler";

export const getAllUsers = async (c: Context) => {
  try {
    const { data, error } = await findManyUsers();
    return c.json({ data, error }, 200);
  } catch (error: any) {
    const errorMessage = errorHandler(error);
    return c.json({ data: null, error: errorMessage }, errorMessage.status);
  }
};

export const getOneUser = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const { data, error } = await findOneUser({ id });
    return c.json({ data, error }, 200);
  } catch (error: any) {
    const errorMessage = errorHandler(error);
    return c.json({ data: null, error: errorMessage }, errorMessage.status);
  }
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
