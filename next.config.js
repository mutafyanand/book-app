/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ServerPort: "http://localhost:5000"
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/random',
      },
    ],
  },
};

module.exports = nextConfig;
