import './ProductGallery.css'
import ProductCard from "../productCard/ProductCard.tsx";
import {Product} from "../../types/types.tsx";

type ProductGalleryProps = {
    data: Product[]
}

export default function ProductGallery({data}: ProductGalleryProps) {
    if (!data || data.length === 0) {
        return <p>No Products</p>;
    }

    return (
        <>
            <h2>All Products</h2>
            <ul className="product-list">
                {data.map((product) => (
                    <ProductCard key={product.id} product={product}/>
                ))}
            </ul>
        </>
    );
}