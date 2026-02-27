import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const topics = [
    { name: "Algebra", category: "Core" },
    { name: "Geometry", category: "Core" },
    { name: "Trigonometry", category: "Core" },
    { name: "Calculus", category: "Advanced" }
  ];

  for (const topic of topics) {
    await prisma.topic.upsert({
      where: { name: topic.name },
      update: {},
      create: topic
    });
  }

  const algebra = await prisma.topic.findUnique({ where: { name: "Algebra" } });
  if (algebra) {
    await prisma.formula.createMany({
      data: [
        {
          title: "Quadratic Formula",
          expression: "x = (-b ± √(b² - 4ac)) / 2a",
          explanation: "Solves ax² + bx + c = 0.",
          topicId: algebra.id
        },
        {
          title: "Difference of Squares",
          expression: "a² - b² = (a-b)(a+b)",
          explanation: "Useful for fast factorization.",
          topicId: algebra.id
        }
      ],
      skipDuplicates: true
    });
  }
}

main().finally(async () => prisma.$disconnect());
