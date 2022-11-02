/* eslint-disable @typescript-eslint/no-empty-interface */
import { AxiosStatic } from 'axios';

interface IGlobal {
    axios: AxiosStatic
}


declare global {
    interface Window extends IGlobal {}

    const axios: IGlobal['axios'];
}
