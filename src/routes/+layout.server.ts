import { cookiesKey } from "$lib/constants/cookies.constant";
import { errorMessages } from "$lib/constants/error.contant";
import { AuthService } from "$lib/server/service/auth.service";
import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ cookies, request }) => {
  const accessToken = cookies.get(cookiesKey.accessKey);
  const refreshToken = cookies.get(cookiesKey.refreshKey);
  const authService = new AuthService();

  const [user] = await Promise.allSettled([
    authService.getUserFromToken({
      accessToken: accessToken,
      refreshToken: refreshToken,
      userAgent: request.headers.get("user-agent") || "",
      cookies,
    }),
  ]);

  if (user.status === "rejected")
    throw error(500, { message: errorMessages["server-error"] });

  return { user: user.value };
};
