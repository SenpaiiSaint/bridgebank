import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const loans = await prisma.loan.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        id: true,
        amount: true,
        status: true,
        interestRate: true,
        term: true,
        createdAt: true,
      },
    });

    return NextResponse.json(loans);
  } catch (error) {
    console.error('Error fetching loans:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { amount, term, interestRate } = await request.json();

    if (!amount || !term || !interestRate) {
      return NextResponse.json(
        { error: 'Amount, term, and interest rate are required' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { id: true, balance: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const loan = await prisma.loan.create({
      data: {
        amount,
        term,
        interestRate,
        userId: session.user.id,
        status: 'PENDING',
      },
      select: {
        id: true,
        amount: true,
        status: true,
        interestRate: true,
        term: true,
        createdAt: true,
      },
    });

    return NextResponse.json(loan);
  } catch (error) {
    console.error('Error creating loan:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}