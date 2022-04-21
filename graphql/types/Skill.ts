// /graphql/types/User.ts
import { enumType, objectType, extendType } from "nexus";

export const Skill = objectType({
  name: "Skill",
  definition(t) {
    t.string("id");
    t.string("description");
    t.string("title");
    t.string("userId");
    t.field("user", {
      type: Skill,
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

export const SkillQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("skills", {
      type: "Skill",
      resolve(_parent, _args, ctx) {
        return ctx.prisma.skill.findMany();
      },
    });
  },
});
