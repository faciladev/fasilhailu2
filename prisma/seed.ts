import { PrismaClient, Prisma } from "@prisma/client";
import { projects, skills, testimonials } from "../data/data";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: `test@example.com`,
      role: "ADMIN",
    },
  });

  await prisma.project.createMany({
    data: projects,
  });

  await prisma.skill.createMany({
    data: skills,
  });

  await prisma.testimonial.createMany({
    data: testimonials,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
