/** @type {import('next').NextConfig} */
/**
 * Next.js Configuration
 * 
 * This configuration file is used to customize the behavior of the Next.js application.
 * The configuration includes settings for image domains and webpack, specifically for handling SVG files.
 test*/

const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com'], // Add the Firebase Storage domain here
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    
    return config;
  },
};

export default nextConfig;
