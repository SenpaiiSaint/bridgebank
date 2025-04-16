"use client"

import { useState } from 'react';

export default function SMSUSSDSimulator() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/ussd', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input, sessionId: Date.now().toString() }),
    });
    const data = await res.json();
    setResponse(data.message);
  };

  return (
    <div className="border p-4 rounded">
      <h2 className="font-bold text-xl mb-2">USSD Simulator</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter USSD code or input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Send
        </button>
      </form>
      {response && (
        <div className="mt-4 p-2 border rounded bg-gray-100">
          <pre>{response}</pre>
        </div>
      )}
    </div>
  );
}
