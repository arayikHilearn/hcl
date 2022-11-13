import { isDev } from 'src/config';

export function getRoute(url: string, route: string, params?: Record<string, any>) {
    const paramsKey = params ? Object.keys(params) : null;
    let paramsStr = '';
    params && paramsKey && paramsKey.forEach((param, i) => {
        paramsStr += `?${param}=${params[param]}${i + 1 === paramsKey.length ? '' : '&'}`;
    });

    const endpoint = isDev ? `${url}__${route}` : `${url}/${route}${paramsStr}`;

    return endpoint;
}
