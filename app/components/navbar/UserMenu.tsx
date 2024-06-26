"use client";
import {AiOutlineMenu} from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useEffect, useState } from "react";
import MenuItem from "./MenuItem";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

interface UserMenuProps {
    currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps>= ({currentUser}) => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const onRent = useCallback(()=> {
        if(!currentUser) {
            return loginModal.onOpen();
        } 

        rentModal.onOpen();
    }, [currentUser, loginModal, rentModal])

    const closeMenu = useCallback(() => {
        setIsOpen(false);
      }, []);
    
      useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          const menuNode = document.getElementById('user-menu'); // Replace with the actual ID of your menu
          if (menuNode && !menuNode.contains(event.target as Node)) {
            closeMenu();
          }
        };
    
        document.addEventListener('click', handleClickOutside);
    
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, [closeMenu]);
    

    return (
        <div id="user-menu" className="relative">
            <div className="flex flex-row items-center gap-3">
                <div onClick={onRent} className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                    Create a new Task
                </div>
                <div onClick={toggleOpen} className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        {currentUser ? (
                        <>
                            <MenuItem onClick={() => router.push("/cars")} label="My Tasks"/>
                            <MenuItem onClick={() => router.push("/favorites")} label="Completed Tasks"/>
                            <MenuItem onClick={rentModal.onOpen} label="Create a new Task"/>
                            <hr />
                            <MenuItem onClick={() => signOut()} label="Logout"/>
                        </>
                        ) : (
                        <>
                        <MenuItem onClick={loginModal.onOpen} label="Login"/>
                        <MenuItem onClick={registerModal.onOpen} label="Sign Up"/>
                    </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserMenu;