import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [],
});

export { handler as GET, handler as POST }; 