import * as zod from "zod";

export const formMailSchema = zod.object({
    adresses: zod.string()
  });
  
export type formMailSchemaType = zod.infer<typeof formMailSchema>;