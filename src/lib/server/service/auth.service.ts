import type { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../jwt-token";

export class AuthService {
  expired = false;
  data: JwtPayload = {};
  accessToken = "";
  refreshToken = "";

  constructor() {
    this.verifyAccessToken();
  }

  setToken(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  verifyAccessToken() {
    const verify = verifyToken(this.accessToken);

    if (verify.error !== null) {
      this.verifyRefreshToken();
      return;
    }

    this.data = verify.data;
  }

  verifyRefreshToken() {
    const verify = verifyToken(this.refreshToken);

    if (verify.error !== null) {
      this.expired = true;
      return null;
    }

    this.data = verify.data;
  }
}
