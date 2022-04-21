// /graphql/types/User.ts
import { enumType, objectType, extendType } from "nexus";

export const Testimonial = objectType({
  name: "Testimonial",
  definition(t) {
    t.string("id");
    t.string("name");
    t.string("position");
    t.string("text");
    t.string("imageUrl");
    t.string("userId");
    t.field("user", {
      type: Testimonial,
      async resolve(parent, _args, ctx) {
        return await ctx.prisma.project
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .User();
      },
    });
  },
});

export const TestimonialQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("testimonials", {
      type: "Testimonial",
      resolve(_parent, _args, ctx) {
        return ctx.prisma.testimonial.findMany();
      },
    });
  },
});
