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

    async emailSubscribe(body: { email: string, calculationsData: Record<string, number | null> }) {
        return (await this.fetcher.put<any>(
            this.routes.emailSubmission(),
            body
        )).status === 200;
    }
}

export default new ApiService();
