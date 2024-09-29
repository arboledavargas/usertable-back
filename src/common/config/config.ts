import { z } from 'zod';

export const validate = z.object({
    PORT: z.string(),
    DATABASE_URL: z.string(),
}).parse(process.env);