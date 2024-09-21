import './OrderDetailsPage.css'
import axios from "axios";
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Order} from "../../../types/types.tsx";
import ConfirmationModalOrder from "../components/confirmationModalOrder/ConfirmationModalOrder.tsx";

type DeleteOrderProps = {
    deleteOrder: (id: string) => void
}

export default function OrderDetailsPage({deleteOrder}: Readonly<DeleteOrderProps>) {

    const [order, setOrder] = useState<Order>({
        id: "",
        orderDateTime: new Date(),
        products: [],
        totalPrice: 0
    })

    const params = useParams();
    const id: string | undefined = params.id;

    const fetchOrder = () => {
        axios.get(`/api/orders/${id}`)
            .then((response) => {
                setOrder({
                    ...response.data,
                    orderDateTime: new Date(response.data.orderDateTime)
                })
            })
            .catch((error) => console.log(error.response.data))
    }

    useEffect(() => {
        fetchOrder();
    }, [])

    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const navigate = useNavigate();

    function handleDelete() {
        setShowDeleteModal(true);

    }

    function handleClose() {
        setShowDeleteModal(false);
    }

    function handleDeleteConfirm() {
        if (id) {
            deleteOrder(id);
            navigate("/orders");
            setShowDeleteModal(false);
        }
    }

    return (
        <>
            <Link to={"/orders"}>Back</Link>
            <h2>{order.id}</h2>
            <p>Order Date: {order.orderDateTime.toLocaleString()}</p>
            <p>{order.totalPrice}</p>
            <ul>
                {order.products.map((product) => (
                    <li key={product.id}>
                        <strong>{product.name}</strong>: € {product.price.toFixed(2)} - {product.description}
                    </li>
                ))}
            </ul>
            {/*<p>{order.orderDateTime}</p>*/}
            <div className={"order-details-buttons"}>
                <button onClick={handleDelete}>Delete
                </button>
            </div>
            {showDeleteModal && <ConfirmationModalOrder handleClose={handleClose}
                                                        handleDeleteConfirm={handleDeleteConfirm}
                                                        orderToBeDeleted={order}/>}
        </>
    )
}