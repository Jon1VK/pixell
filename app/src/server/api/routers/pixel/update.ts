import { z } from "zod";
import { emitInvalidateQueries } from "~/server/emitInvalidateQueries";
import { publicProcedure } from "../../trpc";

export const updatePixel = publicProcedure
  .input(
    z.object({
      id: z.string(),
      color: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const pixel = await ctx.prisma.pixel.update({
      where: { id: input.id },
      data: { color: input.color },
    });
    emitInvalidateQueries(ctx.wss, pixel.imageId, {
      pixel: { get: { id: pixel.id } },
      image: { get: { id: pixel.imageId } },
    });
  });
