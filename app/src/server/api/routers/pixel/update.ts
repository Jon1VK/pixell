import { z } from "zod";
import { emitSetQueries } from "~/server/emitSetQueries";
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
    emitSetQueries(ctx.wss, {
      pixel: {
        get: {
          input: { id: pixel.id },
          data: pixel,
        },
      },
    });
  });
