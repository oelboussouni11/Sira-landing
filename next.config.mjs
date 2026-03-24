/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  basePath: isProd ? "/Sira-landing" : "",
  assetPrefix: isProd ? "/Sira-landing/" : "",
  images: {
    unoptimized: true,
  },
};
export default nextConfig;
