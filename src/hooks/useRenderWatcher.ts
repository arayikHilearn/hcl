import { useEffect } from 'react';

export const useRenderWatcher = (componentName: string, options: string | Array<unknown> = '') => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        useEffect(() => {
            console.log(
                `%cRENDER: ${componentName}${options ? `, OPTIONS: ${typeof options === 'string' ? options : options.join(' ')}`: ''}`
                , 'background-color: #000; color: #bada55; padding: 5px 10px'
            );
        });
    }
};
