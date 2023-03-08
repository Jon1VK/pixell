import { createTRPCRouter } from "~/server/api/trpc";
import { getPixel } from "./get";
import { updatePixel } from "./update";

export const pixelRouter = createTRPCRouter({
  get: getPixel,
  update: updatePixel,
});
