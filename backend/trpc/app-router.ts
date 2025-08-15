import { createTRPCRouter } from "./create-context";
import hiRoute from "./routes/example/hi/route";
import createWorkoutRoute from "./routes/workouts/create/route";
import listWorkoutsRoute from "./routes/workouts/list/route";
import userStatsRoute from "./routes/users/stats/route";
import userProfileRoute from "./routes/users/profile/route";

export const appRouter = createTRPCRouter({
  example: createTRPCRouter({
    hi: hiRoute,
  }),
  workouts: createTRPCRouter({
    create: createWorkoutRoute,
    list: listWorkoutsRoute,
  }),
  users: createTRPCRouter({
    stats: userStatsRoute,
    profile: userProfileRoute,
  }),
});

export type AppRouter = typeof appRouter;