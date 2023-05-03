"use client";

import Container from "../container/container.component";
import Logo from "./logo.component";
import Search from "./search.component";
import UserMenu from "./user-menu.component";
import { safeUser } from "@/app/types";

interface NavbarProps {
  currentUser?: safeUser | null;
}
const Navbar: React.FC<NavbarProps> = ({
  currentUser
}) => {
  return (
    <div className="w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
