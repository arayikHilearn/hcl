import * as React from 'react';
import { FC, SVGAttributes } from 'react';

interface ISvgHome extends SVGAttributes<SVGElement> {
    type?: 'default' | 'monotone'
}

const colorsConfig = {
    default: {
        house: '#fff',
        roof: {
            top: '#C3F84F',
            front: '#A1D72D'
        },
        window: {
            front: '#EFEFEF',
            out1: '#DEDEDE',
            out2: '#fff',
            out3: '#A1D72D'
        },
        door: {
            out: '#D8D8D9',
            top: '#EFEFF4',
            front: '#E4E4E4',
            inner: '#C8C8C8'
        },
    },
    monotone:{
        house: '#fff',
        window: null,
        roof: {
            top: '#F3F3F3',
            front: '#CCC'
        },
        door: null
    }
};

const SvgHome: FC<ISvgHome> = ({ type = 'default', ...defaultProps }) => {
    const colors = colorsConfig[type];

    return (
        <svg
            width="12.5rem"
            height="11.9rem"
            viewBox="0 0 125 119"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            { ...defaultProps }
        >
            { colors.house ? (
                <>
                    <path //house
                        d="M62.971 83.753v34.68L4.824 83.753V49.432l58.147 34.32Z"
                        fill={ colors.house }
                    />
                    <path //house
                        d="M62.971 118.433V82.207L89.925 35.56l26.917 15.56v36.227l-53.87 31.086Z"
                        fill={ colors.house }
                    />
                </>
            ) : null }
            { colors.window ? (
                <>
                    { /*1 window*/ }
                    <path //window front
                        d="M51.338 84.308l-14.442-8.33v16.66l14.442 8.329v-16.66Z"
                        fill={ colors.window.front }
                    />
                    <path //window out
                        d="m51.338 84.308.93-.536v16.659l-.93.536v-16.66Z"
                        fill={ colors.window.out1 }
                    />
                    <path //window out top
                        d="m36.896 75.978.93-.536 14.442 8.33-.93.536-14.442-8.33Z"
                        fill={ colors.window.out2 }
                    />
                    <path // window inner
                        d="m49.73 85.237-11.225-6.47v12.94l11.225 6.507V85.237Z"
                        fill={ colors.window.out3 }
                    />
                    <path //window out bottom
                        d="M49.73 98.214V97L39.54 91.1l-1.036.608 11.225 6.506Z"
                        fill={ colors.window.out1 }
                    />
                    <path
                        d="m38.505 91.708 1.036-.608V79.34l-1.036-.572v12.94ZM45.261 82.663l-1.144-.679v11.762l1.144.679V82.663Z"
                        fill={ colors.window.out1 }
                    />

                    { /*2 window*/ }
                    <path
                        d="m25.956 69.65-14.442-8.329v16.66l14.442 8.329V69.65Z"
                        fill={ colors.window.front }
                    />
                    <path
                        d="m25.957 69.65.93-.535v16.694l-.93.5V69.652Z"
                        fill={ colors.window.out1 }
                    />
                    <path
                        d="m11.514 61.321.93-.536 14.442 8.33-.93.536-14.442-8.33Z"
                        fill={ colors.window.out2 }
                    />
                    <path
                        d="m24.348 70.58-11.225-6.47v12.94l11.225 6.507V70.58Z"
                        fill={ colors.window.out3 }
                    />
                    <path
                        d="M24.348 83.557v-1.215l-10.189-5.899-1.036.608 11.225 6.506Z"
                        fill={ colors.window.out2 }
                    />
                    <path
                        d="m13.123 77.05 1.036-.607V64.682l-1.036-.572v12.94ZM19.88 68.006l-1.145-.679v11.761l1.144.68V68.006Z"
                        fill={ colors.window.out1 }
                    />
                </>
            ) : null }
            { colors.door ? (
                <>
                    <path
                        d="m83.942 74.584-1.073-.643v32.71l1.073.643v-32.71Z"
                        fill={ colors.door.out }
                    />
                    <path
                        d="m101.244 64.61-1.108-.643-17.267 9.974 1.073.643 17.302-9.974Z"
                        fill={ colors.door.top }
                    />
                    <path
                        d="M83.942 74.584v32.711l1.93-1.109V75.692l13.442-7.757v30.672l1.93-1.108V64.61l-17.302 9.974Z"
                        fill={ colors.door.front }
                    />
                    <path
                        d="m99.314 98.608-1.216-.716V68.65l1.216-.715v30.672Z"
                        fill={ colors.door.out }
                    />
                    <path
                        d="M98.099 97.892V68.65l-12.227 7.042v29.243L98.1 97.892Z"
                        fill={ colors.door.inner }
                    />
                </>
            ) : null }
            { colors.roof ? (
                <>
                    <path //roof
                        d="M31.895 0 0 55.242l61.225 35.35L93.12 35.348 31.895 0Z"
                        fill={ colors.roof.top }
                    />
                    <path //roof
                        d="M93.123 35.344 61.21 90.581l1.581.934 30.332-52.47 30.296 17.467L125 53.744l-31.877-18.4Z"
                        fill={ colors.roof.front }
                    />
                </>
            ) : null }
        </svg>
    );
};
export default SvgHome;
