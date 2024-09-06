import './ProductForm.css'
import {ChangeEvent, Dispatch, FormEvent, SetStateAction} from "react";
import {ProductWithNoId} from "../../types/types.tsx";

type ProductFormProps = {
    product: ProductWithNoId,
    setProduct: Dispatch<SetStateAction<ProductWithNoId>>,
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void,
    editable: boolean
}

export default function ProductForm({product, setProduct, handleSubmit, editable}: Readonly<ProductFormProps>) {

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
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
                       disabled={!editable}
                />
            </div>
            <div className={"product-info"}>
                <label htmlFor={"price"}>Price: </label>
                <input type={"text"}
                       name={"price"}
                       value={product.price}
                       required={true}
                       onChange={handleChange}
                       placeholder={"Product Price:"}
                       disabled={!editable}
                />
            </div>
            <div className={"product-info"}>
                <label htmlFor={"description"}>Description:
                    <textarea rows={5} cols={30}
                              name={"description"}
                              value={product.description}
                              required={true}
                              onChange={handleChange}
                              placeholder={"Product Description:"}
                              disabled={!editable}
                    /></label>
            </div>
            {editable && <button type={"submit"}>Submit</button>}
        </form>

    )
}