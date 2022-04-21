// /graphql/types/User.ts
import { enumType, objectType, extendType } from "nexus";
import { Project } from "./Project";
import { Testimonial } from "./Testimonial";
import { Skill } from "./Skill";

export const User = objectType({
  name: "User",
  definition(t) {
    t.string("id");
    t.string("email");
    t.string("image");
    t.field("role", { type: Role });
    t.list.field("projects", {
      type: Project,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.user
          .findFirst({
            where: {
              id: _parent.id,
            },
          })
          .projects();
      },
    });
    t.list.field("testimonials", {
      type: Testimonial,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.user
          .findFirst({
            where: {
              id: _parent.id,
            },
          })
          .testimonials();
      },
    });
    t.list.field("skills", {
      type: Skill,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.user
          .findFirst({
            where: {
              id: _parent.id,
            },
          })
          .skills();
      },
    });
  },
});

const Role = enumType({
  name: "Role",
  members: ["USER", "ADMIN"],
});

export const UsersQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("users", {
      type: "User",
      resolve(_parent, _args, ctx) {
        return ctx.prisma.user.findMany();
      },
    });
  },
});
