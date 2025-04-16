// import prisma from /lib/prisma;

export async function GET() {
    try {
        const accounts = await prisma.account.findMany({
            include: { user: true, transactions: true, loans: true },
        });
        return new Response(JSON.stringify(accounts), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ ERROR: 'Failed to fetch accounts' }), { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { name, phone } = await request.json();
        // Create a new user and account
        const user = await prisma.user.create({
            data: { name, phone },
        });
        const account = await prisma.account.create({
            data: { userId: user.id, balance: 0 },
        });
        return new Response(JSON.stringify({ user, account }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to create account '}), { status: 500 });
    }
}