/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      remotePatterns: [
          {
              protocol: 'http',
              hostname: 'localhost',
              port: '7070', // Sesuaikan port jika berbeda
              pathname: '/cover/**', // Sesuaikan path jika berbeda
          },
      ],
  },
};

module.exports = nextConfig;
