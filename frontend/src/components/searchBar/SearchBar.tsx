import './SearchBar.css'
import {Dispatch, SetStateAction} from "react";

type SearchBarProps = {
    setSearchInput: Dispatch<SetStateAction<string>>;
};

export default function SearchBar({setSearchInput}: SearchBarProps) {
    return (

        <div className={"searchBar-container"}>
            <label htmlFor={"searchbar"} className="sr-only">Search for Product</label>
            <span className="material-symbols-outlined search-lense">search </span>
            <input className={"search-input"}
                   type={"text"}
                   name={"searchbar"}
                   placeholder={"Search for Product"}
                   onChange={(event) => setSearchInput(event.target.value)}
            />
        </div>
    )
}
