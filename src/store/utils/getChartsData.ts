import { ChartsCategoryList, TCalculateResponse } from '../../models/calculateResponse';
import { TChartsData } from '../reducers/chartsData';

export function getChartsData(data: TCalculateResponse) {
    const chartsData: TChartsData = {
        expected: { annualData: null },
        best: { annualData: null },
        worst: { annualData: null },
    };

    ChartsCategoryList.forEach(k => {
        chartsData[k] = {
            annualData: {
                hclAnnualPayment: data[k].annual_data.hcl_annual_payment,
                conventionalAnnualPayment: data[k].annual_data.conventional_annual_payment,
                hclCumulativePayment: data[k].annual_data.hcl_cumulative_payment,
                conventionalCumulativePayment: data[k].annual_data.conventional_cumulative_payment,
                hclLoanBalance: data[k].annual_data.hcl_loan_balance,
                conventionalLoanBalance: data[k].annual_data.conventional_loan_balance,
            }
        };
    });

    return chartsData;
}
