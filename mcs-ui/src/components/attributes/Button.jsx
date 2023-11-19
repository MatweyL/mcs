import React from 'react';

const Button = ({button}) => {

    return (
        <div className="mcs-button">
            {button?.label}
        </div>
    );
};

export default Button;