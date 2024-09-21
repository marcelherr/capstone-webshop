import './ProductCard.css'
import {Product} from "../../types/types.tsx";
import {Link} from "react-router-dom";

type ProductCardProps = {
    product: Product,
    addToCart: (product: Product) => void;
}

export default function ProductCard({product, addToCart}: ProductCardProps) {
    function handleAddToCart() {
        addToCart(product)
        console.log("add to cart product card")
    }

    return (
        <li className={"product-card"}>
            <h3>{product.name}</h3>
            <p>{product.price} €</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
            <Link to={`/products/${product.id}`}>Details</Link>
        </li>
    )
}