import { app } from "./app";
import { env } from "./env";

app.listen({
  host: env.HOST,
  port: Number(env.PORT),
}).then(() => {
  console.log(`🚀 Server is running on http://${env.HOST}:${env.PORT}`);
});