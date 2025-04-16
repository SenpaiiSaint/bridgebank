import { PrismaClient, Prisma } from '../generated/prisma';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Saint",
    phone: "1112223333",
    account: {
      create: {
        balance: 10000000.0,
        transactions: {
          create: [
            {
              amount: 5000000.0,
              type: "credit",
              description: "Initial deposit",
            },
            { amount: 300000.0, type: "debit", description: "Porsche USA" },
          ],
        },
        loans: {
          create: [
            { amount: 100000.0, interest: 5.0, term: 12, status: "approved" },
          ],
        },
      },
    },
  },
  {
    name: "Bob",
    phone: "4445556666",
    account: {
      create: {
        balance: 300.0,
        transactions: {
          create: [
            { amount: 300.0, type: "credit", description: "Salary deposit" },
          ],
        },
        loans: {
          create: [
            { amount: 100.0, interest: 3.0, term: 6, status: "pending" },
          ],
        },
      },
    },
  },
];

async function main() {
    console.log('Start seeding...');

    for (const user of userData) {
        const createdUser = await prisma.user.create({
            data: user,
        });
        console.log(`Created user with id: ${createdUser.id}`);
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });