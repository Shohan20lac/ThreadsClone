/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: true,
      serverComponentsExternalPackages: ["mongoose"],
    },
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
    images: {
      domains: ['utfs.io'],
      remotePatterns: [
        {
          protocol: "https",
          hostname: "img.clerk.com",
        },
        {
          protocol: "https",
          hostname: "images.clerk.dev",
        },
        {
          protocol: "https",
          hostname: "uploadthing.com",
        },
        {
          protocol: "https",
          hostname: "placehold.co",
        },
        {
          protocol: 'https',
          hostname: 'utfs.io',
          port: '',
          pathname: '/', // Allow images from the root path
        },
        {
          protocol: 'https',
          hostname: 'utfs.io',
          port: '',
          pathname: '/images', // Allow images from a subdirectory "/images" (adjust as needed)
        },
        {
          protocol: 'https',
          hostname: 'utfs.io',
          port: '',
          pathname: '/assets', // Allow images from a subdirectory "/assets" (adjust as needed)
        },
      ]
    }
  }
  
  module.exports = nextConfig;