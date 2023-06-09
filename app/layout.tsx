import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/navbar.component";
import ClientOnly from "./components/client-only/client-only";
import RegisterModal from "./components/modals/register.modal.component";
import ToasterProvider from "./providers/toaster.provider";
import LoginModal from "./components/modals/login.modal.component";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/modals/rent.modal.component";

export const metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <RentModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
