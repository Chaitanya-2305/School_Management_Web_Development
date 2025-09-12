// app/api/auth/verify-otp/session.js

import { IronSessionOptions } from "iron-session";

export const sessionOptions = {
  password: "93ef4998a6a6fee455f0efcea4f9f165bb1f83b52f20c97e8465102a7f499eca", // hardcoded
  cookieName: "school-project-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production", // true in prod
  },
};
