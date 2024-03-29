'use client';

import { IoMdSquareOutline, IoMdCheckbox } from "react-icons/io";

import useFavorite from "@/app/hooks/useFavorite";
import { SafeUser } from "@/app/types";

import ClientOnly from "./ClientOnly";

interface HeartButtonProps {
  listingId: string
  currentUser?: SafeUser | null
}

const HeartButton: React.FC<HeartButtonProps> = ({ listingId, currentUser}) => {
  const { hasFavorited, toggleFavorite } = useFavorite({listingId, currentUser});

  return (
    <div 
      onClick={toggleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer">
      <IoMdSquareOutline
        size={28} className="fill-white absolute -top-[2px] -right-[2px]"
        />
      <IoMdCheckbox
        size={24} className={hasFavorited ? 'fill-lime-400' : 'fill-neutral-500/70'}
      />
    </div>
   );
}
 
export default HeartButton;