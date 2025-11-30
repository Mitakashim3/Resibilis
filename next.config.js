/** @type {import('next').NextConfig} */
const nextConfig = {
  // Security headers are handled in middleware.ts for more control
  // but we can add some base configurations here
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Google OAuth avatars
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
  // Strict mode for better React development
  reactStrictMode: true,
  // Disable x-powered-by header for security
  poweredByHeader: false,
};

module.exports = nextConfig;
