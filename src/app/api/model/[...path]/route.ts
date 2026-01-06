import { NextRequestHandler } from '@zenstackhq/server/next';
import { enhance } from '@zenstackhq/runtime';
import { db } from '~/server/db';

// auth temporal por headers (para aprender rápido)
function getUser(req: Request) {
  const id = req.headers.get('x-user-id');
  const email = req.headers.get('x-user-email') ?? undefined;
  return id ? { id, email } : null;
}

const handler = NextRequestHandler({
  getPrisma: async (req) => {
    const user = getUser(req);
    return enhance(db, { user: user ?? undefined });
  },
  useAppDir: true,
});

export { handler as GET, handler as POST, handler as PATCH, handler as PUT, handler as DELETE };
