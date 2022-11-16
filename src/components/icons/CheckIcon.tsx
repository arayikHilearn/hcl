import * as React from 'react';
import { FC } from 'react';

const CheckIcon: FC = (props) => (
    <svg
        width="2.4rem"
        height="2.4rem"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        { ...props }
    >
        <path
            d="M20 6 9 17l-5-5"
            stroke="#131313"
            strokeWidth={ 2 }
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
export default CheckIcon;
