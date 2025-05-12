import {z} from 'zod';


export const userLoginSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string().min(8),
  role: z.enum(["Admin", "technician", "user"])
});

