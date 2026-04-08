/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
        formats: ['image/webp', 'image/avif'],
    },
    webpack: (config) => {
        config.externals = [...(config.externals || []), { canvas: 'canvas' }];
        return config;
    },
};

module.exports = nextConfig;
