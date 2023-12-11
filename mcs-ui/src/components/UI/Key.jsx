import React from 'react';

const Key = ({children, ...props}) => {
    return (
        <div className="key-button" {...props}>
            {children}
        </div>
    );
};

export default Key;