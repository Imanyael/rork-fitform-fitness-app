import { createTRPCRouter } from "./create-context.js";
import hiRoute from "./routes/example/hi/route.js";
import createWorkoutRoute from "./routes/workouts/create/route.js";
import listWorkoutsRoute from "./routes/workouts/list/route.js";
import userStatsRoute from "./routes/users/stats/route.js";
import userProfileRoute from "./routes/users/profile/route.js";

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