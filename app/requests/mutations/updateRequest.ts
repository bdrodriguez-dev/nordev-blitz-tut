import { resolver } from "blitz";
import db from "db";
import { z } from "zod";

const UpdateRequest = z.object({
  id: z.number(),
  name: z.string(),
});

export default resolver.pipe(
  resolver.zod(UpdateRequest),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // @ts-ignore
    const request = await db.request.update({ where: { id }, data });

    return request;
  }
);
