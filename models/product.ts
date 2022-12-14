export interface Product {
    id: number,
    name: string,
    description: string,
    price: number,
    quantity: number,
    categoryId: number,
    image: string,
    updateAt: Date,
    createdAt: Date,
}