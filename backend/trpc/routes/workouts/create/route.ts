import { z } from "zod";
import { publicProcedure } from "../../../create-context.js";

const createWorkoutSchema = z.object({
  userId: z.string(),
  exerciseName: z.string(),
  workoutType: z.enum(['tennis-serve', 'boxing-combo', 'overhead-press']),
  startedAt: z.string().datetime(),
  endedAt: z.string().datetime().optional(),
});

export default publicProcedure
  .input(createWorkoutSchema)
  .mutation(async ({ input }) => {
    // In a real app, this would save to a database
    const workout = {
      id: `workout_${Date.now()}`,
      ...input,
      createdAt: new Date().toISOString(),
      averageFormScore: null,
      status: 'in-progress' as const,
    };

    console.log('Creating workout:', workout);
    
    return {
      success: true,
      workout,
    };
  });