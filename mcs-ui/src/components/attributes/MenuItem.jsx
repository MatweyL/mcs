import React from 'react';

const MenuItem = ({attribute}) => {
    return (
        <div className={`attribute${attribute.active ? '-active' : ''}`}>
            {attribute.label}
        </div>
    );
};

export default MenuItem;