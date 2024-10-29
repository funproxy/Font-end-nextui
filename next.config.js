/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'export',
    eslint: {
        ignoreDuringBuilds: true,
        // ignoreBuildErrors: true,
    },
}

module.exports = nextConfig
