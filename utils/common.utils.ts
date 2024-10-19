import { ParseParams, z } from "zod";

import { isProd } from "@/constants/env.constants";

export const schemaParse =
  <Schema extends z.AnyZodObject>(schema: Schema) =>
  (data: unknown, params?: ParseParams): z.infer<Schema> => {
    try {
      return schema.parse(data, params);
      // TODO: remove this when all schemas are fixed
    } catch (error) {
      if (!isProd) {
        console.error(
          "Error parsing data with schema:",
          JSON.stringify(error, null, 2)
        );
        throw error;
      }

      return data as z.infer<Schema>;
    }
  };
