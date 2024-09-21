import './OrderPage.css'
import {Order} from "../../../types/types.tsx";
import OrderCard from "../../../components/orderCard/OrderCard.tsx";

type OrderPageProps = {
    orders: Order[];
}


export default function OrderPage({orders}: OrderPageProps) {
    return (
        <>
            <h2>All Orders</h2>
            {(!orders || orders.length === 0) ? (
                    <p>No Orders</p>)
                :
                (
                    <ul className="order-list">
                        {orders.map((order) => (
                            <OrderCard key={order.id} order={order}/>
                        ))}

                    </ul>
                )}
        </>
    )
}