import {OrderPizzaType, TypePizzaType} from "../types/types";

export type filterStateType = {
    sortBy: {
        type: TypePizzaType,
        order: OrderPizzaType
    },
    category: null | number
}

const initialState: filterStateType = {
    sortBy: {
        type: 'popular',
        order: 'desc'
    },
    category: null
}

//action types
type setSortByType = ReturnType<typeof setSortBy>
type setCategoryType = ReturnType<typeof setCategory>

type ActionsType = setSortByType | setCategoryType

export const filtersReducer = (state = initialState, action:ActionsType) => {
    switch (action.type) {
        case 'SET_SORT_BY': {
            return {...state, sortBy: action.payload}
        }
        case 'SET_CATEGORY': {
            return {...state, category: action.payload}
        }

        default: {
            return state;
        }

    }


}
//action
export const setSortBy = ({type, order}:any) => ({type: 'SET_SORT_BY', payload: {type, order}} as const)
export const setCategory = (cartIndex:number) => ({type: 'SET_CATEGORY', payload: cartIndex} as const)

export default filtersReducer;