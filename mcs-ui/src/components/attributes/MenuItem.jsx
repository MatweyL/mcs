import React from 'react';

/// Атрибут - Элемент списка меню
const MenuItem = ({attribute}) => {
    return (
        <div className={`attribute${attribute.active ? '-active' : ''}`}>
            {attribute.label}
        </div>
    );
};

export default MenuItem;