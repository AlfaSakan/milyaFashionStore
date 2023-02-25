import { cookiesKey } from "$lib/constants/cookies.constant";
import { errorMessages } from "$lib/constants/error.contant";
import type { SignUpDto } from "$lib/schema/user.schema";
import { generateToken } from "$lib/server/jwt-token";
import { prisma } from "$lib/server/prisma";
import { generateUnixSecond } from "$lib/utils/date.util";
import { generateHash } from "$lib/utils/hash.util";
import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load = (async () => {
  return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
  signUp: async ({ request, cookies }) => {
    const formData = Object.fromEntries(await request.formData()) as SignUpDto;

    const findUser = await prisma.user.findUnique({
      where: { email: formData.email },
    });

    if (findUser) {
      return fail(400, { email: errorMessages["email-taken"] });
    }

    const hash = await generateHash(formData.password);

    const user = await prisma.user.create({
      data: {
        email: formData.email,
        createdAt: generateUnixSecond(),
        updatedAt: generateUnixSecond(),
        hash,
        name: "",
      },
    });

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
