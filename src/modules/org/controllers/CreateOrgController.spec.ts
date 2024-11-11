import request from "supertest";

import { app } from "src/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("CreateOrgController (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a new org", async () => {
    const response = await request(app.server).post("/orgs/create").send({
      name: "Herzog, Olson and Anderson",
      address: "64807 Mallory Point",
      neighborhood: "Dottie",
      city: "Celestynów",
      whatsapp: "540-236-2758",
      password: "tL1#kjKTQX%",
    });

    expect(response.status).toBe(201);
  });
});
