import { Attributes, FC, SVGAttributes } from 'react';

type ISvgArrowRightProps = SVGAttributes<SVGElement>

const SvgArrowRight: FC<ISvgArrowRightProps> = (props) => (
    <svg
        width="2.4rem"
        height="2.4rem"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        { ...props }
    >
        <path
            d="M5 12.744h14M12 5.744l7 7-7 7"
            stroke="currentColor"
            strokeWidth={ 2 }
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
export default SvgArrowRight;
