import * as zod from "zod";

export const formSchema = zod.object({
    name: zod.string().min(4).max(100),
    description: zod.string().optional(),
  });
  
export type formSchemaType = zod.infer<typeof formSchema>;