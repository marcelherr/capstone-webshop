import './ProductDetailsPage.css';
import {Link, useNavigate, useParams} from "react-router-dom";
import {FormEvent, useEffect, useState} from "react";
import ConfirmationModal from "../../../components/confirmationModal/ConfirmationModal.tsx";
import {Product, ProductWithNoId} from "../../../types/types.tsx";
import axios from "axios";
import ProductForm from "../../../components/productForm/ProductForm.tsx";

type DeleteProps = {
    deleteProduct: (id: string) => void;
    updateProduct: (id: string, product: ProductWithNoId) => void;
    addToCart: (product: Product) => void;
};

export default function ProductDetailsPage({deleteProduct, updateProduct, addToCart}: Readonly<DeleteProps>) {
    const [product, setProduct] = useState<ProductWithNoId>({
        name: "",
        price: 0,
        description: ""
    });

    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [editable, setEditable] = useState<boolean>(false);
    const params = useParams();
    const id: string | undefined = params.id;
    const navigate = useNavigate();

    const fetchProduct = () => {
        axios.get(`/api/products/${id}`)
            .then((response) => {
                setProduct(response.data);
            })
            .catch((error) => console.log(error.response.data));
    };

    useEffect(() => {
        fetchProduct();
    }, []);

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

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (id) updateProduct(id, product);
        setEditable(false);
    }

    function onEdit() {
        setEditable(!editable);
        if (editable) {
            fetchProduct();
        }
    }

    function handleAddToCart() {
        if (id) {
            const productToAdd: Product = {
                ...product,
                id: id
            };
            addToCart(productToAdd);
        }
        navigate("/");
    }

    return (
        <article className="product-details">
            <Link to="/">Back</Link>
            <div className="product-detail-container">
                <ProductForm
                    product={product}
                    setProduct={setProduct}
                    handleSubmit={handleSubmit}
                    editable={editable}
                />
                <div className="product-details-buttons">
                    <button onClick={onEdit}>{editable ? "Cancel Edit" : "Edit"}</button>
                    <button className="delete-button" onClick={handleDelete}>Delete</button>
                    <button onClick={handleAddToCart}>Add to Cart</button>
                </div>
                {showDeleteModal && (
                    <ConfirmationModal
                        handleClose={handleClose}
                        handleDeleteConfirm={handleDeleteConfirm}
                        productToBeDeleted={product}
                    />
                )}
            </div>
        </article>
    );
}
