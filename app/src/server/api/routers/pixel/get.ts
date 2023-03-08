import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure } from "../../trpc";

export const getPixel = publicProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ ctx, input }) => {
    const pixel = await ctx.prisma.pixel.findUnique({
      where: { id: input.id },
    });
    if (!pixel) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Pixel not found" });
    }
    return pixel;
  });
