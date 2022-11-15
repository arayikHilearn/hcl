import { createSelector } from '@reduxjs/toolkit';
import { TRootState } from '../index';
import { TEmailSubmissionFormData } from '../reducers/emailSubmissionForm';

class EmailSubmissionFormSelectors {
    private static readonly emailSubmissionFormData = (state: TRootState) => state.emailSubmissionForm;
    private static readonly emailSubmissionFormErrors = (state: TRootState) => state.emailSubmissionForm.error;

    public static readonly isSucceedSelector = createSelector(
        this.emailSubmissionFormData,
        ({ isSucceed }) => isSucceed,
    );

    public static readonly emailSelector = createSelector(
        this.emailSubmissionFormData,
        ({ email }) => email,
    );

    public static readonly hasErrorSelector = createSelector(
        this.emailSubmissionFormErrors,
        (error) => !!Object.keys(error).length
    );

    public static readonly errorSelector = (key: keyof TEmailSubmissionFormData) => createSelector(
        this.emailSubmissionFormErrors,
        (errors) => errors[key]
    );
}

export default EmailSubmissionFormSelectors;
