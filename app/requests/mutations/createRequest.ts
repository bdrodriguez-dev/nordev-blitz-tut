import { resolver } from "blitz";
import db from "db";
import { z } from "zod";
import { Ctx } from "blitz";

const CreateRequest = z.object({
  title: z.string(),
  description: z.optional(z.string()),
  // productId: z.number(),
  userId: z.number(),
});

export default resolver.pipe(
  resolver.zod(CreateRequest),
  resolver.authorize(),
  /* Gets the data needed for the mutation: productId and userId */
  async (input, ctx: Ctx) => {
    // Get the userId from the session
    const userId = await ctx.session.userId;
    // Get the productId from the form input
    // const productId = input.productId;
    // console.log(`ProductId: ${productId}`);
    // console.log(`UserId: ${userId}`);
    return {
      ...input,
      // productId: productId,
      userId: userId,
    };
  },
  /* Creates the request */
  async (input, ctx: Ctx) => {
    const request = await db.request.create({
      data: {
        ...input,
        // productId: input.productId,
        // @ts-ignore
        userId: input.userId,
      },
    });
    return {
      ...input,
      request,
    };
  },
  /* This function updates the product with the newly created request */
  async (input) => {
    // get the requests
    const requests = await db.request.findMany({
      where: {
        // productId: input.productId,
      },
    });
    // update the product with the new request
    const product = db.product.update({
      where: {
        // id: input.productId,
      },
      data: {
        // @ts-ignore
        requests: [...requests, input.request],
      },
    });
    return input.request;
  }
);
