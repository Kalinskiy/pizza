import {pizzaAPI} from "../api/api";
import {setPreloader, SetPreloaderType} from "./app-reducer";
import {OrderPizzaType, PizzaType, TypePizzaType} from "../types/types";
import {Dispatch} from "redux";


const initialState = {
    pizzas: [],
}
type InitialStateType = {
    pizzas: Array<PizzaType>
}
type SetPizzasType = ReturnType<typeof setPizzas>

type ActionTypes = SetPizzasType

export const pizzaReducer = (state:InitialStateType = initialState, action: ActionTypes):InitialStateType => {
    switch (action.type) {
        case 'SET_PIZZAS': {
            return {...state, pizzas: action.payload}
        }
        default: {
            return state;
        }

    }


}
//action
export const setPizzas = (pizzas: PizzaType[]) => ({type: 'SET_PIZZAS', payload: pizzas})

//thunk
export const fetchPizzas = (sortBy: { type: TypePizzaType, order: OrderPizzaType }, category: null | number) => async (dispatch: Dispatch) => {
    dispatch(setPreloader(false))
    try {
        const res = await pizzaAPI.getPizza(sortBy, category)
        dispatch(setPizzas(res))
        dispatch(setPreloader(true))

    } catch (e) {

    }


}
