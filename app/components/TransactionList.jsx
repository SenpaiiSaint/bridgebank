export default function TransactionList({ transactions }) {
    return (
      <div>
        <h2 className="font-bold text-xl mb-2">Transactions</h2>
        <ul>
          {transactions.map((tx) => (
            <li key={tx.id} className={`p-2 mb-2 border rounded ${tx.type === 'credit' ? 'bg-green-100' : 'bg-red-100'}`}>
              <p>{tx.description} - ${tx.amount} ({tx.type})</p>
              <p className="text-sm text-gray-600">{new Date(tx.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  