import { ComponentType } from 'react';
import { PathRouteProps } from 'react-router-dom';
import Home from './Home';

export enum ERoutes {
    HOME = '/'
}

export const routesConfig: Array<PathRouteProps & { Element: ComponentType }> = [
    {
        path: ERoutes.HOME,
        Element: Home
    }
];
