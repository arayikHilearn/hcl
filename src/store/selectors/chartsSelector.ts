import { createSelector } from '@reduxjs/toolkit';
import { TRootState } from '../index';

class ChartsSelectors {
    private static readonly expectedData = (state: TRootState) => state.charts.expected;

    public static readonly AnnualPaymentSelector = createSelector(
        this.expectedData,
        (expected) => {
            return expected ? [ expected.annualData.hclAnnualPayment, expected.annualData.conventionalAnnualPayment ] : [];
        },
    );

    public static readonly CumulativePaymentSelector = createSelector( //area
        this.expectedData,
        (expected) => {
            return expected ? [ expected.annualData.hclCumulativePayment, expected.annualData.conventionalCumulativePayment ] : [];
        },
    );

    public static readonly LoanBalanceSelector = createSelector( //line
        this.expectedData,
        (expected) => {
            return expected ? [ expected.annualData.hclLoanBalance, expected.annualData.conventionalLoanBalance ] : [];
        },
    );
}

export default ChartsSelectors;
