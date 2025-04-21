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
      OR: [
        { senderId: session.user.id },
        { receiverId: session.user.id },
      ],
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

  const { amount, receiverId } = await request.json();

  if (!amount || !receiverId) {
    return NextResponse.json(
      { error: 'Amount and receiver ID are required' },
      { status: 400 }
    );
  }

  const sender = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!sender || sender.balance < amount) {
    return NextResponse.json(
      { error: 'Insufficient balance' },
      { status: 400 }
    );
  }

  const receiver = await prisma.user.findUnique({
    where: { id: receiverId },
  });

  if (!receiver) {
    return NextResponse.json(
      { error: 'Receiver not found' },
      { status: 404 }
    );
  }

  const transaction = await prisma.transaction.create({
    data: {
      amount,
      senderId: session.user.id,
      receiverId,
    },
  });

  await prisma.user.update({
    where: { id: session.user.id },
    data: { balance: { decrement: amount } },
  });

  await prisma.user.update({
    where: { id: receiverId },
    data: { balance: { increment: amount } },
  });

  return NextResponse.json(transaction);
} 