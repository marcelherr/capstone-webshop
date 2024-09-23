import './App.css'
import axios from "axios"
import {useEffect, useState} from "react";
import {Order, Product, ProductWithNoId} from "./types/types.tsx";
import Header from "./components/header/Header.tsx";
import {Route, Routes} from "react-router-dom";
import Navigation from "./components/navigation/Navigation.tsx";
import AddProductPage from "./pages/AddProductPage/addProductPage/AddProductPage.tsx";
import ProductDetailsPage from "./pages/ProductDetailsPage/productDetailsPage/ProductDetailsPage.tsx";
import OrderPage from "./pages/OrderPage/orderPage/OrderPage.tsx";
import OrderDetailsPage from "./pages/OrderDetailsPage/oderDetailsPage/OrderDetailsPage.tsx";
import MainPage from "./pages/MainPage/mainPage/MainPage.tsx";

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

    const [orders, setOrders] = useState<Order[]>([])

    function fetchOrders() {
        axios.get("/api/orders")
            .then((response) => {
                setOrders(response.data)
            })
            .catch((error) => {
                alert(error)
            })
    }

    useEffect(() => {
        fetchProducts()
        fetchOrders()
    }, []);


    function deleteOrder(id: string) {
        axios.delete("/api/orders/" + id)
            .then((response) => response.status === 200 && fetchOrders())
            .catch((error) => console.log(error.message))
    }

    const [cartItems, setCartItems] = useState<Product[]>([]);

    function addToCart(product: Product) {
        setCartItems((prevCartItems) => [...prevCartItems, product]);
    }

    function removeFromCart(productToRemove: Product) {
        setCartItems((prevCartItems) =>
            prevCartItems.filter((product) => product.id !== productToRemove.id)
        );
    }

    return (
        <>
            <Header/>
            <Navigation/>
            <main>
                <Routes>
                    <Route path={"/"}
                           element={<MainPage data={filteredAndSortedProducts}
                                              setSearchInput={setSearchInput}
                                              toggleSortOrder={toggleSortOrder}
                                              toggleSortPrice={toggleSortPrice}
                                              setIsPriceAscending={setIsPriceAscending}
                                              setIsNameAscending={setIsNameAscending}
                                              cartItems={cartItems}
                                              addToCart={addToCart}
                                              removeFromCart={removeFromCart}
                                              setCartItems={setCartItems}
                                              fetchOrders={fetchOrders}/>}/>
                    <Route path={"/products/add"} element={<AddProductPage fetchProducts={fetchProducts}/>}/>
                    <Route path={"/products/:id"}
                           element={<ProductDetailsPage deleteProduct={deleteProduct}
                                                        updateProduct={updateProduct}
                                                        addToCart={addToCart}/>}/>
                    <Route path={"/orders"} element={<OrderPage orders={orders}/>}/>
                    <Route path={"/orders/:id"} element={<OrderDetailsPage deleteOrder={deleteOrder}/>}></Route>
                </Routes>
            </main>
        </>
    )
};

