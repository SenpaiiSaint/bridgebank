import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export { handler as GET, handler as POST }; 