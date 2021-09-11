import { Ctx, resolver } from "blitz";
import db from "db";
import { z } from "zod";
// import { useSession } from "blitz";

const voteOnRequestInput = z.object({
  userId: z.number(),
  requestId: z.number(),
});

export default resolver.pipe(
  resolver.zod(voteOnRequestInput),
  resolver.authorize(),
  async (input, ctx: Ctx) => {
    const { userId } = ctx.session;
    // @ts-ignore
    return await db.voteOnRequest.create({
      data: {
        ...input,
        userId,
      },
    });
  }
);
