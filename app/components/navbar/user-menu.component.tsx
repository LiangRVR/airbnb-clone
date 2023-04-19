"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../avatar/avatar.component";
import MenuItem from "./menu-item.component";
import useRegisterModal from "@/app/hooks/useRegisterModal";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const registerModal = useRegisterModal();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onClickHandler = (selectMenuOnClick: "signIn" | "signUp") => {
    const menuOnClick: { [x: string]: () => void } = {
      signIn: () => console.log("sing In"),
      signUp: registerModal.onOpen,
    };
    return () => {
      setIsOpen(false);
      menuOnClick[selectMenuOnClick]();
    };
  };

  return (
    <div className="relative" ref={ref}>
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
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
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className=" flex flex-col cursor-pointer">
            <>
              <MenuItem onClick={onClickHandler("signIn")} label="Login" />
              <MenuItem onClick={onClickHandler("signUp")} label="Sign Up" />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
