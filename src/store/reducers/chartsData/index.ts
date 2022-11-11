import { AnnualDataTypes, ChartsCategoryList } from '../../../models/calculateResponse';
import { CamelizeString } from '../../../utils/types';


type TAnnualData = Record<CamelizeString<typeof AnnualDataTypes[number]>, number[]>

interface IChartData {
    annualData: TAnnualData
}

export type TChartsData = Record<typeof ChartsCategoryList[number], IChartData | null>


