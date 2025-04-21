import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AuthProvider from './components/AuthProvider';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'FinLink - Financial Inclusion Platform',
  description: 'Transforming financial access through innovative technology solutions, empowering NGOs and underserved communities with secure, efficient, and accessible financial services.',
  keywords: 'financial inclusion, digital banking, USSD banking, NGO financial management, secure payments, microfinance solutions, financial empowerment',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} antialiased bg-gradient-to-b from-gray-50 to-white min-h-screen text-gray-900`}
      >
        <AuthProvider>
          <main className="min-h-screen">
            {children}
          </main>
          <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">FinLink</h3>
                  <p className="text-gray-400">Bridging financial gaps through technology and innovation.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    <li><a href="/dashboard" className="text-gray-400 hover:text-white">NGO Dashboard</a></li>
                    <li><a href="/ussd" className="text-gray-400 hover:text-white">USSD Banking</a></li>
                    <li><a href="/about" className="text-gray-400 hover:text-white">About Us</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Contact</h3>
                  <ul className="space-y-2">
                    <li className="text-gray-400">support@finlink.io</li>
                    <li className="text-gray-400">+1 (555) 123-4567</li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-800 text-center">
                <p>© 2024 FinLink. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
} 