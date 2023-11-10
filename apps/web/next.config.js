// eslint-disable-next-line @typescript-eslint/no-var-requires

module.exports = {
  experimental: {
    serverActions: true,
  },
  reactStrictMode: true,
  transpilePackages: ['ui', 'eslint-config-custom', 'shared', 'db'],
  i18n: {
    locales: ['pt-BR'],
    defaultLocale: 'pt-BR',
  },
  publicRuntimeConfig: {
    metadataBase: 'https://trampardecasa.com.br',
  },
}
