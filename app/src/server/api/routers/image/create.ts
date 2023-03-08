import { z } from "zod";
import { publicProcedure } from "../../trpc";

const imageSizes = {
  "8x8": { height: 8, width: 8 },
  "16x16": { height: 16, width: 16 },
  "32x32": { height: 32, width: 32 },
} as const;

export const createImage = publicProcedure
  .input(
    z.object({
      title: z.string().min(1).max(30),
      imageSize: z.enum(["8x8", "16x16", "32x32"]),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const { height, width } = imageSizes[input.imageSize];
    return await ctx.prisma.image.create({
      data: {
        title: input.title,
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
