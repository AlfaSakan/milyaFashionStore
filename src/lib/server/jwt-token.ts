import { env } from "$lib/server/constants/env.constant";
import jwt, { type JwtPayload } from "jsonwebtoken";

type Payload = {
  userId: string;
  email: string;
};

export function signJwt(payload: string | object, expiresIn: string | number) {
  try {
    if (!env.jwtKey) throw new Error("JWT KEY undefined");

    return jwt.sign(payload, env.jwtKey, {
      expiresIn,
    });
  } catch (e) {
    console.warn(e);
  }
}

export function generateToken(payload: Payload) {
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  if (!accessToken || !refreshToken) return undefined;

  return { accessToken, refreshToken };
}

function generateAccessToken(payload: Payload) {
  return signJwt(payload, "1h");
}

function generateRefreshToken(payload: Payload) {
  return signJwt(payload, "30 days");
}

export function verifyToken(token: string) {
  try {
    if (!env.jwtKey) throw new Error("JWT KEY undefined");

    const data = jwt.verify(token, env.jwtKey) as JwtPayload & Payload;

    return { data, error: null };
  } catch (error) {
    return { data: null, error: "expired" };
  }
}
