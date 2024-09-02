import './App.css'
import ProductGallery from "./components/productGallery/ProductGallery.tsx";
import axios from "axios"
import {useEffect, useState} from "react";
import {Product} from "./types/types.tsx";
import Header from "./components/header/Header.tsx";
import {Route, Routes} from "react-router-dom";
import Navigation from "./components/navigation/Navigation.tsx";
import AddProductPage from "./pages/AddProductPage/addProductPage/AddProductPage.tsx";

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

    useEffect(() => {
        fetchProducts()
    }, []);

    return (
        <>
            <Header/>
            <Navigation/>
            <main>
                <Routes>
                    <Route path={"/"} element={<ProductGallery data={data}/>}/>
                    <Route path={"/products/add"} element={<AddProductPage fetchProducts={fetchProducts}/>}/>
                </Routes>

            </main>
        </>
    )
};

