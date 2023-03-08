import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure } from "../../trpc";

export const getImage = publicProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ ctx, input }) => {
    const image = await ctx.prisma.image.findUnique({
      where: { id: input.id },
      include: {
        pixels: {
          orderBy: [{ posY: "asc" }, { posX: "asc" }],
        },
      },
    });
    if (!image) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Image not found" });
    }
    return image;
  });
