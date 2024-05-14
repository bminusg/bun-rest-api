import { expect, test, describe } from "bun:test";
import { testClient } from "hono/testing";
import app from "index";

describe("E2E", () => {
  test("[GET] - v1/users", async (done) => {
    const res = await testClient(app).v1.users.$get();
    const data = await res.json();

    expect(data).toBeDefined();
    done();
  });
});
