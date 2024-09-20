/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  optimizeFonts:true,

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
