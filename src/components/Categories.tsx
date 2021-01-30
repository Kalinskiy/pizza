import React from 'react';

type PropsType = {
    activeCategory: number | null,
    onClickCategory: (index: number | null) => void
    items: Array<string>

}

const Categories = React.memo(({activeCategory, items, onClickCategory}: PropsType) => {
    return (
        <div className="categories">
            <ul>
                <li className={activeCategory === null ? 'active' : ''} onClick={() => onClickCategory(null)}>Все</li>
                {items && items.map((item, index) => {
                    return <li className={activeCategory === index ? 'active' : ''}
                               key={`${item}_${index}`} //key по индексу с именем для уникализации ключа
                               onClick={() => onClickCategory(index)}>{item}</li>
                })}

            </ul>
        </div>
    );
});

export default Categories;