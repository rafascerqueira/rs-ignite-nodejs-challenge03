import { AuthenticateOrgController } from "@modules/org/controllers/authenticateOrgController";
import { CreateOrgController } from "@modules/org/controllers/CreateOrgController";
import { FindOrgByCityController } from "@modules/org/controllers/FindOrgByCityController";
import { FastifyInstance } from "fastify";

const createOrgController = new CreateOrgController();
const authenticateOrgController = new AuthenticateOrgController();
const findOrgByCityController = new FindOrgByCityController();

export async function orgRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    return { hello: "orgs" };
  });

  app.get("/me", () => {});

  app.post("/create", createOrgController.handle);
  app.post("/login", authenticateOrgController.handle);
  app.get("/find", findOrgByCityController.handle);
}
