/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "bcrypt"],
  },
  images: {
    domains: ['images.unsplash.com', 'images.pexels.com', 'drive.google.com']
  }
};

export default nextConfig;
