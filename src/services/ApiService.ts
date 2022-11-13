import { BaseService } from './BaseService';
import { getRoute } from '../utils/getRoute';
import { ICalculationParams, TCalculateResponse } from '../models/calculateResponse';
import { routesConfig } from '../config';

class ApiService extends BaseService {
    protected url = `${this.url}/${routesConfig.prefix}` as string;

    private routes = {
        calculations: (params: ICalculationParams) => getRoute(this.url, routesConfig.endpoints.calculations, params),
        emailSubmission: () => getRoute(this.url, routesConfig.endpoints.emailSubmission)
    };

    async calculate(params: ICalculationParams) {
        return (await this.fetcher.get<TCalculateResponse>(
            this.routes.calculations(params)
        )).data;
    }

    async emailSubscribe(email: string) {
        return (await this.fetcher.post<any>(
            this.routes.emailSubmission(),
            email
        )).data;
    }
}

export default new ApiService();
