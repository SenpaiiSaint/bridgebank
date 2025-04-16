export default function LoanCard({ loan }) {
    return (
        <div className="border rounded p-4 mb-4">
            <h3 className="font-bold">Loan ID: {loan.id}</h3>
            <p>Amount: ${loan.amount}</p>
            <p>Interest: ${loan.interest}</p>
            <p>Term: ${loan.term}</p>
            <p>Status: ${loan.status}</p>
        </div>
    );
}