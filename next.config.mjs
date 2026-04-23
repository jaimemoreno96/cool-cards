/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yihwcuxtypnwbjqcflia.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },
    ],
    domains: ['localhost'],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
