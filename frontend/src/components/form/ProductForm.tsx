import './ProductForm.css'
import {ChangeEvent, Dispatch, FormEvent, SetStateAction} from "react";
import {ProductWithNoId} from "../../types/types.tsx";

type ProductFormProps = {
    product: ProductWithNoId,
    setProduct: Dispatch<SetStateAction<ProductWithNoId>>,
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void,
}

export default function ProductForm({product, setProduct, handleSubmit}: Readonly<ProductFormProps>) {

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setProduct({...product, [event.target.name]: event.target.value})
    }

    return (
        <form onSubmit={handleSubmit} className={"product-form"}>
            <div className={"product-info"}>
                <label htmlFor={"name"}></label>
                <input type={"text"}
                       name={"name"}
                       value={product.name}
                       required={true}
                       onChange={handleChange}
                       placeholder={"Product Name:"}
                />
            </div>
            <button type={"submit"}>Submit</button>
        </form>
    )
}