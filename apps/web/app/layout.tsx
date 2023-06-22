import "./global.css";

export default function RootLayout({ children }) {
  return (
    <html lang="ptbr">
      <body>{children}</body>
    </html>
  );
}
