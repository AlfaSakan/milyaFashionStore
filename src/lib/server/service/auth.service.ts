import { cookiesKey } from "$lib/constants/cookies.constant";
import { generateUnixSecond } from "$lib/utils/date.util";
import { generateHash } from "$lib/utils/hash.util";
import type { Cookies } from "@sveltejs/kit";
import { generateToken, verifyToken } from "../jwt-token";
// import { prisma } from '../prisma';

export class AuthService {
  verifyAccessToken(accessToken?: string) {
    if (!accessToken) {
      return;
    }

    const verify = verifyToken(accessToken);
    if (verify.error !== null) {
      return;
    }

    return verify.data;
  }

  async getUserFromToken({
    accessToken,
    refreshToken,
    userAgent,
    cookies,
  }: {
    accessToken?: string;
    refreshToken?: string;
    userAgent: string;
    cookies: Cookies;
  }) {
    const data = this.verifyAccessToken(accessToken);

    if (!data) {
      const refreshData = this.verifyAccessToken(refreshToken);
      if (!refreshData) return;

      const token = await this.getNewToken({
        email: refreshData.email,
        userAgent,
        userId: refreshData.userId,
      });
      if (!token) return;

      cookies.set(cookiesKey.accessKey, token.accessToken);
      cookies.set(cookiesKey.refreshKey, token.refreshToken);

      const newData = this.verifyAccessToken(token.accessToken);
      if (!newData) return;

      const user = await prisma.user.findUnique({
        where: { id: newData.userId },
      });
      if (!user) return;

      return { ...user, hash: undefined };
    }

    const user = await prisma.user.findUnique({
      where: { id: data.userId },
    });
    if (!user) return;

    return { ...user, hash: undefined };
  }

  async getNewToken({
    email,
    userAgent,
    userId,
  }: {
    email: string;
    userId: string;
    userAgent: string;
  }) {
    const token = generateToken({ email, userId });
    if (!token) return;

    const hashToken = await generateHash(token.refreshToken);

    await prisma.session.create({
      data: {
        createdAt: generateUnixSecond(),
        updatedAt: generateUnixSecond(),
        hashToken,
        userAgent,
        userId,
      },
    });

    return token;
  }
}
