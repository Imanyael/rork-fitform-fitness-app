import { z } from "zod";
import { publicProcedure } from "../../../create-context";

export default publicProcedure
  .input(z.object({ userId: z.string() }))
  .query(async ({ input }) => {
    // Mock user stats - in a real app, this would be calculated from database
    const stats = {
      totalWorkouts: 12,
      averageFormScore: 88,
      totalMinutes: 360,
      weeklyGoal: 5,
      currentStreak: 3,
      bestFormScore: 96,
      improvementRate: 12, // percentage improvement over last month
    };

    console.log('Fetching user stats for:', input.userId);
    
    return {
      success: true,
      stats,
    };
  });