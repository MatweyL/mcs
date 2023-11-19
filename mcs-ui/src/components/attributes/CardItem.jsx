import React from 'react';

/// Атрибут - Карточка
const CardItem = ({attribute}) => {
    return (
        <div className={`attribute${attribute.active ? '-active' : ''}`}>
            {attribute.label}
        </div>
    );
};

export default CardItem;