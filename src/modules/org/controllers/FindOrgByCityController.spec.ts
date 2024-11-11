import request from "supertest";
import { app } from "src/app";
import { describe, expect, it, beforeAll, afterAll } from "vitest";

describe("FindOrgByCityController (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to find an org by city", async () => {
    await request(app.server).post("/orgs/create").send({
      name: "Herzog, Olson and Anderson",
      address: "64807 Mallory Point",
      neighborhood: "Dottie",
      city: "Celestynów",
      whatsapp: "540-236-2758",
      password: "tL1#kjKTQX%",
    });

    const response = await request(app.server)
      .get("/orgs/find")
      .query({ city: "Celestynów" });

    expect(response.status).toBe(200);
  });
});
