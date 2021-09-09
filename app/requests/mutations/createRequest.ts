import { resolver } from "blitz";
import db from "db";
import { z } from "zod";
import { Ctx } from "blitz";

// const CreateRequest = z.object({
//   name: z.string(),
// });
const CreateRequest = z.object({
  title: z.optional(z.string()),
  description: z.optional(z.string()),
  product: z.optional(
    z.object({
      name: z.string(),
    })
  ),
  productId: z.optional(z.number()),
  user: z.optional(
    z.object({
      name: z.string(),
    })
  ),
  userId: z.optional(z.string()),
});

export default resolver.pipe(
  resolver.zod(CreateRequest),
  resolver.authorize(),
  async (input, ctx: Ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const userId = ctx.session.userId;
    return await db.request.create({
      data: {
        productId: 5,
        userId: userId,
      },
    });
    // return await db.request.create({ data: input });
  }
);
