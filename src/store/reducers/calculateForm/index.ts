export const loanProgramMap = new Map<30, string>();
loanProgramMap.set(30, '30 years fixed');

const loanProgramKeys = Array.from(loanProgramMap.keys());
export type TCalculateFormData = Partial<Omit<ICalculateForm, 'error'>>
export interface ICalculateForm {
    homePrice: number | null;
    loanProgram: typeof loanProgramKeys[number] | null,
    cashAvailable: number | null,
    interestRate: number | null,
    error: Record<keyof TCalculateFormData | string, string | never>
}


