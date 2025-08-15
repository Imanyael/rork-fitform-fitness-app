import { z } from "zod";
import { publicProcedure } from "../../../create-context";

const profileSchema = z.object({
  userId: z.string(),
  name: z.string(),
  age: z.number().min(13).max(120),
  height: z.number().positive(), // in cm
  weight: z.number().positive(), // in kg
  fitnessLevel: z.enum(['beginner', 'intermediate', 'advanced']),
  goals: z.array(z.string()),
  injuries: z.array(z.string()).optional(),
});

export default publicProcedure
  .input(profileSchema)
  .mutation(async ({ input }) => {
    // In a real app, this would save to a database
    const profile = {
      ...input,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    console.log('Creating/updating user profile:', profile);
    
    return {
      success: true,
      profile,
    };
  });