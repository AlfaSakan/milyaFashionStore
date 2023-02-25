import { cookiesKey } from "$lib/constants/cookies.constant";
import { errorMessages } from "$lib/constants/error.contant";
import type { LoginDto } from "$lib/schema/user.schema";
import { generateToken } from "$lib/server/jwt-token";
import { prisma } from "$lib/server/prisma";
import { generateUnixSecond } from "$lib/utils/date.util";
import { generateHash, verifyHash } from "$lib/utils/hash.util";
import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load = (async () => {
  return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
  signIn: async ({ request, cookies }) => {
    const formData = Object.fromEntries(await request.formData()) as LoginDto;

    const user = await prisma.user.findUnique({
      where: { email: formData.email },
    });

    if (!user) return fail(400, { email: errorMessages["email-not-register"] });

    const verifyPassword = await verifyHash(user.hash, formData.password);
    if (!verifyPassword)
      return fail(401, { password: errorMessages["password-wrong"] });

    const token = generateToken({ email: user.email, userId: user.id });
    if (!token) throw error(500, { message: errorMessages["server-error"] });

    cookies.set(cookiesKey.accessKey, token.accessToken);
    cookies.set(cookiesKey.refreshKey, token.refreshToken);

    const hashToken = await generateHash(token.refreshToken);

    await prisma.session.create({
      data: {
        createdAt: generateUnixSecond(),
        updatedAt: generateUnixSecond(),
        hashToken,
        userAgent: request.headers.get("user-agent") || "",
        userId: user.id,
      },
    });

    throw redirect(303, "/");
  },
};
