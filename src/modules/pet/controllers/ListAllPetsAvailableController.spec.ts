import request from "supertest";
import { app } from "src/app";
import { describe, expect, it, beforeAll, afterAll } from "vitest";

describe("ListAllPetsAvailableController (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to list all pets available", async () => {
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

    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${authResponse.body.authenticate_token}`)
      .send({
        name: "Gojira",
        age: "1",
        size: "middle",
        weight: "2",
        description: "a little lizard",
        species: "lizard",
      });

    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${authResponse.body.authenticate_token}`)
      .send({
        name: "Beawolf",
        age: "3",
        size: "big",
        weight: "2",
        description: "a huge Lupus",
        species: "wolf",
      });

    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer someone-else-token`)
      .send({
        name: "Corgi",
        age: "3",
        size: "big",
        weight: "4",
        description: "a good boy(dog)",
        species: "dog",
      });

    const response = await request(app.server)
      .get("/pets/list")
      .query({ city: "Celestynów" });

    expect(response.status).toBe(200);
    expect(response.body.pets).toHaveLength(2);
  });
});
