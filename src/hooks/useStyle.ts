import { WithPrefix } from '../utils/types';

export const useStyle = (variable: string | Array<string>) => {
    const variables: Record<WithPrefix<'$'>, string> = {};

    if (typeof variable === 'string') {
        variables[ `$${variable}` ] = getComputedStyle(document.documentElement).getPropertyValue(`--${ variable }`).trim().toString();
    } else {
        variable.forEach((v) => {
            variables[ `$${v}` ] = getComputedStyle(document.documentElement).getPropertyValue(`--${ v }`).trim().toString();
        });
    }

    return variables;
};
