import { Server } from 'socket.io';
import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

let io: Server;

export async function GET(req: NextRequest) {
  if (!io) {
    const httpServer = new (require('http').Server)();
    io = new Server(httpServer, {
      cors: {
        origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        methods: ['GET', 'POST'],
      },
    });

    io.on('connection', async (socket) => {
      const session = await getServerSession(authOptions);
      if (!session?.user?.id) {
        socket.disconnect();
        return;
      }

      // Join user's room
      socket.join(session.user.id);

      // Handle new transactions
      socket.on('newTransaction', async (data) => {
        try {
          const transaction = await prisma.transaction.create({
            data: {
              ...data,
              userId: session.user.id,
            },
          });

          // Broadcast to user's room
          io.to(session.user.id).emit('transaction', transaction);
        } catch (error) {
          console.error('Error creating transaction:', error);
        }
      });

      // Handle disconnection
      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });

    httpServer.listen(3001);
  }

  return new Response(null, {
    status: 101,
    headers: {
      'Upgrade': 'websocket',
      'Connection': 'Upgrade',
    },
  });
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const preferredRegion = 'auto'; 