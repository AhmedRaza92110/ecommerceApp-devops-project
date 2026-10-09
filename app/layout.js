import "./globals.css";

export const metadata = {
  title: "BrightBite — Restaurant Ordering & Management",
  description: "A bright and modern restaurant ordering and management website."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
