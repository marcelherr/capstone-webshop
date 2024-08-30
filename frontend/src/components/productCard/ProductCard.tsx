import './ProductCard.css'
import {Product} from "../../types/types.tsx";

type ProductCardProps = {
    product: Product
}

export default function ProductCard({product}: ProductCardProps) {
    return (
        <li>
            <h3>{product.name}</h3>
        </li>
    )
}