import { createTRPCRouter } from "~/server/api/trpc";
import { imageRouter } from "./routers/image";
import { pixelRouter } from "./routers/pixel";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  image: imageRouter,
  pixel: pixelRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
