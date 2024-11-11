import jwt from "jsonwebtoken";

declare module "jwt" {
  export interface orgJwtPayload extends jwt.JwtPayload {
    name: string;
  }
}
