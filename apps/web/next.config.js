const remarkGfm = import('remark-gfm')
// eslint-disable-next-line @typescript-eslint/no-var-requires

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
    unoptimized: true,
  },
  experimental: {
    serverActions: true,
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  reactStrictMode: true,
  transpilePackages: ['ui', 'eslint-config-custom', 'shared', 'db'],
  i18n: {
    locales: ['pt-BR'],
    defaultLocale: 'pt-BR',
  },
  output: 'standalone',
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withMDX = require('@next/mdx')({
  options: {
    remakPlugins: [remarkGfm],
    rehypePlugins: [],
  },
})

module.exports = withMDX(nextConfig)
