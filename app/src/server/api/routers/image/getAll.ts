import { publicProcedure } from "../../trpc";

export const getAllImages = publicProcedure.query(async ({ ctx }) => {
  return await ctx.prisma.image.findMany({
    include: {
      pixels: {
        orderBy: [{ posY: "asc" }, { posX: "asc" }],
      },
    },
    orderBy: { title: "asc" },
  });
});
