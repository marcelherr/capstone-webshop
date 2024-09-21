import './ProductGallery.css'
import ProductCard from "../productCard/ProductCard.tsx";
import {Product} from "../../types/types.tsx";
import SearchBar from "../searchBar/SearchBar.tsx";
import {Dispatch, SetStateAction} from "react";
import SortOption from "../sortOptions/SortOption.tsx";

type ProductGalleryProps = {
    data: Product[];
    setSearchInput: Dispatch<SetStateAction<string>>;
    toggleSortOrder: () => void;
    toggleSortPrice: () => void;
    setIsNameAscending: Dispatch<SetStateAction<boolean | null>>;
    setIsPriceAscending: Dispatch<SetStateAction<boolean | null>>;
    addToCart: (product: Product) => void;
}

export default function ProductGallery({
                                           data,
                                           setSearchInput,
                                           toggleSortOrder,
                                           toggleSortPrice,
                                           setIsNameAscending,
                                           setIsPriceAscending,
                                           addToCart
                                       }: ProductGalleryProps) {
    return (
        <>
            <h2>All Products</h2>
            <SearchBar setSearchInput={setSearchInput}/>
            <SortOption toggleSortOrder={toggleSortOrder}
                        toggleSortPrice={toggleSortPrice}
                        setIsNameAscending={setIsNameAscending}
                        setIsPriceAscending={setIsPriceAscending}/>
            {(!data || data.length === 0) ? (
                <p>No Products</p>
            ) : (
                <ul className="product-list">
                    {data.map((product) => (
                        <ProductCard key={product.id} product={product} addToCart={addToCart}/>
                    ))}
                </ul>
            )}
        </>
    );
}