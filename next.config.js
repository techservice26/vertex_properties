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
    ],
  },
};

module.exports = nextConfig;
