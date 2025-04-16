// import prisma lib/prisma

export async function GET() {
    try {
        const transactions = await prisma.transaction.findMany({
            include: { account: { include: { user: true } } },
        });
        return new Response(JSON.stringify(transactions), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch transactions' }), { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { accountId, amount, type, description } = await request.json();
        const transaction = await prisma.transaction.create({
            data: {
                accountId,
                amount,
                type,
                description, 
            },
        });
        // Update account balance accordingly
        const account = await prisma.account.findUnique({ where: { id: accountId } });
        let newBalance = account.balance;
        if (type === 'credit') {
            newBalance += amount;
        } else if (type === 'debit') {
            newBalance =- amount;
        }
        await prisma.account.update({
            where: { id: accountId },
            data: { balance: newBalance },
        });
        return new Response(JSON.stringify(transaction), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to create transaction'}), { status: 500 });
    }
}