import { z } from "zod";
import { emitSetQueries } from "~/server/emitSetQueries";
import { publicProcedure } from "../../trpc";

export const saveImage = publicProcedure
  .input(
    z.object({
      id: z.string(),
      title: z.string().min(1).max(50),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const image = await ctx.prisma.image.update({
      where: { id: input.id },
      data: { title: input.title, isFinished: true },
      include: {
        pixels: {
          orderBy: [{ posY: "asc" }, { posX: "asc" }],
        },
      },
    });
    emitSetQueries(ctx.wss, {
      image: {
        get: {
          input: { id: input.id },
          data: image,
        },
      },
    });
  });
