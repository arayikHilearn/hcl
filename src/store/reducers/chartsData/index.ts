import { AnnualDataTypes, ChartsCategoryList } from '../../../models/calculateResponse';
import { CamelizeString } from '../../../utils/types';


type TAnnualData = Record<CamelizeString<typeof AnnualDataTypes[number]>, number[]>

export interface IChartData {
    annualData: TAnnualData | null
}

export type TChartsData = Record<typeof ChartsCategoryList[number], IChartData>


