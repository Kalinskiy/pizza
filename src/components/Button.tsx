import React from 'react';
import classNames from 'classnames'

type PropsType = {
    onClick?: () => void
    className: string
    outline?: string | boolean
    children: React.ReactNode
}
const Button = ({onClick, className, outline, children}: PropsType) => {
    return (
        <button
            onClick={onClick}
            className={classNames('button', className, {
                'button--outline': outline,
            })}>
            {children}
        </button>
    );
};

export default Button;