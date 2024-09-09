import './SearchBar.css'

export default function SearchBar({setSearchInput}: any) {
    return (

        <div className={"searchBar-container"}>
            <label htmlFor={"searchbar"} className="sr-only">Search for Title or Author</label>
            <span className="material-symbols-outlined search-lense">search </span>
            <input className={"search-input"}
                   type={"text"}
                   name={"searchbar"}
                   placeholder={"Search for Title or Author"}
                   onChange={(event) => setSearchInput(event.target.value)}
            />
        </div>
    )
}
