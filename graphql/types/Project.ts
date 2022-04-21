// /graphql/types/Project.ts
import { objectType, extendType, intArg, stringArg, nonNull } from "nexus";
import { User } from "./User";

export const Project = objectType({
  name: "Project",
  definition(t) {
    t.string("id");
    t.string("title");
    t.string("technology");
    t.string("imageUrl");
    t.string("description");
    t.string("url");
    t.string("userId");
    t.field("user", {
      type: User,
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

// Get All Projects
export const ProjectsQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("projects", {
      type: "Response",
      args: {
        first: intArg(),
        after: stringArg(),
      },
      async resolve(_, args, ctx) {
        let queryResults = null;

        if (args.after) {
          // check if there is a cursor as the argument
          queryResults = await ctx.prisma.project.findMany({
            take: args.first, // the number of items to return from the database
            skip: 1, // skip the cursor
            cursor: {
              id: args.after, // the cursor
            },
          });
        } else {
          // if no cursor, this means that this is the first request
          //  and we will return the first items in the database
          queryResults = await ctx.prisma.project.findMany({
            take: args.first,
          });
        }
        // if the initial request returns projects
        if (queryResults.length > 0) {
          // get last element in previous result set
          const lastProjectResult = queryResults[queryResults.length - 1];
          // cursor we'll return in subsequent requests
          const myCursor = lastProjectResult.id;

          // query after the cursor to check if we have nextPage
          const secondQueryResults = await ctx.prisma.project.findMany({
            take: args.first,
            cursor: {
              id: myCursor,
            },
            orderBy: {
              id: "asc",
            },
          });
          // return response
          const result = {
            pageInfo: {
              endCursor: myCursor,
              hasNextPage: secondQueryResults.length >= args.first, //if the number of items requested is greater than the response of the second query, we have another page
            },
            edges: queryResults.map((project) => ({
              cursor: project.id,
              node: project,
            })),
          };

          return result;
        }

        return {
          pageInfo: {
            endCursor: null,
            hasNextPage: false,
          },
          edges: [],
        };
      },
    });
  },
});

export const CreateProjectMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createProject", {
      type: Project,
      args: {
        title: nonNull(stringArg()),
        url: nonNull(stringArg()),
        imageUrl: nonNull(stringArg()),
        technology: nonNull(stringArg()),
        description: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        if (!ctx.user) {
          throw new Error(`You need to be logged in to perform an action`);
        }
        const user = await ctx.prisma.user.findUnique({
          where: {
            email: ctx.user.email,
          },
        });

        const newProject = {
          title: args.title,
          url: args.url,
          imageUrl: args.imageUrl,
          technology: args.technology,
          description: args.description,
          User: {
            connect: {
              id: user.id,
            },
          },
        };

        return await ctx.prisma.project.create({
          data: newProject,
        });
      },
    });
  },
});

export const Edge = objectType({
  name: "Edge",
  definition(t) {
    t.string("cursor");
    t.field("node", {
      type: Project,
    });
  },
});

export const PageInfo = objectType({
  name: "PageInfo",
  definition(t) {
    t.string("endCursor");
    t.boolean("hasNextPage");
  },
});

export const Response = objectType({
  name: "Response",
  definition(t) {
    t.field("pageInfo", { type: PageInfo });
    t.list.field("edges", {
      type: Edge,
    });
  },
});
