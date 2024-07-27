/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['res.cloudinary.com', 'www.google.com', 'randomuser.me'],
  },
};

module.exports = nextConfig;
