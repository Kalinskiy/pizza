import {CartItemsType, ObjectInnerCartType, onAddPizzaType, PizzaType} from "../types/types";


export type CartStateType =  typeof initialState
const initialState = {
    items: {} as CartItemsType,
    totalPrice: 0,
    totalCount: 0
}
//action types
type AddPizzaType = ReturnType<typeof addPizza>
type ClearCartType = ReturnType<typeof clearCart>
type RemoveCartItemType = ReturnType<typeof removeCartItem>
type PlusItemType =  ReturnType<typeof plusItem>
type MinusItemType = ReturnType<typeof minusItem>

type ActionsType = AddPizzaType | ClearCartType | RemoveCartItemType | PlusItemType | MinusItemType




const getTotalPrice = (arr: (ObjectInnerCartType | onAddPizzaType | PizzaType)[]) => {
    return arr.reduce((sum, obj) => obj.price + sum, 0)
}


const _get = (obj:any, path:any) => {
    const [firstKey, ...keys] = path.split('.');
    return keys.reduce((val:any, key:string) => {
        return val[key];
    }, obj[firstKey]);
};

const getTotalSum = (obj: { [p: number]: { totalPrice: number; items: (ObjectInnerCartType | onAddPizzaType)[]}; [p: string]: { totalPrice: number; items: (ObjectInnerCartType | onAddPizzaType)[] } }, path: any) => {
    return Object.values(obj).reduce((sum, obj) => {
        const value = _get(obj, path);
        return sum + value;
    }, 0);
};

export const cartReducer = (state:CartStateType = initialState, action:ActionsType) => {
    switch (action.type) {
        case 'ADD_PIZZA': {

            const currentPizzaItems = !state.items[action.payload.id]
                ? [action.payload]
                : [...state.items[action.payload.id].items, action.payload];

            const newItems = {
                ...state.items,
                [action.payload.id]: {
                    items: currentPizzaItems,
                    totalPrice: getTotalPrice(currentPizzaItems),
                }
            }

            const totalCount = getTotalSum(newItems, 'items.length');
            const totalPrice = getTotalSum(newItems, 'totalPrice')
            // const items = Object.values(newItems).map(obj => obj.items)
            // const allPizzas = items.flat()
            return {
                ...state,
                items: newItems,
                // itemsCount: allPizzas.length,
                // totalPrice: getTotalPrice(allPizzas)
                totalCount: totalCount,
                totalPrice: totalPrice
            }
        }
        case 'CLEAR_CART': {
            return {
                ...state,
                items: {},
                totalPrice: 0,
                totalCount: 0
            }
        }
        case 'REMOVE_CART_ITEM': {
            const newItems = {...state.items}
            const currentTotalPrice = newItems[action.payload].totalPrice;
            const currentTotalCount = newItems[action.payload].items.length;
            delete newItems[action.payload]
            return {
                ...state,
                items: newItems,
                totalPrice: state.totalPrice - currentTotalPrice,
                totalCount: state.totalCount - currentTotalCount
            }

        }
        case 'PLUS_CART_ITEM' : {
            const newObjectItems = [...state.items[action.payload].items, state.items[action.payload].items[0]]

            const newItems = {
                ...state.items,
                [action.payload]: {
                    items: newObjectItems,
                    totalPrice: getTotalPrice(newObjectItems)
                }
            }
            const totalCount = getTotalSum(newItems, 'items.length');
            const totalPrice = getTotalSum(newItems, 'totalPrice')

            return {
                ...state,
                items: newItems,
                totalPrice: totalPrice,
                totalCount: totalCount
            }
        }
        case 'MINUS_CART_ITEM': {
            const oldItems = [...state.items[action.payload].items]
            const newObjectItems = oldItems.length > 1 ? [...state.items[action.payload].items].slice(1) : oldItems;

            const newItems = {
                ...state.items,
                [action.payload]: {
                    items: newObjectItems,
                    totalPrice: getTotalPrice(newObjectItems)
                }
            }
            const totalCount = getTotalSum(newItems, 'items.length');
            const totalPrice = getTotalSum(newItems, 'totalPrice')


            return {
                ...state,
                items: newItems,
                totalCount: totalCount,
                totalPrice: totalPrice

            }
        }
        default: {
            return state;
        }

    }


}
//action

export const addPizza = (obj: onAddPizzaType) => ({type: 'ADD_PIZZA', payload: obj}as const)
export const clearCart = () => ({type: 'CLEAR_CART'}as const)
export const removeCartItem = (id:number) => ({type: 'REMOVE_CART_ITEM', payload: id}as const)
export const plusItem = (id:number) => ({type: 'PLUS_CART_ITEM', payload: id}as const)
export const minusItem = (id:number) => ({type: 'MINUS_CART_ITEM', payload: id}as const)

//thunk

export default cartReducer;