// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   env:{
//     URL_BACKEND : 'https://cute-lime-goldfish-toga.cyclic.app'
//   }
// }

// module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                port: "",
                pathname: "/yum3k0y4m4guch1/image/upload/**"
            }
        ]
    }
};

module.exports = nextConfig;