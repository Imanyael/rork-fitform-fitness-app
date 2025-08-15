import { z } from "zod";
import { publicProcedure } from "../../../create-context.js";

export default publicProcedure
  .input(z.object({ userId: z.string() }))
  .query(async ({ input }) => {
    // Mock data - in a real app, this would come from a database
    const mockWorkouts = [
      {
        id: 'workout_1',
        userId: input.userId,
        exerciseName: 'Tennis Serve',
        workoutType: 'tennis-serve' as const,
        startedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        endedAt: new Date(Date.now() - 86400000 + 1800000).toISOString(), // 30 min later
        averageFormScore: 85,
        status: 'completed' as const,
      },
      {
        id: 'workout_2',
        userId: input.userId,
        exerciseName: 'Boxing Combo',
        workoutType: 'boxing-combo' as const,
        startedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        endedAt: new Date(Date.now() - 172800000 + 2400000).toISOString(), // 40 min later
        averageFormScore: 92,
        status: 'completed' as const,
      },
    ];

    return {
      workouts: mockWorkouts,
      totalCount: mockWorkouts.length,
    };
  });