import { Ctx, resolver } from "blitz";
import db from "db";
import { z } from "zod";

const voteOnRequestInput = z.object({
  userId: z.number(),
  requestId: z.number(),
});

export default resolver.pipe(
  resolver.zod(voteOnRequestInput),
  resolver.authorize(),
  async (input, ctx: Ctx) => {
    const userId = ctx.session.userId;

    // @ts-ignore
    return await db.vote.create({
      data: {
        // @ts-ignore
        userId,
      },
    });
  }
);
