"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { signOut } from "next-auth/react";
import {
  useLoginModal,
  useRegisterModal,
  useRentModal,
} from "@/app/hooks/useModal";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../avatar/avatar.component";
import MenuItem from "./menu-item.component";
import { safeUser } from "@/app/types";

interface UserMenuProps {
  currentUser?: safeUser | null;
}

enum MenuOption {
  Login = "login",
  SignUp = "signUp",
}

const UserMenu: React.FC<UserMenuProps> = ({
  currentUser,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [ref]);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onClickHandler = (menuOption: MenuOption) => {
    const menuOptionHandlers = {
      [MenuOption.Login]: loginModal.onOpen,
      [MenuOption.SignUp]: registerModal.onOpen,
    };
    return () => {
      setIsOpen(false);
      menuOptionHandlers[menuOption]();
    };
  };

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className="relative" ref={ref}>
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-4 px-4  rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className=" flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => {}}
                  label="My Trips"
                />
                <MenuItem
                  onClick={() => {}}
                  label="My favorites"
                />
                <MenuItem
                  onClick={() => {}}
                  label="My reservations"
                />
                <MenuItem
                  onClick={() => {}}
                  label="My properties"
                />
                <MenuItem
                  onClick={rentModal.onOpen}
                  label="Airbnb my home"
                />
                <hr />
                <MenuItem
                  onClick={() => signOut()}
                  label="Logout"
                />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={onClickHandler(MenuOption.Login)}
                  label="Login"
                />
                <MenuItem
                  onClick={onClickHandler(
                    MenuOption.SignUp
                  )}
                  label="Sign Up"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
