import { Ctx, resolver } from "blitz";
import db from "db";
import { z } from "zod";

// type requestType = z.infer<typeof >;

const CreateProduct = z.object({
  name: z.string(),
  description: z.optional(z.string()),
  // requests:  // string
});

export default resolver.pipe(
  resolver.zod(CreateProduct),
  resolver.authorize(),
  async (input: any, ctx: Ctx) => {
    // get user
    const userId = ctx.session.userId;
    return {
      ...input,
      userId,
    };
  },
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    // @ts-ignore
    const product = await db.product.create({ data: input });

    return product;
  }
);
