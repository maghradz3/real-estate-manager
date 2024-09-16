/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.real-estate-manager.redberryinternship.ge",
      },
    ],
  },
};

export default nextConfig;
