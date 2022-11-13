export const AnnualDataTypes = [
    'hcl_annual_payment',
    'conventional_annual_payment',
    'hcl_cumulative_payment',
    'conventional_cumulative_payment',
    'hcl_loan_balance',
    'conventional_loan_balance'
] as const;

export const ChartsCategoryList = [ 'expected', 'worst', 'best' ] as const;

export type TCalculateResponse = Record<typeof ChartsCategoryList[number], {
    summary?: Record<string, string>,
    annual_data: Record<typeof AnnualDataTypes[number], number[]>
}>

export interface ICalculationParams {
    property_value: number,
    downpayment: number,
    interest_rate: number,
    term: number
}
