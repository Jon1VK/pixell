import { z } from "zod";
import { imageSizeMapping, imageSizes } from "~/utils/imageSizes";
import { publicProcedure } from "../../trpc";

export const createImage = publicProcedure
  .input(
    z.object({
      imageSize: z.enum(imageSizes),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const { height, width } = imageSizeMapping[input.imageSize];
    return await ctx.prisma.image.create({
      data: {
        title: "",
        height,
        width,
        pixels: {
          createMany: {
            data: Array.from({ length: width }, (_, posX) =>
              Array.from({ length: height }, (_, posY) => {
                return { posX, posY };
              })
            ).flat(),
          },
        },
      },
    });
  });
