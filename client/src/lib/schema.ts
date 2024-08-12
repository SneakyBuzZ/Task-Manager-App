import { z } from 'zod';

export const createTaskSchema = z.object({
  taskTitle: z.string().min(2).max(50),
  taskDescription: z.string().min(10).max(100),
});
