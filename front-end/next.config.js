/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  // async rewrites() {
  //   return [
  //     {
  //       source: "/data/:path*/",
  //       destination: "https://jsonplaceholder.typicode.com/todos/:path*/",
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
