import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/navbar.component";
import ClientOnly from "./components/client-only/client-only";
import RegisterModal from "./components/modals/register.modal.component";

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
          <RegisterModal />
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
