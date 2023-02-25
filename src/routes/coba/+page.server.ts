import type { Actions } from "./$types";

export const actions: Actions = {
  add: async ({ request }) => {
    const data = await request.formData();

    const file = data.get("file");

    let filename;

    try {
      if (file) {
        const ext = file.name.split(".").pop();
        filename = "userName" + "-" + Date.now().toString() + "." + ext;

        const ab = await file.arrayBuffer();
        console.log({ ab: Array.from(ab) });

        // writeFileSync(
        //   `static/img/${filename}`,
        //   Buffer.from(ab, (e) => {
        //     console.log(e);
        //   })
        // );
      }

      return { success: true };
    } catch (e) {
      console.log(e);
      return { success: false };
    }
  },
};
