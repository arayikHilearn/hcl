import { useEffect } from 'react';

export const useRenderWatcher = ( componentName: string, options?: string ) => {
    if ( !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ) {
        useEffect( () => {
            console.log( ( `RENDER: ${componentName}${options ? `, OPTIONS: ${options}`: ''}` ) );
        } );
    }
};