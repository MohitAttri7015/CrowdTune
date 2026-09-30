// Extra origins allowed to load the dev server (e.g. your phone on the LAN).
// Set in .env.local as a comma-separated list, e.g.:
//   NEXT_ALLOWED_DEV_ORIGINS=192.168.1.8:3000,192.168.1.20:3000
const allowedDevOrigins = (process.env.NEXT_ALLOWED_DEV_ORIGINS ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
