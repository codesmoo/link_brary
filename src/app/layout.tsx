import './globals.css';
import './reset.css';
import { AuthProvider } from '@/context/AuthContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
