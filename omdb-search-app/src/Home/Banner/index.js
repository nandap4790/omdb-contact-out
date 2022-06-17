import React from 'react';

export const Banner = (props) => {
    return (
        <div className={`banner ${props.customClass}`}>
            {props.message}
        </div>
    )
}