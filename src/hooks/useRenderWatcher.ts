import { useEffect } from 'react';
import { isDev } from '../config';

export const useRenderWatcher = (componentName: string, options: string | Array<unknown> = '') => {
    if (isDev) {
        useEffect(() => {
            console.log(
                `%cRENDER: ${componentName}${options ? `, OPTIONS: ${typeof options === 'string' ? options : options.join(' ')}`: ''}`
                , 'background-color: #000; color: #bada55; padding: 5px 10px'
            );
        });
    }
};
