/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: false, // THIS IS THE FLAG THAT MATTERS
  },
  images: {
    domains: ["uploadthing.com"],
  },
};

module.exports = nextConfig;
