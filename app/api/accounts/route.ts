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

        const accounts = await prisma.account.findMany({
            where: {
                userId: session.user.id,
            },
            select: {
                id: true,
                type: true,
                provider: true,
                providerAccountId: true,
            },
        });

        return NextResponse.json(accounts);
    } catch (error) {
        console.error('Error fetching accounts:', error);
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

        const { type, provider, providerAccountId } = await request.json();

        if (!type || !provider || !providerAccountId) {
            return NextResponse.json(
                { error: 'Type, provider, and provider account ID are required' },
                { status: 400 }
            );
        }

        const account = await prisma.account.create({
            data: {
                type,
                provider,
                providerAccountId,
                userId: session.user.id,
            },
            select: {
                id: true,
                type: true,
                provider: true,
                providerAccountId: true,
            },
        });

        return NextResponse.json(account);
    } catch (error) {
        console.error('Error creating account:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}