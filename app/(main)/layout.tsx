
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { LayoutClient } from "@/components/layout-client";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LayoutClient>
        <Header />
        <main id="main-content" role="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </LayoutClient>
    </>
  );
}
