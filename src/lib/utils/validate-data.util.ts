import type { ZodError, ZodSchema } from "zod";

export function validateData<DataType>(
  data: DataType,
  schema: ZodSchema<DataType>
) {
  try {
    const res = schema.parse(data);

    return { data: res, errors: null };
  } catch (error) {
    const { fieldErrors } = (error as ZodError).flatten();

    const errors: Record<string, string> = {};

    Object.entries(fieldErrors).forEach(([key, value]) => {
      errors[key] = value ? value[0] : "";
    });

    return { data, errors };
  }
}
