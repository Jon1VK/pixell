import { z } from "zod";
import { publicProcedure } from "../../trpc";

export const getAllImages = publicProcedure
  .input(
    z.object({
      cursor: z.number().min(1).default(1),
      take: z.number().min(1).optional(),
    })
  )
  .query(async ({ ctx, input }) => {
    const images = await ctx.prisma.image.findMany({
      include: {
        pixels: {
          orderBy: [{ posY: "asc" }, { posX: "asc" }],
        },
      },
      skip: input.take && (input.cursor - 1) * input.take,
      take: input.take && input.take + 1,
      orderBy: { title: "asc" },
    });
    if (!input.take || images.length <= input.take) return { images };
    images.pop();
    return { images, nextCursor: input.cursor + 1 };
  });
