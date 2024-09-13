import './SortOptions.css'
import {Dispatch, SetStateAction, useState} from "react";

type SortOptionProps = {
    toggleSortOrder: () => void;
    toggleSortPrice: () => void;
    setIsNameAscending: Dispatch<SetStateAction<boolean | null>>;
    setIsPriceAscending: Dispatch<SetStateAction<boolean | null>>;
}

export default function SortOption({
                                       toggleSortOrder,
                                       toggleSortPrice,
                                       setIsNameAscending,
                                       setIsPriceAscending
                                   }: SortOptionProps) {

    const [showSortButton, setShowSortButton] = useState<boolean | null>(null)
    const [showPriceButton, setShowPriceButton] = useState<boolean | null>(null)

    function handleSortButton() {
        setShowSortButton(!showSortButton)
        toggleSortOrder();
    }

    function handlePriceButton() {
        setShowPriceButton(!showPriceButton)
        toggleSortPrice();
    }

    function onReset() {
        setShowSortButton(null);
        setShowPriceButton(null);
        setIsNameAscending(null);
        setIsPriceAscending(null);
    }

    return (
        <div>
            <button onClick={handleSortButton}> AZ {showSortButton ? "↓" : "↑"}</button>
            <button onClick={handlePriceButton}> Price {showPriceButton ? "↑" : "↓"}</button>
            <button onClick={onReset}>Reset</button>
        </div>
    )
}