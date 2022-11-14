
export type TEmailSubmissionFormData = Partial<Omit<IEmailSubmissionForm, 'error'>>
export interface IEmailSubmissionForm {
    email: string | null;
    error: Record<keyof TEmailSubmissionFormData | string, string | never>;
}


