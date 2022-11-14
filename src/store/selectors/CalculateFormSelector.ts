import { createSelector } from '@reduxjs/toolkit';
import { TRootState } from '../index';
import { TCalculateFormData } from '../reducers/calculateForm';

class CalculateFormSelectors {
    private static readonly calculateFormData = (state: TRootState) => state.calculateForm;
    private static readonly calculateFormErrors = (state: TRootState) => state.calculateForm.error;

    public static readonly homePriceSelector = createSelector(
        this.calculateFormData,
        ({ homePrice }) => homePrice,
    );

    public static readonly cashAvailableSelector = createSelector(
        this.calculateFormData,
        ({ cashAvailable }) => cashAvailable,
    );

    public static readonly cashAvailableSelectorPercent = createSelector(
        CalculateFormSelectors.cashAvailableSelector,
        CalculateFormSelectors.homePriceSelector,
        (cashAvailable, homePrice) => {

            if (cashAvailable && homePrice) {
                const value = cashAvailable / homePrice * 100;
                return value > 99 ? 99 : value;
            }
            const value = ((cashAvailable || 0) / (homePrice || 0)) * 100;
            console.log(7886781111, value, !!value);
            console.log(7886781111, value, !!value);
            return null;
        },
    );

    public static readonly interestRateSelector = createSelector(
        this.calculateFormData,
        ({ interestRate }) => interestRate,
    );

    public static readonly loanProgramSelector = createSelector(
        this.calculateFormData,
        ({ loanProgram }) => loanProgram,
    );

    public static readonly hasErrorSelector = createSelector(
        this.calculateFormErrors,
        (error) => !!Object.keys(error).length
    );

    public static readonly errorSelector = (key: keyof TCalculateFormData) => createSelector(
        this.calculateFormErrors,
        (errors) => errors[key]
    );
}

export default CalculateFormSelectors;
