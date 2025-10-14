/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    PAYSTACK_KEY: process.env.PAYSTACK_KEY,
    PROD_PAYSTACK_KEY: process.env.PROD_PAYSTACK_KEY,
  },
  // output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
