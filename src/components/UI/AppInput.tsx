import { FC, InputHTMLAttributes, memo, useEffect } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    ref?: string; 
}

const AppInput: FC<InputProps> = ( { label, ...otherProps } ) => {

    console.log( 'input render', otherProps.name, otherProps );

    useEffect( () => {
        console.log( 'useEffect = input render', otherProps.name );

    } );

    return (
        <label>
            { label }
            <input
                { ...otherProps }
                //ref={ref}
            />
        </label>
    );
};

export default memo( AppInput );