"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {BiSearch} from "react-icons/bi";
import { differenceInDays } from "date-fns";

import useCountries from "@/app/hooks/useCountries";
import useSearchModal from "@/app/hooks/useSearchModal";

const Search = () => {
    const searchModal = useSearchModal();
    const params = useSearchParams();
    const { getByValue } = useCountries();

    const locationValue = params?.get('locationValue');
    const startDate = params?.get('startDate');
    const endDate = params?.get('endDate');
    const seatCount = params?.get('seatCount');

    const locationLabel = useMemo(() => {
        if (locationValue) {
            return getByValue(locationValue as string)?.label;
        }
        return 'Anywhere';
    }, [getByValue, locationValue]);

    const durationLabel = useMemo(() => {
        if (startDate && endDate) {
          const start = new Date(startDate as string);
          const end = new Date(endDate as string);
          let diff = differenceInDays(end, start);
    
          if (diff === 0) {
            diff = 1;
          }
          return `${diff} Days`;
        }
        return 'Any Time'
      }, [startDate, endDate]);

    

    return (
    <div className="flex justify-center items-center">
        <div
            onClick={searchModal.onOpen}
            className="border-[1px] py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer flex items-center">
            <div className="text-sm font-semibold px-6">
                {locationLabel}
            </div>
            <div className="text-sm pl-6 pr-2 text-gray-600 flex items-center gap-3">
                <div className="p-2 bg-red-300 rounded-full text-white">
                    <BiSearch size={18} />
                </div>
            </div>
        </div>
    </div>

    );
}

export default Search;