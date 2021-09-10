import { resolver } from "blitz";
import db from "db";
import { z } from "zod";
import { Ctx } from "blitz";
// import { values } from "@chevrotain/utils";

// const CreateRequest = z.object({
//   name: z.string(),
// });
const CreateRequest = z.object({
  title: z.string(),
});

export default resolver.pipe(
  resolver.zod(CreateRequest),
  resolver.authorize(),
  async (input, ctx: Ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const userId = ctx.session.userId;

    return await db.request.create({
      data: {
        ...input,
        productId: 5,
        // @ts-ignore
        userId: userId,
      },
    });
  }
);
