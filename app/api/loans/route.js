// import prisma form /lib/prisma

export async function GET() {
    try {
        const loans = await prisma.loan.findMany({
            include: { account: { include: { user: true } } },
        });
        return new Response(JSON.stringify(loans), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch loans' }), { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { accountId, amount, interest, term } = await request.json();
        const loan = await prisma.loan.create({
            data: {
                accountId,
                amount,
                interest,
                term,
                status: 'pending' 
            },
        });
        return new Response(JSON.stringify(loan), { status: 201 }); 
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to create loan' }), { status: 500 });
    }
}