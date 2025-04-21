import { Server } from 'socket.io';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

const ioHandler = (req: NextApiRequest, res: NextApiResponse) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', async (socket) => {
      const session = await getServerSession(req, res, authOptions);
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
  }
  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default ioHandler; 