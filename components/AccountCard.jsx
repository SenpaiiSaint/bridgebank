export default function AccountCard({ account }) {
    return (
        <div className="border rounded p-4 mb-4">
            <h2 className="font-bold">Account ID: {account.id}</h2>
            <p>User: {account.user.name} ({account.user.phone})</p>
            <p>Balance: ${account.balance.toFixed(2)}</p>
        </div>
    );
}