export const useStyle = ( variable: string | Array<string> ): Record<string, string | number> | string | number => {
    if ( Array.isArray( variable ) ) {
        const variables: Record<string, string | number> = {};

        variable.forEach( ( v ) => {
            const variable = getComputedStyle( document.documentElement ).getPropertyValue( `--${ v }` ).trim();
            variables[ v ] = isNaN( +variable ) ? variable : +variable;
        } );

        return variables;
    }

    const variableValue = getComputedStyle( document.documentElement ).getPropertyValue( `--${ variable }` ).trim();

    return isNaN( +variableValue ) ? variableValue : +variableValue;

};