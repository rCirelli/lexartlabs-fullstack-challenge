import './globals.css';

export const metadata = {
  title: 'Raphael Cirelli - Lexartlabs Fullstack Test',
  description: 'Fullstack Test for Lexartlabs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
