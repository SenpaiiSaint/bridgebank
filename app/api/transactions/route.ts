import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const transactions = await prisma.transaction.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return NextResponse.json(transactions);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { amount, type, description } = await request.json();

  if (!amount || !type || !description) {
    return NextResponse.json(
      { error: 'Amount, type, and description are required' },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    );
  }

  if (type === 'DEBIT' && user.balance < amount) {
    return NextResponse.json(
      { error: 'Insufficient balance' },
      { status: 400 }
    );
  }

  const transaction = await prisma.transaction.create({
    data: {
      amount,
      type,
      description,
      userId: session.user.id,
    },
  });

  // Update user balance
  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      balance: {
        [type === 'CREDIT' ? 'increment' : 'decrement']: amount,
      },
    },
  });

  return NextResponse.json(transaction);
} 