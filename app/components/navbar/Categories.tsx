'use client';

import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { FaArrowsAltH } from "react-icons/fa";

import Container from "../Container";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
    {
    label: 'Low Priority',
    icon: FaArrowDown,
    description: 'Its not that important'
    },
    {
    label: 'Medium Priority',
    icon: FaArrowsAltH,
    description: 'Maybe you should get going'
    },
    {
    label: 'High Priority',
    icon: FaArrowUp,
    description: 'Drop everything and get this done!'
    },
    
]

const Categories  = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();
    const isMainPage = pathname === "/";

if(!isMainPage) {
    return null;
}

    return (
        <Container>
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                {categories.map((item) => (
                    <CategoryBox 
                        key={item.label}
                        label={item.label}
                        icon={item.icon}
                        selected={category === item.label}
                    />
                ))}
            </div>
        </Container>
    );
}

export default Categories;