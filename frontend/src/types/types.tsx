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