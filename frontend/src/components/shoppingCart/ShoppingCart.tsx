import './ShoppingCart.css'
import {Product} from "../../types/types.tsx";
import CartItemsCard from "../cartItemsCard/CartItemsCard.tsx";
import axios from "axios";

type ShoppingCartProps = {
    cartItems: Product[];
    setCartItems: (items: Product[]) => void;
    removeFromCart: (product: Product) => void;
    fetchOrders: () => void;
};

export default function ShoppingCart({cartItems, removeFromCart, setCartItems, fetchOrders}: ShoppingCartProps) {

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, product) => total + product.price, 0);
    };

    function handleCheckout() {
        const order = {
            orderDateTime: new Date(),
            products: cartItems.map((product) => ({
                id: product.id,
                name: product.name,
                price: product.price,
                description: product.description
            })),
            totalPrice: calculateTotalPrice(),
        };

        axios.post("/api/orders", order)
            .then(response => {
                console.log("Order successfully placed:", response.data);
                setCartItems([]);
                fetchOrders();
            })
            .catch(error => console.log("Error placing order:", error));
    }


    return (
        <div className="shopping-cart">
            <h3>Shopping Cart</h3>
            {cartItems.length === 0 ? (
                <p>No items in cart</p>
            ) : (

                <ul className="cart-items-list">
                    {cartItems.map((item) => (
                        <li key={item.id}>
                            <CartItemsCard product={item} removeFromCart={removeFromCart}/>
                        </li>
                    ))}
                </ul>
            )
            }
            <p>Total Price: {calculateTotalPrice().toFixed(2)} €</p>
            <button onClick={handleCheckout}>Checkout</button>
        </div>
    );
}