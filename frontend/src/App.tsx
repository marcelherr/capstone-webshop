import './App.css'
import ProductGallery from "./components/productGallery/ProductGallery.tsx";
import axios from "axios"
import {useEffect, useState} from "react";
import {Product, ProductWithNoId} from "./types/types.tsx";
import Header from "./components/header/Header.tsx";
import {Route, Routes} from "react-router-dom";
import Navigation from "./components/navigation/Navigation.tsx";
import AddProductPage from "./pages/AddProductPage/addProductPage/AddProductPage.tsx";
import ProductDetailsPage from "./pages/ProductDetailsPage/productDetailsPage/ProductDetailsPage.tsx";

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

    const deleteProduct = (id: string) => {
        axios.delete("/api/products/" + id)
            .then((response) => response.status === 200 && fetchProducts())
            .catch((error) => console.log(error.message))
    }

    const updateProduct = (id: string, product: ProductWithNoId) => {
        axios.put(`/api/products/${id}/update`, product)
            .then((response) => response.status === 200 && fetchProducts())
            .catch((error) => console.log(error.response.data))
    }

    useEffect(() => {
        fetchProducts()
    }, []);

    const [searchInput, setSearchInput] = useState("")
    const [isNameAscending, setIsNameAscending] = useState<boolean | null>(null);
    const [isPriceAscending, setIsPriceAscending] = useState<boolean | null>(null);

    const filteredAndSortedProducts: Product[] = [...data]
        .filter((product) => product.name?.toLowerCase().includes(searchInput.toLowerCase()))
        .sort((a, b) => {
            if (isNameAscending !== null) {
                return isNameAscending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            } else {
                return isPriceAscending ? a.price - b.price : b.price - a.price;
            }
        });

    function toggleSortOrder() {
        setIsNameAscending(!isNameAscending);
        setIsPriceAscending(null);
    }

    function toggleSortPrice() {
        setIsPriceAscending(!isPriceAscending);
        setIsNameAscending(null);
    }

    return (
        <>
            <Header/>
            <Navigation/>
            <main>
                <Routes>
                    <Route path={"/"}
                           element={<ProductGallery data={filteredAndSortedProducts}
                                                    setSearchInput={setSearchInput}
                                                    toggleSortOrder={toggleSortOrder}
                                                    toggleSortPrice={toggleSortPrice}
                                                    setIsPriceAscending={setIsPriceAscending}
                                                    setIsNameAscending={setIsNameAscending}/>}/>
                    <Route path={"/products/add"} element={<AddProductPage fetchProducts={fetchProducts}/>}/>
                    <Route path={"/products/:id"}
                           element={<ProductDetailsPage deleteProduct={deleteProduct}
                                                        updateProduct={updateProduct}/>}/>
                </Routes>
            </main>
        </>
    )
};

