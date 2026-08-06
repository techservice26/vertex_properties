/** @type {import('next').NextConfig} */
if (process.env.VERCEL && !process.env.NEXT_PUBLIC_API_URL) {
  throw new Error(
    'NEXT_PUBLIC_API_URL must be set in Vercel project settings before deploying.',
  );
}

const nextConfig = {
  async redirects() {
    return [{ source: '/booking', destination: '/online-booking', permanent: true }];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8002",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.vertexproperties.us",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
