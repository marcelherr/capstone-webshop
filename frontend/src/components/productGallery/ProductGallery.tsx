import './ProductGallery.css'
import ProductCard from "../productCard/ProductCard.tsx";
import {Product} from "../../types/types.tsx";
import SearchBar from "../searchBar/SearchBar.tsx";
import {Dispatch, SetStateAction} from "react";

type ProductGalleryProps = {
    data: Product[]
    setSearchInput: Dispatch<SetStateAction<string>>
}

export default function ProductGallery({data, setSearchInput}: ProductGalleryProps) {
    return (
        <>
            <h2>All Products</h2>
            <SearchBar setSearchInput={setSearchInput}/>
            {(!data || data.length === 0) ? (
                <p>No Products</p>
            ) : (
                <ul className="product-list">
                    {data.map((product) => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
                </ul>
            )}
        </>
    );
}