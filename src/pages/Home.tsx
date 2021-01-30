import React, {useCallback, useEffect} from 'react';
import {Categories, PizzaBlock, SortPopup} from "../components";
import {useDispatch, useSelector} from "react-redux";
import {filterStateType, setCategory, setSortBy} from "../redux/filters-reducer";
import {fetchPizzas} from "../redux/pizza-reducer";
import PizzaLoadingBlock from "../components/PizzaLoadingBlock";
import {addPizza} from "../redux/cart-reducer";
import {AppStateType} from "../redux/store";
import {CartItemsType, onAddPizzaType, PizzaType} from "../types/types";


const Home = () => {

    const dispatch = useDispatch()
    const pizzas = useSelector<AppStateType, Array<PizzaType>>(state => state.pizza.pizzas)
    const cartItems = useSelector<AppStateType, CartItemsType>(state => state.cart.items)
    const isLoaded = useSelector<AppStateType, boolean>(state => state.app.isLoaded)
    const {category, sortBy} = useSelector<AppStateType, filterStateType>(state => state.filter)


    useEffect(() => {
        dispatch(fetchPizzas(sortBy, category))

    }, [sortBy, category])

    const categoriesNames = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

    const onSelectCategory = useCallback((index) => {
        dispatch(setCategory(index))
    }, [dispatch])

    const onSelectSortType = useCallback((type) => {
        dispatch(setSortBy(type))
    }, [dispatch])

    const handleAddPizza = (obj: onAddPizzaType) => {
        dispatch(addPizza(obj))
    }

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    activeCategory={category}
                    onClickCategory={(index: number | null) => onSelectCategory(index)}
                    items={categoriesNames}
                />
                <SortPopup
                    onClickSortType={onSelectSortType}
                    activeSort={sortBy.type}
                    items={[
                        {name: 'популярности', type: 'popular', order: 'desc'},
                        {name: 'цене', type: 'price', order: 'desc'},
                        {name: 'алфавиту', type: 'name', order: 'asc'},

                    ]}
                />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoaded
                    ? pizzas.map((obj:PizzaType) => {
                        return <PizzaBlock
                            key={obj.id}
                            addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
                            onClickAddPizza={handleAddPizza}
                            {...obj}/>
                    })
                    : Array(12).fill(0).map((_, index) => <PizzaLoadingBlock key={index}/>)}

            </div>
        </div>
    );
};

export default Home;