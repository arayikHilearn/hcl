export const CURRENCY = '$';
export const isDev = (() => process.env.NODE_ENV !== 'production')();
export const routesConfig = {
    prefix: 'v1',
    endpoints: {
        calculations: 'calculations',
        emailSubmission: 'email-submission',
    }
};

export const emptyErrorMessage = "This field can't be empty";
export const emailErrorMessage = 'Please enter a valid email address.';
export const apiErrorMessage = 'Something went wrong! Please try letter.';
export const minLengthErrorMessage = (length: string) => `This field can't be less than ${length}`;
export const inRangeErrorMessage = (range: string) => `This field must be in range ${range}`;
