/** @type {import('next').NextConfig} */
/**
 * Next.js Configuration
 * 
 * This configuration file is used to customize the behavior of the Next.js application.
 * The configuration includes settings for image domains and webpack, specifically for handling SVG files.
 test*/

const nextConfig = {
  images: {
    domains: [
      'firebasestorage.googleapis.com', // Firebase Storage domain
      'lightseagreen-sparrow-175522.hostingersite.com', // WordPress blog images domain
    ],
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
  async headers() {
    return [
      {
        source: "/:path*", // Apply to all routes
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
    ];
  },
};


export default nextConfig;
