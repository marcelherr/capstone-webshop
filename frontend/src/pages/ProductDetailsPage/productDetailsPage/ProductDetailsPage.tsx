import './ProductDetailsPage.css'
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ConfirmationModal from "../../../components/confirmationModal/ConfirmationModal.tsx";
import {ProductWithNoId} from "../../../types/types.tsx";
import axios from "axios";

type DeleteProps = {
    deleteProduct: (id: string) => void,
};

export default function ProductDetailsPage({deleteProduct}: DeleteProps) {
    const [product, setProduct] = useState<ProductWithNoId>({
        name: ""
    })

    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const params = useParams();
    const id: string | undefined = params.id;
    const navigate = useNavigate();

    const fetchBook = () => {
        axios.get(`/api/products/${id}`)
            .then((response) => {
                setProduct(response.data)
            })
            .catch((error) => console.log(error.response.data))
    }
    useEffect(() => {
        fetchBook();
    }, [])

    function handleDelete() {
        setShowDeleteModal(true);

    }

    function handleClose() {
        setShowDeleteModal(false);
    }

    function handleDeleteConfirm() {
        if (id) {
            deleteProduct(id);
            navigate("/");
            setShowDeleteModal(false);
        }
    }

    return (
        <>
            <h2>{product.name}</h2>
            <Link to={"/"}>Back</Link>
            <button onClick={handleDelete}>Delete
            </button>
            {showDeleteModal && <ConfirmationModal handleClose={handleClose}
                                                   handleDeleteConfirm={handleDeleteConfirm}
                                                   productToBeDeleted={product}/>}
        </>
    )
}