/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "bcrypt"],
  },
  images: {
    domains: ['images.unsplash.com', 
              'images.pexels.com', 
              'drive.google.com',
              'direct-upload-s3-bucket-nido.s3.us-east-2.amazonaws.com'
              ]
  }
};

export default nextConfig;
