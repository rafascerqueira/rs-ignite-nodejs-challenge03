import jwt from "jsonwebtoken";

export type TokenOptions = {
  expiresIn: string;
};

export type TokenPayload = {
  sub: string;
  name: string;
};

export class JWTservice {
  constructor(private readonly secret: string) {}

  generateToken(
    payload: TokenPayload,
    options: TokenOptions = {
      expiresIn: "1h",
    }
  ) {
    try {
      return jwt.sign(payload, this.secret, options);
    } catch (error) {
      throw new Error("Failed to generate token");
    }
  }

  verifyToken(token: string) {
    try {
      return jwt.verify(token, this.secret);
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error("Token expired");
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error("Invalid token");
      }
      throw new Error("Failed to verify token");
    }
  }

  decodeToken(token: string) {
    try {
      return jwt.decode(token);
    } catch (error) {
      throw new Error("Failed to decode token");
    }
  }

  refreshToken(token: string, options: TokenOptions) {
    try {
      return jwt.sign({}, this.secret, (options = { expiresIn: "1d" }));
    } catch (error) {
      throw new Error("Failed to refresh token");
    }
  }
}
