import { createTRPCRouter } from "~/server/api/trpc";
import { createImage } from "./create";
import { getImage } from "./get";
import { getAllImages } from "./getAll";

export const imageRouter = createTRPCRouter({
  create: createImage,
  getAll: getAllImages,
  get: getImage,
});
