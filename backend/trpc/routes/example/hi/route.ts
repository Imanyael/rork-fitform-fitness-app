import { z } from "zod";
import { publicProcedure } from "../../../create-context";

export default publicProcedure
  .input(z.object({ name: z.string().optional() }).optional())
  .query(({ input }) => {
    return {
      message: `Hello ${input?.name || 'World'}!`,
      timestamp: new Date().toISOString(),
      status: 'success'
    };
  });