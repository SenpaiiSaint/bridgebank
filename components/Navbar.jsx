import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-blue-500 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/">
                    <span className="font-bold text-xl">
                        UnBanked
                    </span>
                </Link>
                <div>
                    <Link href="/" className="mr-4 hover:underline">Home</Link>
                    <Link href="/dashboard" className="mr-4 hover:underline">NGO Dashboard</Link>
                    <Link href="/ussd" className="mr-4 hover:underline">USSD Simulation</Link>
                </div>
            </div>
        </nav>
    );
}