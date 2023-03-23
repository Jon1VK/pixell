import { createTRPCRouter } from "~/server/api/trpc";
import { createImage } from "./create";
import { getImage } from "./get";
import { getAllImages } from "./getAll";
import { saveImage } from "./save";

export const imageRouter = createTRPCRouter({
  create: createImage,
  getAll: getAllImages,
  get: getImage,
  save: saveImage,
});
