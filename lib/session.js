import { IronSessionOptions } from 'iron-session';

export const sessionOptions = {
  password: process.env.IRON_SESSION_PASSWORD,
  cookieName: 'schoolapp_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  },
};
