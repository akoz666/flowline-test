import type { ReactNode } from "react";

export const metadata = {
  title: "Flowline",
  description: "Flowline frontend",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
