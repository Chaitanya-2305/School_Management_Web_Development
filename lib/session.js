// lib/session.js
export const sessionOptions = {
  password: process.env.IRON_SESSION_PASSWORD,
  cookieName: "school_project_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
