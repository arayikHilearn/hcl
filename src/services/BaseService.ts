import { axiosWithoutInterceptors } from '../config/apiConfig';

export abstract class BaseService {
    protected fetcher = axiosWithoutInterceptors;
    protected url = `${process.env.REACT_APP_API_URL}`;
}
