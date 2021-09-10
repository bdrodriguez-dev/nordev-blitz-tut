import { resolver } from "blitz";
import db from "db";
import { z } from "zod";
// import { useSession } from "blitz";

const voteOnRequestInput = z.object({
  // id: z.number(),
  // name: z.string(),
  // ctx: z.any(),
  // userId: z.number(),
  // requestId: z.number(),
});

export default resolver.pipe(
  resolver.zod(voteOnRequestInput),
  resolver.authorize(),
  async (input) => {
    // const session = useSession();
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    // const userId = 5;

    return await db.voteOnRequest.create({
      // @ts-ignore
      data: input,
    });
  }
);
