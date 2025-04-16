export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4"> Welcome to UnBanked</h1>
      <p className="mb-4">
        {" "}
        A lightweight digital banking platform for unbanked populations.
      </p>
      <ul className="list-disc ml-6">
        <li>
        <a href="/dashboard" className="text-blue-600 underline">
          NGO Dashboard
        </a>
        </li>
        <li>
          <a href="/ussd" className="text-blue-600 underline">
          SMS/USSD Simulation
          </a>
        </li>
      </ul>
    </div>
  );
}
