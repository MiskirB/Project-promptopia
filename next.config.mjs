/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverExternalPackages: ["mongoose"], // Use the correct key
  },
  images: {
    domains: ["lh3.googleusercontent.com"], // Allow images from Google domains
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true, // Enable top-level await
    };
    return config;
  },
};

export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   experimental: {
//     appDir: true,
//     serverComponentsExternalPackages: ["mongoose"],
//   },
//   images: {
//     domains: ["lh3.googleusercontent.com"],
//   },
//   webpack(config) {
//     config.experiments = {
//       ...config.experiments,
//       topLevelAwait: true,
//     };
//     return config;
//   },
// };

// export default nextConfig;
