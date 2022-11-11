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


}

export default ChartsSelectors;
