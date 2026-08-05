/** @type {import('next').NextConfig} */
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
    ],
  },
};

module.exports = nextConfig;
