export type PizzaType = {
    id: number,
    imageUrl: string,
    name: string,
    types: Array<number>,
    sizes: Array<number>,
    price: number,
    category: number,
    rating: number
}
export type onAddPizzaType = {
    id: number
    name: string
    imageUrl: string
    price: number
    size: number,
    type: string
}

export type ObjectInnerCartType = {
    [key: number]: PizzaType,
    price: number
}
export type CartItemType = {
    items: Array<ObjectInnerCartType>
    totalPrice: number
}
export type CartItemsType = {
    [key: number]: CartItemType
}

export type TypePizzaType = 'price' | 'popular' | 'name'
export type NamePizzaType = 'популярности' | 'цене' | 'алфавиту'
export type OrderPizzaType = 'asc' | 'desc'
export type SizePizzaType = 26 | 30 | 40

