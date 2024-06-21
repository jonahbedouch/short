/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: "/api/:path*",
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: 'https://l.bedouch.net'
                    },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET, POST'
                    }
                ]
            }
        ]
    }
};

export default nextConfig;
