import './CartItemsCard.css'
import {Product} from "../../types/types.tsx";

type CartItemsCartProps = {
    product: Product;
    removeFromCart: (product: Product) => void;
};

export default function CartItemsCard({product, removeFromCart}: CartItemsCartProps) {

    function handleRemoveFromCart() {
        removeFromCart(product)
    }

    return (
        <li className="cart-item-card">
            <p><strong>{product.name}</strong></p>
            <p>Price: {product.price}</p>
            <button onClick={handleRemoveFromCart}>Remove from Cart</button>
        </li>
    )
}