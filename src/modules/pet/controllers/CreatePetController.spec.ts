import request from "supertest";
import { app } from "src/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("CreatePetController (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a new pet", async () => {
    await request(app.server).post("/orgs/create").send({
      name: "Herzog, Olson and Anderson",
      address: "64807 Mallory Point",
      neighborhood: "Dottie",
      city: "Celestynów",
      whatsapp: "540-236-2758",
      password: "tL1#kjKTQX%",
    });

    const authResponse = await request(app.server).post("/orgs/login").send({
      whatsapp: "540-236-2758",
      password: "tL1#kjKTQX%",
    });

    const response = await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${authResponse.body.authenticate_token}`)
      .send({
        name: "Gojira",
        age: "1",
        size: "small",
        weight: "2",
        description: "a litle lizard",
        species: "bird",
      });

    expect(response.status).toBe(201);
  });
});
