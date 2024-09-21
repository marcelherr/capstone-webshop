export type Product = {
    id: string,
    name: string,
    price: number,
    description: string
}

export type ProductWithNoId = {
    name: string
    price: number,
    description: string

}

export type Order = {
    id: string,
    orderDateTime: Date;
    products: Product[];
    totalPrice: number;
};

export type OrderWithNoId = {
    orderDateTime: Date;
    products: Product[];
    totalPrice: number;
}