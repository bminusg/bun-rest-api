import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia } from "lucia";
import db from "database/client";
import { users, sessions } from "database/schema";

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);
const lucia = new Lucia(adapter);

export const createSession = async (userId: string) => {
  try {
    const session = await lucia.createSession(userId, {});
    return session;
  } catch (error: any) {
    console.error(error);
  }
};

export const validateSession = async (sessionId: string) => {
  try {
    const { session, user } = await lucia.validateSession(sessionId);
    return { session, user };
  } catch (error) {
    console.error(error);
  }
};
