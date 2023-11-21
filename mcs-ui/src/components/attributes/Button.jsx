import React from 'react';
import ElevatedList from "../UI/ElevatedList/ElevatedList";


const Button = ({button}) => {

    return (
        <div>
            {button?.open
                ? <ElevatedList items={button.items} />
                : null
            }
            <div className="mcs-button">
                {button?.label}
            </div>
        </div>
    );
};

export default Button;