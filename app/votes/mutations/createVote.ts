import { resolver } from "blitz";
import db from "db";
import { z } from "zod";
import { useCurrentUser } from "../../core/hooks/useCurrentUser";
import { Ctx } from "blitz";

const CreateVote = z.object({
  userId: z.number(),
  // requestId: z.number(),
});

export default resolver.pipe(
  resolver.zod(CreateVote),
  resolver.authorize(),
  async (input, ctx: Ctx) => {
    // get data for db.vote.create({})
    // userId
    const user = await useCurrentUser();
    // requestId
    // ctx.session.
    //
    if (user) {
      return {
        ...input,
        userId: user.id,
      };
    }
  },
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    // @ts-ignore
    const vote = await db.vote.create({ data: input });

    return vote;
  }
);
