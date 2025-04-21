import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { phone, text } = await request.json();

    if (!phone || !text) {
      return NextResponse.json(
        { error: 'Phone number and text are required' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { phone },
      select: {
        id: true,
        name: true,
        balance: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Process USSD commands
    const response = await processUssdCommand(text, user);

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error processing USSD request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function processUssdCommand(text: string, user: { id: string; name: string; balance: number }) {
  const commands = text.split('*');
  const lastCommand = commands[commands.length - 1];

  switch (lastCommand) {
    case '1': // Check balance
      return {
        response: `Your balance is ${user.balance}`,
      };
    case '2': // Mini statement
      const transactions = await prisma.transaction.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          amount: true,
          type: true,
          description: true,
          createdAt: true,
        },
      });
      return {
        response: `Last 5 transactions:\n${transactions
          .map(
            (t) =>
              `${t.type} ${t.amount} - ${t.description} (${t.createdAt.toLocaleDateString()})`
          )
          .join('\n')}`,
      };
    default:
      return {
        response: 'Invalid command. Please try again.',
      };
  }
}