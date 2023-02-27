import { errorMessages } from "$lib/constants/error.contant";
import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ parent }) => {
  const { user } = await parent();

  const [parentValue] = await Promise.allSettled([parent()]);

  if (parentValue.status === "rejected")
    throw error(500, errorMessages["server-error"]);

  console.log({ user });

  if (user?.level !== "amel") throw error(403, errorMessages.forbidden);

  return { user };
};
