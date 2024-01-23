import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'

const nextConfig = {
  experimental: {
    mdxRs: true,
  },
  reactStrictMode: true,
  transpilePackages: ['ui', 'eslint-config-custom', 'shared', 'db'],
  i18n: {
    locales: ['pt-BR'],
    defaultLocale: 'pt-BR',
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)
