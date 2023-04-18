import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/navbar.component";
import ClientOnly from "./components/client-only/client-only";
import Modal from "./components/modals/modal.component";

export const metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};

const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <Modal actionLabel="Hola" isOpen title="Hello"/>
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
