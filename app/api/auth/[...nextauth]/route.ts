import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Use individual handlers instead of reusing the handler
export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions); 