import ProductForm from "../../../components/productForm/ProductForm.tsx";
import {FormEvent, useState} from "react";
import axios from "axios";
import {ProductWithNoId} from "../../../types/types.tsx";
import {useNavigate} from "react-router-dom";
import './AddProductPage.css'

type FetchProps = {
    fetchProducts: () => void
}

export default function AddProductPage({fetchProducts}: FetchProps) {

    const [product, setProduct] = useState<ProductWithNoId>({
        name: "",
        price: 0,
        description: ""
    })

    const navigate = useNavigate();

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        axios.post("/api/products", product)
            .then(response => console.log(response))
            .then(() => fetchProducts())
            .catch(error => console.log(error))
        navigate("/")
    }

    return (
        <div className="add-product-container">
            <h2>Add a Product</h2>
            <ProductForm handleSubmit={handleSubmit} product={product} setProduct={setProduct} editable={true}/>
        </div>
    )
}