import './ProductCard.css'
import {Product} from "../../types/types.tsx";
import {Link} from "react-router-dom";

type ProductCardProps = {
    product: Product
}

export default function ProductCard({product}: ProductCardProps) {
    return (
        <li>
            <h3>{product.name}</h3>
            <Link to={`/products/${product.id}`}>Details</Link>
        </li>
    )
}