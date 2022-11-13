import { BaseService } from './BaseService';
import { getRoute } from '../utils/getRoute';
import { ICalculationParams, TCalculateResponse } from '../models/calculateResponse';

class ApiService extends BaseService {
    protected url = `${this.url}/v1` as string;

    private routes = {
        calculations: (params: ICalculationParams) => getRoute(this.url, 'calculations', params)
    };

    async calculate(params: ICalculationParams) {
        return (await this.fetcher.get<TCalculateResponse>(
            this.routes.calculations(params)
        )).data;
    }

    async emailSubscribe(event: any) {
        return (await this.fetcher.post<any>(this.url, event)).data;
    }
}

export default new ApiService();
