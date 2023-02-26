import { describe, expect, it } from "vitest";
import { z } from "zod";
import { validateData } from "./validate-data.util";

describe("validateData", () => {
  it("should be able to validate email", () => {
    const email = "admin@gmail.com";
    const res = validateData(email, z.string().email());

    expect(res.data).toBe(email);
  });

  it("should return error message invalid email in object", () => {
    const email = "admin@gmail";
    const res = validateData(
      { email },
      z.object({ email: z.string().email() })
    );

    expect(res.errors).toEqual({ email: "Invalid email" });
    expect(res.data).toEqual({ email });
  });
});
