import "./global.css"

export const metadata = {
  title: 'Trampe Em Casa',
  description: 'Divulgação de vagas 100% remotas.'
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="ptbr">
      <body>{children}</body>
    </html>
  );
}
