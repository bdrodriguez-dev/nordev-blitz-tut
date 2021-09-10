import { resolver } from "blitz";
import db from "db";
import { z } from "zod";

const UpdateVote = z.object({
  id: z.number(),
  name: z.string(),
});

export default resolver.pipe(
  resolver.zod(UpdateVote),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const vote = await db.vote.update({ where: { id }, data });

    return vote;
  }
);
