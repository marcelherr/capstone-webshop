import './App.css'
import ProductGallery from "./components/productGallery/ProductGallery.tsx";
import axios from "axios"
import {useEffect, useState} from "react";
import {Product} from "./types/types.tsx";
import Header from "./components/header/Header.tsx";

export default function App() {

    const [data, setData] = useState<Product[]>([])

    const fetchProducts = () => {
        axios.get("/api/products")
            .then((response) => {
                setData(response.data)
            })
            .catch((error) => {
                alert(error)
            })
    }

    console.log(data)

    useEffect(() => {
        fetchProducts()
    }, []);

    return (
        <>
            <Header/>
            <main>
                <ProductGallery data={data}/>
            </main>
        </>
    )
};

