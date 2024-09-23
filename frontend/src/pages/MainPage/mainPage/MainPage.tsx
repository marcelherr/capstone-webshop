import ProductGallery from "../../../components/productGallery/ProductGallery.tsx";
import ShoppingCart from "../../../components/shoppingCart/ShoppingCart.tsx";
import {Product} from "../../../types/types.tsx";
import {Dispatch, SetStateAction} from "react";
import './MainPage.css';

type MainPageProps = {
    data: Product[];
    setSearchInput: Dispatch<SetStateAction<string>>;
    toggleSortOrder: () => void;
    toggleSortPrice: () => void;
    setIsNameAscending: Dispatch<SetStateAction<boolean | null>>;
    setIsPriceAscending: Dispatch<SetStateAction<boolean | null>>;
    cartItems: Product[],
    addToCart: (product: Product) => void;
    removeFromCart: (product: Product) => void;
    setCartItems: (items: Product[]) => void;
    fetchOrders: () => void;
};

export default function MainPage({
                                     data,
                                     setSearchInput,
                                     toggleSortOrder,
                                     toggleSortPrice,
                                     setIsNameAscending,
                                     setIsPriceAscending,
                                     cartItems,
                                     addToCart,
                                     removeFromCart,
                                     setCartItems,
                                     fetchOrders
                                 }: MainPageProps) {
    return (
        <div className="main-container">
            <div className="product-gallery">
                <ProductGallery
                    data={data}
                    setSearchInput={setSearchInput}
                    toggleSortOrder={toggleSortOrder}
                    toggleSortPrice={toggleSortPrice}
                    setIsNameAscending={setIsNameAscending}
                    setIsPriceAscending={setIsPriceAscending}
                    addToCart={addToCart}
                />
            </div>
            <div className={"shopping-cart"}>
                <ShoppingCart cartItems={cartItems} removeFromCart={removeFromCart} setCartItems={setCartItems}
                              fetchOrders={fetchOrders}/>
            </div>
        </div>
    );
}
