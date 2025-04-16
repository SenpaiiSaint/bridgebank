export async function POST(request) {
    try {
        const { input, sessionId }= await request.json();
        // A simple USSD simulation flow for demo purposes
        let response = '';
        if (input === '') {
            // Initial menu shown when no input is provided
            response = 'CON Welcome to UnBanked USSD\n1. Check Balance\n2. Transfer Funds\n3. Request Loan';
        } else if (input === '1') {
            // Simulated balance check
            response = "END Your current balance is $2,025";
        } else if (input === '2') {
            response = "CON Enter recipient phone number:";
        } else if (input.startsWith('2*')) {
            // "2*1234567890" to prompt for transfer amount
            const parts = input.split('*');
            if (parts.length === 2) {
                response = "CON Enter amount to transfer:";
            } else if (parts.length === 3) {
                response = `END You have transferred $${[2]} to ${parts[1]}`;
            }
        } else if (input === '3') {
            response = "CON Enter loan amount:";
        } else if (input.startsWith('3*')) {
            // "3*5000" to request a loan
            const parts = input.split('*');
            if (parts.length === 2) {
                response = `END Your loan request of $${parts[1]} is under review.`;
            }
        } else {
            response = "END Invalid option.";
        }
        return new Response(JSON.stringify({ message: response }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'USSD simulation failed '}), { status: 500 });
    }
}