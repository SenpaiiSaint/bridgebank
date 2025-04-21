import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const userData = [
  {
    name: "Saint",
    email: "saint@example.com",
    password: "hashedpassword123", // In production, this should be properly hashed
    phone: "1112223333",
    role: "USER",
    transactions: {
      create: [
        {
          amount: 5000000.0,
          type: "CREDIT",
          status: "COMPLETED",
          description: "Initial deposit",
        },
        { 
          amount: 300000.0, 
          type: "DEBIT", 
          status: "COMPLETED",
          description: "Porsche USA" 
        },
      ],
    }
  },
  {
    name: "Bob",
    email: "bob@example.com",
    password: "hashedpassword456", // In production, this should be properly hashed
    phone: "4445556666",
    role: "USER",
    transactions: {
      create: [
        { 
          amount: 300.0, 
          type: "CREDIT", 
          status: "COMPLETED",
          description: "Salary deposit" 
        },
      ],
    }
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