'use client';

import { formatISO } from "date-fns";
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";

import Modal from "./Modal";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import Heading from "../Heading";

import useSearchModal from "@/app/hooks/useSearchModal";

enum STEPS {LOCATION = 0, DATE = 1, INFO = 2}

const SearchModal = () => {
    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();

    const [location, setLocation] = useState<CountrySelectValue>()
    const [step, setStep] = useState(STEPS.LOCATION);

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false,
    }), [location]);

    const onNext = useCallback(() => {
        setStep((value) => value + 1);
    }, []);

    const onSubmit = useCallback(async () => {
        let currentQuery = {};
      
        if (params) {
            currentQuery = qs.parse(params.toString())
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value
        };

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery,
        }, { skipNull: true });

        router.push(url);
        searchModal.onClose();
    }, [location, router, params, searchModal]);

    const actionLabel = useMemo(() => {
        return 'Search';
    }, []);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Where is your task located?"
                subtitle="Help us find your task's location!"
            />
            <CountrySelect 
                value={location} 
                onChange={(value) => setLocation(value as CountrySelectValue)} 
            />
            <hr />
            <Map center={location?.latlng} />
        </div>
    );

    return (
        <Modal
            isOpen={searchModal.isOpen}
            title="Task Search"
            actionLabel={actionLabel}
            onSubmit={onSubmit}
            onClose={searchModal.onClose}
            body={bodyContent}
        />
    );
}

export default SearchModal;
