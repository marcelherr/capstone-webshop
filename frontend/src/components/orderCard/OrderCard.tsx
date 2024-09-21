import './OrderCard.css'
import {Order} from "../../types/types.tsx";
import {Link} from "react-router-dom";


type OrderCardProps = {
    order: Order;
}
export default function OrderCard({order}: OrderCardProps) {
    return (
        <li>
            <h3>{order.id}</h3>
            <h4>Total Price: {order.totalPrice} €</h4>
            <p>Order Date: {order.orderDateTime.toLocaleString()}</p>
            <p>Number of Products: {order.products.length}</p>
            <Link to={`/orders/${order.id}`}>Details</Link>
        </li>
    )
}