import Head from "next/head"
import "./global.css"

export const metadata = {
  title: 'Trampar de Casa',
  description: 'Divulgação de vagas 100% remotas.'
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="ptbr">
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#5bbad5" />
      </Head>
      <body>{children}</body>
    </html>
  );
}
