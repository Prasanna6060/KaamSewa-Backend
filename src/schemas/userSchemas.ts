import {z} from 'zod';


export const userRegisterSchema = z.object({
  name:z.string(),
  email: z.string(),
  password: z.string().min(8),
  role: z.enum(["Admin", "Technician", "User"])
})



export const userLoginSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string().min(8),
  role: z.enum(["Admin", "Technician", "User"])
});

