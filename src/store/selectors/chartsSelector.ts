import { createSelector } from '@reduxjs/toolkit';
import { TRootState } from '../index';
import { ChartsCategoryList } from '../../models/calculateResponse';

class ChartsSelectors {
    private static readonly expectedData = (state: TRootState) => state.charts.expected;
    private static readonly bestData = (state: TRootState) => state.charts.best;
    private static readonly worstData = (state: TRootState) => state.charts.worst;
    private static readonly chartsData = (state: TRootState) => state.charts;
    private static readonly getSelectorForCategory = (category: typeof ChartsCategoryList[number]) => {
        let selector = null;
        switch (category) {
            case 'expected':
                selector = this.expectedData;
                break;
            case 'best':
                selector = this.bestData;
                break;
            case 'worst':
                selector = this.worstData;
                break;
        }

        return selector;
    };

    public static readonly AnnualPaymentSelector = (category: typeof ChartsCategoryList[number]) => {
        return createSelector(
            this.getSelectorForCategory(category),
            ({ annualData }) => annualData
                ? [ annualData.hclAnnualPayment, annualData.conventionalAnnualPayment ]
                : []
        );
    };

    public static readonly CumulativePaymentSelector = (category: typeof ChartsCategoryList[number]) => {
        return createSelector(
            this.getSelectorForCategory(category),
            ({ annualData }) => annualData
                ? [ annualData.hclCumulativePayment, annualData.conventionalCumulativePayment ]
                : []
        );
    };

    public static readonly LoanBalanceSelector = (category: typeof ChartsCategoryList[number]) => {
        return createSelector(
            this.getSelectorForCategory(category),
            ({ annualData }) => annualData
                ? [ annualData.hclLoanBalance, annualData.conventionalLoanBalance ]
                : []
        );
    };

    public static readonly GetChartsCategories = createSelector(
        this.chartsData,
        (chartsData) => {
            const categoriesList = [] as Array<typeof ChartsCategoryList[number]>;
            (Object.keys(chartsData) as Array<typeof ChartsCategoryList[number]>).forEach((key) => {
                if (chartsData[key].annualData) categoriesList.push(key);
            });

            return categoriesList;
        },
    );
}

export default ChartsSelectors;
