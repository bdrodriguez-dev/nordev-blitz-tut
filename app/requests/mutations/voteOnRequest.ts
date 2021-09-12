import { Ctx, resolver } from "blitz";
import db from "db";
import { z } from "zod";
import { Prisma } from "@prisma/client";
// import { useSession } from "blitz";

// type UserType = Prisma.UserSelect;
// type RequestType = Prisma.RequestSelect;

// const voteOnRequestInput = z.object({
//   user: z.object({
//     userId: z.number(),
//   }),
//   request: z.object({
//     requestId: z.number(),
//   }),
// });

export default resolver.pipe(
  // resolver.zod(voteOnRequestInput),
  resolver.authorize(),
  // Create vote
  async (input, ctx: Ctx) => {
    //@ts-ignore
    const vote = await db.voteOnRequest.create({ data: input });
    return {
      // @ts-ignore
      ...input,
      vote,
    };
  },
  // Update votesOnRequest field on Request model
  async (input, ctx: Ctx) => {
    // update request
    await db.request.update({
      where: {
        id: input.request.id,
      },
      data: {
        // @ts-ignore
        votesOnRequest: {
          // @ts-ignore
          push: input.vote,
        },
      },
    });
    return {
      ...input,
    };
  }
);
