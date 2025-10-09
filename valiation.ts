import { z } from 'zod';

export const userLanguageSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  email: z.string().email('Invalid email address'),
  languages: z
    .array(z.string())
    .nonempty('Languages must include at least one language'),
  age: z.number().int().min(0, 'Age must be a positive number'),
});

// Partial schema for updates (only languages can be changed)
export const updateLanguagesSchema = z.object({
  languages: z
    .array(z.string())
    .nonempty('Languages must include at least one language'),
});
